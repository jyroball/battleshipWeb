/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
class Cell {
    //private:
    _ship; //Ship exists -1 is No Ship ID.
    _shot; //Ship has been shot
    _hit; //Ship has been hit

    //public:

    //Constructor
    constructor() {
        this.resetCell();
    }

    //Reset Cell
    resetCell() {
        this._ship = -1;
        this._shot = false;
        this._hit = false;
    }

    //Return hasShip
    HasShip() {
        return this._ship != -1;
    }

    //Sets ship in cell.
    SetShip(ship) {
        this._ship = ship;
    }

    //Resets ship in cell.
    ClearShip() {
        this._ship = -1;
    }

    //Return HasBeenShot
    HasBeenShot(beenShot) {
        this._shot = beenShot;
    }

    //Return the cells hit status
    HasHit() {
        if (this._ship != -1 && this._shot) {
            this._hit = true;
        }
        return this._hit;
    }

    //Return shot
    returnShot() {
        return this._shot;
    }

    //Return ship
    returnShip() {
        return this._ship;
    }

    //Return hit
    returnHit() {
        return this._hit;
    }
}
