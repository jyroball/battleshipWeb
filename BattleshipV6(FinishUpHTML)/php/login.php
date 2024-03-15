<?php
/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
require_once("lib/requestFunctions.php");
require_once("database.php");

//Setup results.
$response_results = array("result" => "UNKNOWN ERROR!");

//Checks if Request is "POST"
if (request_method() == "POST") {
    //Checks if content-type is json
    if (request_isjson()) {
        $jsondata = request_json();
        //Checks if contains "type"
        if (isset($jsondata["type"])) {
            switch ($jsondata["type"]) {
                case "test":
                    echo request_debug();
                    break;
                case "userlogin":
                    if (isset($jsondata["username"]) && isset($jsondata["password"])) {
                        BSDatabase::StartConnection();
                        $result = BSDatabase::Login($jsondata["username"], $jsondata["password"]);
                        BSDatabase::StopConnection();
                        $response_results["result"] = $result;
                    } else {
                        $response_results["result"] = "SIGNUP DATA MISSING!";
                    }
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
