<?php
/*
Made a change? Leave your signature!

If you do use this, Make sure you read the references first.
Understand what mysqli is doing with queries and errors.
This is primarily the object oriented approach with mysqli.

Signatures:
Andrew Robledo - "quick and simple mysql!"

Version : Nov 24 2021
Modified : Dec 2 2021

Desc:
Simple MYSQL interface for php.

uses mysqli object oriented methods

Refer to these References:
named constant
https://www.php.net/manual/en/function.define.php

globals
https://www.php.net/manual/en/language.variables.scope.php

isset
https://www.php.net/manual/en/function.isset.php

mysqli
https://www.php.net/manual/en/class.mysqli.php
https://www.php.net/manual/en/mysqli.ping
https://www.php.net/manual/en/mysqli.connect-errno.php
https://www.php.net/manual/en/mysqli.connect-error.php
https://www.php.net/manual/en/mysqli.change-user.php
https://www.php.net/manual/en/mysqli.select-db.php

important!: query will return mysqli_result on queries which produce a result set.
https://www.php.net/manual/en/mysqli.query.php
*/

define("SERVER_HOST", "localhost");
define("SERVER_USERNAME", "root");
define("SERVER_PASSWORD", "");
define("SERVER_DATABASE", "RCCCSCCIS17B");

// Starts Connection , optional database_name (default = '')
function database_connect()
{
    $successful = false;

    // Global variable
    global $mysql_connection;

    // Test to see if already connected, and alive.
	// Weird interaction with ping, ommiting echo using @, 
	// Probably use (!$conn->errorid) to check connection.
    if (isset($mysql_connection) && @$mysql_connection->ping()) {
        $successful = true;
    } else {
        // Attempt connection
        $mysql_connection = new mysqli(SERVER_HOST, SERVER_USERNAME, SERVER_PASSWORD, SERVER_DATABASE);

        // Check connection
        if ($mysql_connection->connect_error) {
            echo $mysql_connection->connect_error;
        } else {
            $successful = true;
        }
    }

    return $successful;
}

// Closes Connection
function database_close()
{
    // Global variable
    global $mysql_connection;

    // Quick check to see if connection exists.
    if (isset($mysql_connection))
        $mysql_connection->close();
}

// Do MYSQL query
function database_query($newquery)
{
    $results = NULL;

    // Global variable
    global $mysql_connection;

    // Attempt Connection , Store Results.
    if (database_connect()) {
        $results = $mysql_connection->query($newquery);
    }

    return $results;
}

// Do MYSQL query and disconnects.
function database_quick_query($newquery)
{
    $results = NULL;

    // Global variable
    global $mysql_connection;

    // Attempt Connection , Store Results.
    if (database_connect()) {
        $results = $mysql_connection->query($newquery);
        database_close();
    }

    return $results;
}
