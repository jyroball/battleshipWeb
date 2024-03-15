<?php
class Cell
{
    private $ship;
    private $shot;
    private $hit;

    function __construct()
    {
        $this->resetCell();
    }

    function resetCell()
    {
        $this->ship = -1;
        $this->shot = false;
        $this->hit = false;
    }

    //Return hasShip
    function HasShip()
    {
        return $this->ship != -1;
    }

    //Sets ship in cell.
    function SetShip($ship)
    {
        $this->ship = $ship;
    }

    //Resets ship in cell.
    function ClearShip()
    {
        $this->ship = -1;
    }

    //Return HasBeenShot
    function HasBeenShot($beenShot)
    {
        $this->shot = $beenShot;
    }

    //Return the cells hit status
    function HasHit()
    {
        if ($this->ship != -1 && $this->shot) {
            $this->hit = true;
        }
        return $this->hit;
    }

    //Return shot
    function returnShot()
    {
        return $this->shot;
    }

    //Return ship
    function returnShip()
    {
        return $this->ship;
    }

    //Return hit
    function returnHit()
    {
        return $this->hit;
    }
}
