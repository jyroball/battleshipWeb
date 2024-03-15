<?php
/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
require_once("cell.php");

class Board
{
    //private:
    private $size; // Store Board Size {y:,x:}
    private $cells; // Store Cells col[ row[cell] ]

    //public:
    //Constructor
    function __construct($height, $width)
    {
        // Store Board Size.
        $this->size = array("h" => $height, "w" => $width);
        // Initilize Cell Array.
        $this->cells = array();
        // Populate Cell Array.
        for ($y = 0; $y < $height; $y++) {
            array_push($this->cells, array());
            for ($x = 0; $x < $width; $x++) {
                $this->cells[$y][$x] = new Cell();
            }
        }
    }

    //Check if Coordinates are out of bound.
    function InBounds($coords)
    {
        return $coords["y"] >= 0 && $coords["y"] < $this->size["h"] && $coords["x"] >= 0 && $coords["x"] < $this->size["w"];
    }

    //Returns Cell at Coordinates.
    function GetCell($coords)
    {
        return $this->cells[$coords["y"]][$coords["x"]]; //$this->cells["{$coords["y"]}"]["{$coords["x"]}"];
    }

    //Returns Cells, For Display Purposes.
    function GetCells()
    {
        return $this->cells;
    }
}
