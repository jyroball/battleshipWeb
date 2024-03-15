/*
Project : BattleShip
Class : 17B
Team : 2
Version : V8 Converted WEB V1
Date : Nov 23 2020
*/
class Cell {
    //private:
    _ship; //Ship exists
    _shot; //Ship has been shot
    _hit; //Ship has been hit

    //public:

    //Constructor
    constructor() {
        this._ship = 0;
        this._shot = false;
        this._hit = false;
    };

    //Reset Cell 
    resetCell() {
        this.this._ship = 0;
        this._shot = false;
        this._hit = false;
    };

    //Return hasShip 
    HasShip(hasShip) {
        this._ship = hasShip;
    };

    //Return HasBeenShot
    HasBeenShot(beenShot) {
        this._shot = beenShot;
    };

    //Return the cells hit status
    HasHit() {
        if (this._ship != 0 && this._shot) {
            this._hit = true;
        }
    };

    //Return shot
    returnShot() {
        return this._shot;
    };

    //Return ship
    returnShip() {
        return this._ship;
    };

    //Return hit
    returnHit() {
        return this._hit;
    };
}
