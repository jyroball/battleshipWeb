/*
Project : BattleShip
Class : 17B
Team : 2
Version : V8 Converted WEB V1
Date : Nov 23 2020
*/
class PlayerData {
    //private:
    _gridData;
    _playerName;
    _shipHealth;

    //public:

    //Constructor
    constructor() {
        this._gridData = new Grid();
        this._playerName = '';//char
        this._shipHealth = 0;//int
    };

    //no true deconstructor in javascript

    setPlayerName(input) {
        this._playerName = input;
    };
    
    returnPlayerName() {
        return this._playerName;
    };

    resetGrid() {
        this._gridData.ResetBoard();
    };

    returnGrid() {
        return this._gridData;
    };

    shootCoordinate() {
        return this._gridData.Update(cords);
    };

    addShipCoords() {
    };

    updateGrid(a) {
        this._gridData = a;
    };
}
