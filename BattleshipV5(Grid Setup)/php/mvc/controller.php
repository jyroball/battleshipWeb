<?php
/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
require_once("model.php");
require_once("view.php");

//Main Controller for handling simple functional game checks.
class Controller {
    //private:
    private $model;
    private $view;
    private $gamestate; //Game States Determine The Functionality and Display
    /*
    (client)Loading - Waiting for server response.
    Queue - Waiting for other player. Pinging Every 30 Seconds.
    Setup - User is setting up ships.
    Waiting - Displays User's Boards. Pinging Every 30 Seconds. (Display last turn action if applicable)
    Turn - User is doing their turn. (Display last turn action if applicable)
    Spectating - Watching a On-Going Game.
    Post - Game Ended, Post Score Screen. (Display user's last turn if applicable)
    Error - ??? Error Happened.
    */
    //Constructor
    function __construct() {
        $this->gamestate = "Loading"; //Initial Game State.
        $this->view = new View(); // Initiate View Classes.
        $this->model = new Model(2); // Only 2 Players Obviously!
    }

    function UpdateBoards($player, $data) {

    }
}
