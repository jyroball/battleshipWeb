<?php
/*
Version : Nov 24 2021

Desc:

References:
https://www.geeksforgeeks.org/how-to-receive-json-post-with-php/

Alternatively, we can refer to apache functions
https://www.php.net/manual/en/function.apache-request-headers.php
https://www.php.net/manual/en/function.getallheaders.php

Though, reading the comments, headers can come in mixed-case sitations.
Might need to be cleaned.
*/

// Returns request method
function request_method()
{
  return $_SERVER['REQUEST_METHOD'];
}

// Checks header CONTENT_TYPE and see if it is text/plain.
function request_istextplain()
{
  return isset($_SERVER["CONTENT_TYPE"]) && str_contains($_SERVER["CONTENT_TYPE"], "text/plain");
}

// Checks header CONTENT_TYPE and see if it is application/x-www-form-urlencoded.
function request_isurlform()
{
  return isset($_SERVER["CONTENT_TYPE"]) && str_contains($_SERVER["CONTENT_TYPE"], "application/x-www-form-urlencoded");
}


// Checks header CONTENT_TYPE and see if it is application/json.
function request_isjson()
{
  return (isset($_SERVER["CONTENT_TYPE"]) && str_contains($_SERVER["CONTENT_TYPE"], "application/json"));
}

// Returns input data , for text/plain and application/json
function request_contents()
{
  $results = NULL;
  if (request_method() == "POST")
    $results = file_get_contents('php://input');
  return $results;
}

//  Returns json decoded as object, associated array by default json["name"]
function request_json($associative = true)
{
  $results = NULL;
  if (request_isjson()) {
    $results = request_contents();
    if ($results)
      $results = json_decode($results, $associative);
  }
  return $results;
}


function request_debug()
{
  echo '$_SERVER : ' . PHP_EOL;
  var_dump($_SERVER);
  echo '$_GET : ' . PHP_EOL;
  var_dump($_GET);
  echo '$_POST : ' . PHP_EOL;
  var_dump($_POST);
}

//PHP7 or Below...
if (!function_exists('str_contains')) {
  function str_contains(string $haystack, string $needle): bool
  {
      return '' === $needle || false !== strpos($haystack, $needle);
  }
}