<?php
/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/

class View
{
    //Constructor
    function __construct()
    {
    }
    //Loads page and replaces it with tokens, replacelist["token"] = "replace";
    function loadPage($page, $replacelist)
    {
        $html = file_get_contents($page);
        if (isset($replacelist)) {
            foreach ($replacelist as $token => $replacement) {
                $html = str_replace($token, $replacement, $html);
            }
        }
        return $html;
    }
}
