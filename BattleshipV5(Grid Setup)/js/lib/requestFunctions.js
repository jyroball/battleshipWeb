/*
Project : BattleShip
Class : 17B
Team : 1
Version : WEB v1

References:
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
https://www.w3schools.com/php/php_ajax_database.asp
Consider vvv
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
*/

// Prepare a Object to be uri encoded
function encodeURIObject(obj) {
    // Store strings in array to join later.
    var result = [];

    // Begin building string.
    for (var property in obj) {
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    }

    // Return result as string.
    return result.join("&");
}

// Prepare a Object to be json encoded
function encodeJSONObject(obj) {
    return JSON.stringify(obj);
}

// Prepare a Object to be uri decoded
function decodeURIObject(str) {
    var obj = new Object();
    //Split Named Value Pairs
    var nameValuePairs = info[1].split("&");
    for (var i = 0; i < nameValuePairs.length; i++) {
        var map = nameValuePairs[i].split("=");
        //Decode Name
        var name = decodeURIComponent(map[0]);
        //Decode Value
        var value = decodeURIComponent(map[1]);
        //Set Object Data
        obj[name] = value;
    }
    return obj;
}

// Prepare a Object to be json decoded
function decodeJSONObject(str) {
    return JSON.parse(str);
}

// Generic XMLHttpRequest
function HTML_Request(url, method, data, callback) {
    // Store content/type in variables.
    var request_content;
    var request_content_type;

    // HANDLE DATA !!!

    // Check if data is available.
    if (data) {
        // Check if method is 'GET' , URL ENCODE DATA
        if (method == "GET") {
            // If data is object , Serialize
            if (typeof data === "object") {
                request_content = encodeURIObject(data);
            } else {
                //Fall Back, Send string as URI form ?data=string
                request_content = "data=" + encodeURIComponent(data);
            }
        }
        // Otherwise, JSON ENCODE DATA
        else {
            // If data is object , Serialize
            if (typeof data === "object") {
                request_content = encodeJSONObject(data);
                request_content_type = "application/json;charset=UTF-8";
            } else {
                //Fall back, Send json object with {data : "string"};
                request_content = encodeJSONObject({ data: encodeURIComponent(data) });
                request_content_type = "application/json;charset=UTF-8";
            }
        }
    }

    // HANDLE REQUEST!!!

    //Create XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();
    //Open Http Request , with check for data and method
    xmlhttp.open(method, url + (data && method == "GET" ? "?" + request_content : ""), true);

    //Set Content-Type if method is "POST".
    if (method == "POST") xmlhttp.setRequestHeader("Content-Type", request_content_type);

    //Check if callback function exists.
    if (callback)
        xmlhttp.onload = function () {
            HTML_Response(this, callback);
        };

    //Lets you specify the request's body, typically only used with POST/PUT
    xmlhttp.send(method == "POST" ? request_content : "");
}

// Check if XMLHttpRequest is Successful
function HTML_Request_Successful(xmlhttp) {
    // check readyState and status == 200
    return xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200;
}

//Handle HTML Response, Convert Data to Object/Text
function HTML_Response(xmlhttp, callback) {
    var contenttype;
    var data;
    if (HTML_Request_Successful(xmlhttp)) {
        var contentinfo = xmlhttp.getResponseHeader("content-type").split(";");
        //Correctly Decode Data
        switch (contentinfo[0]) {
            case "application/x-www-form-urlencoded":
                contenttype = "uri";
                data = decodeURIObject(xmlhttp.responseText);
                break;
            case "application/json":
                contenttype = "json";
                data = decodeJSONObject(xmlhttp.responseText);
                break;
            default:
                contenttype = "text";
                data = xmlhttp.responseText;
        }
    } else {
        contenttype = "error";
        data = xmlhttp.status;
    }
    callback(contenttype, data);
}
