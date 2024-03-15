<?php
/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
require_once("lib/requestFunctions.php");
require_once("mvc/controller.php");
require_once("database.php");

//Setup results.
$response_results = array("result" => "UNKNOWN ERROR!");

//Check if "GET" Request from user.
if (request_method() == "GET") {
    //Checks if URL FORM CONTAINS "type"
    if (isset($_GET["type"])) {
        switch ($_GET["type"]) {
            case "test":
                echo request_debug();
                break;
            case "loggedin":
                $loggedin = BSDatabase::Loggedin();
                if($loggedin)
                {
                    $response_results["result"] = "loggedin";
                }else{
                    $response_results["result"] = "notloggedin";
                }
                break;
            default:
                $response_results["result"] = "UNKNOWN REQUEST TYPE!";
        }
        //Checks if URL FORM CONTAINS "content"
    } else  if (isset($_GET["content"])) {
        switch ($_GET["content"]) {
            case "leaderboard":
                //TO-DO//
                break;
            default:
                $response_results["result"] = "UNKNOWN CONTENT TYPE!";
        }
    } else {
        $response_results["result"] = "REQUEST TYPE MISSING!";
    }
}
//Check if "POST" Request from user.
else if (request_method() == "POST") {
    //Checks if content-type is json
    if (request_isjson()) {
        $jsondata = request_json();
        //Checks if contains "type"
        if (isset($jsondata["type"])) {
            switch ($jsondata["type"]) {
                case "test":
                    echo request_debug();
                    break;
                default:
                    $response_results["result"] = "UNKNOWN REQUEST TYPE!";
            }
        } else {
            $response_results["result"] = "REQUEST TYPE MISSING!";
        }
    } else {
        $response_results["result"] = "POST DATA IS NOT JSON!";
    }
} else {
    $response_results["result"] = "REQUEST DENIED!";
}

header('Content-Type: application/json');
echo json_encode($response_results);
