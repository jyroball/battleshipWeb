/*
Project : BattleShip
Class : 17B
Team : 2
Version : WEB v1
Edits : Andrew Robledo
Date : Nov 20 2020

References:
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
https://www.w3schools.com/php/php_ajax_database.asp
Consider vvv
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
*/

// Prepare a Object to be url encoded
function Serialize_Object(obj) {
    // Store strings in array to join later.
    var result = [];

    // Begin building string.
    for (var property in obj) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
    }

    // Return result as string.
    return result.join("&");
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
            if (typeof data === 'object') {
                request_content = Serialize_Object(data);
            } else {
                request_content = "data=" + encodeURIComponent(data);
            }
        }
        // Otherwise, JSON ENCODE DATA
        else{
            // If data is object , Serialize
            if (typeof data === 'object') {
                request_content = JSON.stringify(data);
                request_content_type = "application/json;charset=UTF-8";
            } else {
                // Fall back to sending single data as URL ENCODE 
                // TO-DO probably push this through as a JSON object. just to keep things consistent.
                request_content = "data=" + encodeURIComponent(data);
                request_content_type = "application/x-www-form-urlencoded;charset=UTF-8";
            }
        }
    }
    
    // HANDLE REQUEST!!!
    
    //Create XMLHttpRequest
    var xmlhttp = new XMLHttpRequest();

    //Open Http Request , with check for data and method
    xmlhttp.open(method, url + ((data && method == "GET") ? '?' + request_content : ''), true);

    //Set Content-Type if method is "POST".
    if (method == "POST")
        xmlhttp.setRequestHeader("Content-Type", request_content_type);
    
    //Check if callback function exists.
    if (callback)
        xmlhttp.onload = callback;

    //Lets you specify the request's body, typically only used with POST/PUT
    xmlhttp.send((method == "POST" ? request_content : ''));
}

// Check if XMLHttpRequest is Successful
function HTML_Request_Successful(xmlhttp) {
    // check readyState and status == 200
    return (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200);
}
