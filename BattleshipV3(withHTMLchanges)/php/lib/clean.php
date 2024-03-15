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
*/

// Function to clean user input strings
function clean_input($data)
{
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>