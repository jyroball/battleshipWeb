<?php
/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
require_once("ship.php");

class Model {
    //const
    public $shipSize = [5, 4, 3, 3, 2];
    public $shipType = [5, 4, 3, 2, 1];

    //private:
    private $playerboards;
    private $playerships;

    //Constructor
    function __construct($numplayers) {
        $this->playerboards = array(); //new Array(numplayers);
        $this->playerships = array(); //new Array(numplayers);
        // Populate Player Ships
        for ($i = 0; $i < $numplayers; $i++) {
            array_push($this->playerboards, array());
            for ($j = 0; $j < count($this->shipType); $j++) {
                $this->playerships[$i][$j] = new Ship($this->shipType[$j]);
            }
        }
    }

    function ShipFits($player, $coords, $ship) {
        $hasSpace = true; // Flag for Has Space.
        $playercells = $this->playerboards[$player]->GetCells(); //Grab Player Cells
        $tempcoords = array("y"=>$coords["y"],"x"=>$coords["x"]);// Clone Coords
        $shipdata = $this->playerships[$player][$ship]; // Reference Ship

        // Scan cells to see if ship fits.
        for ($i = 0; $i < $this->shipSize[$ship]; $i++) {
            $cellship = $playercells[$tempcoords["y"]][$tempcoords["x"]]->returnShip();
            // Check if Coordinate is in bounds and not overlapping another ship, Can overlap self, incase ship moved.
            if (!$this->playerboards[$player]->InBounds($tempcoords) || ($cellship != -1 && $cellship != $ship)) {
                $hasSpace = false;
                break;
            }
            // Move Temp Coordinates by one.
            if ($shipdata->Rotated()) {
                $tempcoords["x"]++;
            } else {
                $tempcoords["y"]++;
            }
        }
        return $hasSpace;
    }

    //Returns if ship is set.
    function ShipSet($player, $ship) {
        $shipdata = $this->playerships[$player][$ship]; // Reference Ship
        $shipcoords = $shipdata->Coordinates(); //Reference Ship's Coordinates
        return $shipcoords["y"] != -1 && $shipcoords["x"] != -1;
    }

    // Applies Ship to Cells.
    function ApplyShip($player, $coords, $ship) {
        $playercells = $this->playerboards[$player]->GetCells(); //Grab Player Cells
        $tempcoords = array("y"=>$coords["y"],"x"=>$coords["x"]);// Clone Coords
        $shipdata = $this->playerships[$player][$ship]; // Reference Ship
        // Update Cells.
        for ($i = 0; $i < $this->shipSize[$ship]; $i++) {
            $playercells[$tempcoords["y"]][$tempcoords["x"]]->SetShip($ship);
            //Move Temp Coordinates by one.
            if ($shipdata->Rotated()) {
                $tempcoords["x"]++;
            } else {
                $tempcoords["y"]++;
            }
        }
        $shipdata->SetCoordinates($coords);
    }

    // Clears Ship from Cells.
    function ClearShip($player, $ship) {
        if ($this->ShipSet($player, $ship)) {
            $playercells = $this->playerboards[$player]->GetCells(); //Grab Player Cells
            $shipdata = $this->playerships[$player][$ship]; // Reference Ship
            $shipcoords = $shipdata->Coordinates(); //Reference Ship's Coordinates
            $tempcoords = array("y"=>$shipcoords["y"],"x"=>$shipcoords["x"]);// Clone Coords
            // Update Cells.
            for ($i = 0; $i < $this->shipSize[$ship]; $i++) {
                $playercells[$tempcoords["y"]][$tempcoords["x"]]->ClearShip();
                //Move Temp Coordinates by one.
                if ($shipdata->Rotated()) {
                    $tempcoords["x"]++;
                } else {
                    $tempcoords["y"]++;
                }
            }
            //Set ship coordinates to unset.
            $shipdata->SetCoordinates(array("y"=>-1,"x"=>-1));
        }
    }

    // Updates Ship Data.
    function UpdateShip($player, $coords, $rotated, $ship) {
        $shipdata = $this->playerships[$player][$ship]; // Reference Ship
        $shipdata->SetCoordinates($coords);
        $shipdata->SetRotated($rotated);
        $shipdata->SetShipType($this->shipType[$ship]);
    }

    // Checks and Places Ship.
    function PlaceShip($player, $coords, $rotated, $ship) {
        $this->UpdateShip($player, $coords, $rotated, $ship);
        $success = $this->ShipFits($player, $coords, $ship);
        if ($success) {
            $this->ApplyShip($player, $coords, $ship);
        }
        return $success;
    }
}
