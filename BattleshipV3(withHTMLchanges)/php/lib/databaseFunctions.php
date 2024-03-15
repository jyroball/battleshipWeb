<?php
/*
Project : BattleShip
Class : 17B
Team : 2
Version : WEB v1
Edits : Andrew Robledo
Date : Nov 20 2020

References! vvv 
https://www.w3schools.com/php/php_form_validation.asp

might need to re-do session tokens using scott's example...
https://stackoverflow.com/questions/1846202/how-to-generate-a-random-unique-alphanumeric-string
*/

define("SERVER_HOST" , "localhost");
define("SERVER_USERNAME" , "battleship2_user");
define("SERVER_PASSWORD" , "bestpassword");
define("SERVER_DATABASE" , "TestingDataBase");
define("SERVER_TABLE" , "Sessions");


//Start Connection
function connect() {
    $successful = false;
    
    // Global variable
    global $connection;
    
    // Attempt connection
    $connection = new mysqli( SERVER_HOST, SERVER_USERNAME, SERVER_PASSWORD, SERVER_DATABASE );

    // Check connection
    if ( $connection->connect_error ) {
        $successful = false;
        echo "Error Connection Failed.";
        echo $connection->connect_error;
    } else {
        $successful = true;
    }

    return $successful;
}

//Close Connection
function close() {
    global $connection;
    $connection->close();
}

// Do MYSQL query
function do_query( $newquery ) {
    $successful = false;
    
    // Global variable
    global $connection;
    
    //Attempt Connection
    if ( connect() ) {
        
        // Attempt Query
        if ( $connection->query( $newquery ) === TRUE ) {
            $successful = true;
        } else {
            echo "Error with Query.";
            echo $connection->error;
        }
        
        //Close Connection
        close();
    }
    
    return $successful;
}

// Do MYSQL query request , for retrieving data. see mysqli_result
function do_query_request( $newquery ) {
    // Store results.
    $results = NULL;
    
    // Global variable
    global $connection;
    
    // Attempt Connection
    if ( connect() ) {
        // Attempt Query, store results.
        $results = $connection->query( $newquery );
        
        // Close Connection
        close();
    }
    
    return $results;
}

// Create new session from thin air.
function newSession() {
    // Generate a new ID. uniqid( prefix, more_entropy )
    // without entropy = 13 chars
    // with entropy = 23 chars
    $newtoken = uniqid( '', true );

    // createSession() to see if token exists.
    if ( !createSession( $newtoken ) ) {
        $newtoken = NULL;
    }

    //returns NULL if successful in creating session.
    return $newtoken;
}

// Create new session in records
function createSession( $token ) {
    $successful = false;

    // MYSQL Query
    $tmp_query = "INSERT INTO " . SERVER_TABLE . " (session)
    SELECT * FROM (SELECT '{$token}' AS session) AS temp
    WHERE NOT EXISTS (
    SELECT session FROM " . SERVER_TABLE . " WHERE session = '{$token}'
    ) LIMIT 1;";

    //Attempt Query
    if ( do_query( $tmp_query ) ) {
        $successful = true;
    } else {
        echo "Failed to create session with token : {$token}";
    }

    return $successful;
}


// Fetches data from Table using session token.
function getData( $token ) {
    // MYSQL Query
    $tmp_query = "SELECT data FROM " . SERVER_TABLE . " WHERE session='{$token}'";
    
    // set data to results.
    $data = do_query_request($tmp_query)->fetch_assoc();
    
    // check if data is null
    if($data!=null)
    // mysqli->results->fetch_assoc()[] catch error
    $data = $data['data'] or "error";
    else
    $data = "error";
    
    return $data;
}

// Sets data to Table using session token.
function setData( $token , $data ) {
    $successful = false;
    
    // MYSQL Query
    $tmp_query = "UPDATE " . SERVER_TABLE . " SET data='{$data}' WHERE session='{$token}'";
    
    //Attempt Query
    if ( do_query( $tmp_query ) ) {
        $successful = true;
    } else {
        echo "Failed to update session with token : {$token}";
    }
    
    return $successful;
}

?>
