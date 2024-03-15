var password_reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/; // Must contain one lowercase one uppercase, one numeric
var username_reg = /^[a-zA-Z0-9]{1,20}$/; // Only  a-z  A-Z  0-9
var displayname_reg = /^[a-zA-Z]{1,20}$/; // Only  a-z  A-Z

// Login Function, POST json object
function login() {
    let ele_username = document.getElementById("username");
    let ele_password = document.getElementById("password");
    let ele_login = document.getElementById("login");

    let valid = false;

    //Check if elements exist
    if (ele_username && ele_password && ele_login) {
        //Check Username REGEX
        if (ele_username.value.match(username_reg) != null) {
            valid = true;
        } else {
            valid = false;
            updateError("Invalid Username, Only Alphebetical and Numerical allowed. Max length of 20.");
        }

        //Check Password REGEX
        if (valid && ele_password.value.match(password_reg) != null) {
            valid = true;
        } else if (valid) {
            valid = false;
            updateError("Invalid Password, Must Contain one lowercse, one uppercase, one numeric. Min length of 5, Max length of 20");
        }

        //If all inputs valid, disable button
        if (valid)
            if (valid) {
                updateError("Logging in...");
                //Setup payload to server, POST
                let sha1password = sha1(ele_username.value.toLowerCase() + ele_password.value);
                let data = { type: "userlogin", username: ele_username.value, password: sha1password };
                HTML_Request("php/login.php", "POST", data, login_callback);
                ele_login.disabled = true; //Disable login button
            }
    }
}

//Login Callback, Handle Data From Server.
function login_callback(contenttype, data) {
    let ele_login = document.getElementById("login");
    if (contenttype != "error" && data["result"]) {
        switch (data["result"]) {
            case "loggedin":
                updateError("Logged in! Redirecting...");
                location.assign("menu.html");
                break;
            case "unknownuser":
                updateError("That Username Doesn't Exist.");
                ele_login.disabled = false; //Enable Login Button.
                break;
            case "wrongpassword":
                updateError("Incorrect Login Information.");
                ele_login.disabled = false; //Enable Login Button.
                break;
            default:
                updateError("Unknown Reply : " + data["result"]);
                ele_login.disabled = false; //Enable Login Button.
        }
    } else {
        updateError("Error : " + data);
        ele_login.disabled = false; //Enable Login Button.
    }
}

//Signup function, Post Json object
function signup() {
    let data = { type: "userlogin", username: "", sha1: "" };
    let ele_username = document.getElementById("username");
    let ele_firstname = document.getElementById("firstname");
    let ele_lastname = document.getElementById("lastname");
    let ele_password = document.getElementById("password");
    let ele_repassword = document.getElementById("repassword");
    let ele_signup = document.getElementById("signup");

    //Check if elements exist
    if (ele_username && ele_firstname && ele_lastname && ele_password && ele_repassword) {
        //Check Username REGEX
        if (ele_username.value.match(username_reg) != null) {
            valid = true;
        } else {
            valid = false;
            updateError("Invalid Username, Only Alphebetical and Numerical allowed. Max length of 20.");
        }

        //Check First Name REGEX
        if (valid && ele_firstname.value.match(displayname_reg) != null) {
            valid = true;
        } else if (valid) {
            valid = false;
            updateError("Invalid First Name, Only Alphebetical allowed. Max length of 20.");
        }

        //Check Last Name REGEX
        if (valid && ele_lastname.value.match(displayname_reg) != null) {
            valid = true;
        } else if (valid) {
            valid = false;
            updateError("Invalid Last Name, Only Alphebetical allowed. Max length of 20.");
        }

        //Check Password REGEX
        if (valid && ele_password.value.match(password_reg) != null) {
            valid = true;
        } else if (valid) {
            valid = false;
            updateError("Invalid Password, Must Contain one lowercse, one uppercase, one numeric. Min length of 5, Max length of 20");
        }

        //Check Password Matching
        if (valid && ele_repassword.value == ele_password.value) {
            valid = true;
        } else if (valid) {
            valid = false;
            updateError("Passwords do not match!");
        }

        //If all inputs valid, disable button
        if (valid) {
            updateError("Signing up...");
            //Setup payload to server, POST
            let sha1password = sha1(ele_username.value.toLowerCase() + ele_password.value);
            let data = { type: "usersignup", username: ele_username.value, firstname: ele_firstname.value, lastname: ele_lastname.value, password: sha1password };
            HTML_Request("php/signup.php", "POST", data, signup_callback);
            ele_signup.disabled = true; //Disable signup button
        }
    }
}

function signup_callback(contenttype, data) {
    let ele_signup = document.getElementById("signup");
    if (contenttype != "error" && data["result"]) {
        switch (data["result"]) {
            case "signedup":
                updateError("Signed up! Redirecting...");
                location.assign("login.html?signedup");
                break;
            case "usertaken":
                updateError("That Username already exists.");
                ele_signup.disabled = false; //Enable Login Button.
                break;
            default:
                updateError("Unknown Reply : " + data["result"]);
                ele_signup.disabled = false; //Enable Login Button.
        }
    } else {
        updateError("Error : " + data);
        ele_signup.disabled = false; //Enable Login Button.
    }
}

//Quick Validation, Updates 'output' Element
function updateError(text) {
    let ele_output = document.getElementById("output");
    if (ele_output) {
        ele_output.innerHTML = text;
    }
}