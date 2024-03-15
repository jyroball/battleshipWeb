/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
class Ship {
    //private:
    _shiptype; //Ship ID
    _rotated; // Horizontal or Verticle?
    _coords; // Board Location {y:0,x:0}

    //public:
    //Constructor
    constructor(shiptype) {
        this._shiptype = shiptype;
        this._rotated = false;
        this._coords = { y: -1, x: -1 }; // UNSET COORDS
    }

    //Returns Coordinates
    Coordinates() {
        return this._coords;
    }

    //Sets Coordinates
    SetCoordinates(coords) {
        this._coords = coords;
    }

    //Return Ship Type
    ShipType() {
        return this._shiptype;
    }

    //Sets Ship Type
    SetShipType(shiptype) {
        this._shiptype = shiptype;
    }

    //Return If Rotated
    Rotated() {
        return this._rotated;
    }

    //Set If Rotated
    SetRotated(rotated) {
        this._rotated = rotated;
    }
}
