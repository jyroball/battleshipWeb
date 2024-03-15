<?php
/*
Project : BattleShip
Class : 17B
Team : 2
Version : WEB v1
Edits : Andrew Robledo
Date : Nov 20 2020

References! vvv 
https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql
*/

require_once "databaseFunctions.php";

define("SERVER_USERNAME_ADMIN", "root");
define("SERVER_PASSWORD_ADMIN", "");

// Start Connection As Admin
function connect_admin($ignoreDatabase=false)
{
    $successful = false;

    // global variable
    global $connection;
    
    // Setup new connection. is Database ignored.
    if($ignoreDatabase)
    $connection = new mysqli(SERVER_HOST, SERVER_USERNAME_ADMIN, SERVER_PASSWORD_ADMIN);
    else
    $connection = new mysqli(SERVER_HOST, SERVER_USERNAME_ADMIN, SERVER_PASSWORD_ADMIN, SERVER_DATABASE);
    
    // Check connection
    if ($connection->connect_error)
    {
        $successful = false;
        echo "Error Connection Failed.";
        echo $connection->connect_error;
    }
    else
    {
        $successful = true;
    }
    
    return $successful;
}

// Do MYSQL query with admin
function do_query_admin($newquery,$ignoreDatabase=false)
{
    $successful = false;
    
    // global variable
    global $connection;
    
    // Attempt Connection
    if (connect_admin($ignoreDatabase))
    {
        // Attempt Query
        if ($connection->query($newquery) === true)
        {
            $successful = true;
        }
        else
        {
            echo "Error with Query.";
            echo $connection->error;
        }
        
        //Close Connection
        close();
    }
    return $successful;
}

// Resets data from Table.
function purgeTable()
{
    $tmp_query = "TRUNCATE TABLE " . SERVER_TABLE;
    return do_query_admin($tmp_query);
}

// Creates Database.
function createDatabase()
{
    $tmp_query = "CREATE DATABASE IF NOT EXISTS " . SERVER_DATABASE;
    return do_query_admin($tmp_query,true);
}

// Creates Table.
function createTable()
{
    $tmp_query = "CREATE TABLE IF NOT EXISTS " . SERVER_TABLE . " (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session VARCHAR(23) NOT NULL,
    data VARCHAR(255) DEFAULT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);";
    return do_query_admin($tmp_query);
}

// Creates User.
function createUser()
{
    $successful = false;
    
    $tmp_query = "CREATE USER IF NOT EXISTS '" . SERVER_USERNAME . "'@'" . SERVER_HOST . "' IDENTIFIED BY '" . SERVER_PASSWORD . "';";
    $successful = do_query_admin($tmp_query);
    
    if($successful){
        
    $tmp_query = "GRANT ALL PRIVILEGES ON " . SERVER_DATABASE . "." . SERVER_TABLE . " TO '" . SERVER_USERNAME . "'@'" . SERVER_HOST . "';";
    $successful = do_query_admin($tmp_query);
    
    }
    
    return $successful;
}

// Initialize Database, Table, and User.
function initiateDataBase()
{   
    $successful = true;
    if(!createDataBase()){
        echo "error creating database.";
        $successful = false;
    }else if(!createTable()){
        echo "error creating table.";
        $successful = false;
    }else if(!createUser()){
        echo "error creating user.";
        $successful = false;
    }
    return $successful;
}

