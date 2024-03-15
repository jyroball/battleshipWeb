//Function to Check if User is Logged in, Otherwise Forcefully logged out by server.
function check_loggedin() {
    let data = { type: "loggedin" };
    console.log("Checking if logged in...");
    HTML_Request("php/battleship.php", "GET", data, check_loggedin_callback);
}

//Redirects the user to menu if logged in.
function check_loggedin_callback(contenttype, data) {
    if (contenttype != "error" && data["result"]) {
        switch (data["result"]) {
            case "loggedin":
                console.log("Logged in!");
                if (document.location.pathname === "signup.html" || document.location.pathname === "login.html") {
                    console.log("Redirecting...");
                    location.assign("menu.html");
                }
                break;
            case "notloggedin":
                console.log("User Not Logged in! Redirecting...");
                location.assign("login.html");
                break;
            default:
                console.log("Unknown Reply : " + data["result"]);
        }
    } else {
        console.log("Error : " + data);
    }
}

function update_tags() {
    //Check User Names.
    let usernametags = document.getElementsByClassName("usernametag");
    if (usernametags.length > 0) {
        let username = getCookie("username");
        for (let i = 0; i < 0; i++) {
            usernametags[i].innerHTML = username;
        }
    }
    //Check First Names.
    let firstnametags = document.getElementsByClassName("firstnametag");
    if (firstnametags.length > 0) {
        let firstname = getCookie("firstname");
        for (let i = 0; i < 0; i++) {
            firstnametags[i].innerHTML = firstname;
        }
    }
    //Check Last Names.
    let lastnametags = document.getElementsByClassName("lastnametag");
    if (lastnametags.length > 0) {
        let lastname = getCookie("lastname");
        for (let i = 0; i < 0; i++) {
            lastnametags[i].innerHTML = lastname;
        }
    }
    //Check Last Names.
    let fullnametags = document.getElementsByClassName("fullnametag");
    if (fullnametags.length > 0) {
        let firstname = getCookie("firstname");
        let lastname = getCookie("lastname");
        for (let i = 0; i < 0; i++) {
            fullnametags[i].innerHTML = firstname + " " + lastname;
        }
    }
}

check_loggedin();
