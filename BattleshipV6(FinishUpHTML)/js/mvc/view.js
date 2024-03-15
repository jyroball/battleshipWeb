/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/

class View {
    //Constructor
    constructor() {}

    GetCellElem(coord) {
        return document.getElementById(GetElemCoord(coord));
    }

    GetShipElem(ship) {
        return document.getElementById(GetElemShip("ship" + ship));
    }

    GetElemCoord(coord) {
        let letterCord = String.fromCharCode(String("A").charCodeAt(0) + coord.y);
        let coordinate = letterCord + coord.x;
        return coordinate;
    }

    GetPlayerElemCoord(coord, player) {
        let letterCord = String.fromCharCode(String("A").charCodeAt(0) + coord.y);
        let coordinate = "P" + (player + 1) + letterCord + coord.x;
        return coordinate;
    }

    GetElemShip(ship) {
        return "ship" + ship;
    }
}
