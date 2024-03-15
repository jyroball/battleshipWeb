<?php
/*
Project : BattleShip
Class : 17B
Team : 2
Version : WEB v1
Edits : Andrew Robledo
Date : Nov 20 2020

References! vvv
https://www.geeksforgeeks.org/how-to-receive-json-post-with-php/
*/

require_once "clean.php";

// Request Method is 'POST'
if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
    echo 'POST METHOD';
    echo '<br />';
    // Check if Post Content is JSON
    if ( str_contains( $_SERVER["CONTENT_TYPE"], "application/json" ) ) {
        $json = file_get_contents( 'php://input' );
        // convert to object
        // $json = json_decode( $json );
        echo 'IS JSON : ';
        echo '<br />';
        echo clean_input($json);
    } else {
        foreach ( $_POST as $param_name => $param_val ) {
            echo "Name: '$param_name' Value: '$param_val', ";
            echo '<br />';
        }
    }
}

// Request Method is 'GET'
else if ( $_SERVER['REQUEST_METHOD'] == 'GET' ) {
    echo 'GET METHOD';
    echo '<br />';
    echo  '$_GET : ';
    echo '<br />';
    foreach ( $_GET as $param_name => $param_val ) {
        echo "Param: $param_name; Value: $param_val ,";
        echo '<br />';
    }
}
?>
