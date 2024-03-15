<?php
/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/

class Ship
{
    //private:
    private $shiptype; //Ship ID
    private $rotated; // Horizontal or Verticle?
    private $coords; // Board Location {y:0,x:0}

    //public:
    //Constructor
    function __construct($shiptype)
    {
        $this->shiptype = $shiptype;
        $this->rotated = false;
        $this->coords = array("y"=>-1,"x"=>-1);// UNSET COORDS
    }

    //Returns Coordinates
    function Coordinates() {
        return $this->coords;
    }

    //Sets Coordinates
    function SetCoordinates($coords) {
        $this->coords = $coords;
    }

    //Return Ship Type
    function ShipType() {
        return $this->shiptype;
    }

    //Sets Ship Type
    function SetShipType($shiptype) {
        $this->shiptype = $shiptype;
    }

    //Return If Rotated
    function Rotated() {
        return $this->rotated;
    }

    //Set If Rotated
    function SetRotated($rotated) {
        $this->rotated = $rotated;
    }
}
