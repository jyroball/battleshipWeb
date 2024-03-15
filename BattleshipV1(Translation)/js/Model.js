/*
Project : BattleShip
Class : 17B
Team : 2
Version : V8 Converted WEB V1
Date : Nov 23 2020
*/
class Model {
    //private:
    static _shipSize = [5, 4, 3, 3, 2];
    static _shipType = [5, 4, 3, 2, 1];

    //public:

    //Constructor
    constructor() {};

    shipFits(player, array, direction, ship) {
        let hasSpace = false;
        if (player.returnCellShip(array[0], array[1]) == 0) {
            let sum = 0;
            switch (direction) {
                case 1:
                    for (let i = 1; i < this._shipSize[ship]; i++) {
                        sum = array[1] - i;
                        if (sum >= 0 && player.returnCellShip(array[0], sum) == 0) {
                            hasSpace = true;
                        } else {
                            hasSpace = false;
                            return hasSpace;
                        }
                    }
                    return hasSpace;
                    break;
                case 2:
                    for (let i = 1; i < this._shipSize[ship]; i++) {
                        sum = array[0] + i;
                        if (sum <= 7 && player.returnCellShip(sum, array[1]) == 0) {
                            hasSpace = true;
                        } else {
                            hasSpace = false;
                            return hasSpace;
                        }
                    }
                    return hasSpace;
                    break;
                case 3:
                    for (let i = 1; i < this._shipSize[ship]; i++) {
                        sum = array[1] + i;
                        if (sum <= 7 && player.returnCellShip(array[0], sum) == 0) {
                            hasSpace = true;
                        } else {
                            hasSpace = false;
                            return hasSpace;
                        }
                    }
                    return hasSpace;
                    break;
                case 4:
                    for (let i = 1; i < this._shipSize[ship]; i++) {
                        sum = array[0] - i;
                        if (sum >= 0 && player.returnCellShip(sum, array[1]) == 0) {
                            hasSpace = true;
                        } else {
                            hasSpace = false;
                            return hasSpace;
                        }
                    }
                    return hasSpace;
                    break;
                default:
                    return hasSpace;
                    break;
            }
        } else {
            return hasSpace;
        }
    };

    placeShips(player, array, direction, ship) {
        //change to 2 integers to pass
        let x = array[0];
        let y = array[1];
        let sum = 0;
        //Add ships in the direction
        switch (direction) {
            case 1:
                for (let i = 0; i < this._shipSize[ship]; i++) {
                    sum = y - i;
                    player.addCellShip(x, sum, this._shipType[ship]);
                }
                break;
            case 2:
                for (let i = 0; i < this._shipSize[ship]; i++) {
                    sum = x + i;
                    player.addCellShip(sum, y, this._shipType[ship]);
                }
                break;
            case 3:
                for (let i = 0; i < this._shipSize[ship]; i++) {
                    sum = y + i;
                    player.addCellShip(x, sum, this._shipType[ship]);
                }
                break;
            case 4:
                for (let i = 0; i < this._shipSize[ship]; i++) {
                    sum = x - i;
                    player.addCellShip(sum, y, this._shipType[ship]);
                }
                break;
            default:
                break;
        }
        return player;
    };
}
