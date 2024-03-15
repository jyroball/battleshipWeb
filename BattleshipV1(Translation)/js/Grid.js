/*
Project : BattleShip
Class : 17B
Team : 2
Version : V8 Converted WEB V1
Date : Nov 23 2020
*/
class Grid {
    //private:
    _gridSize;  //Height and Width of board
    _board;     //Game board

    //public:

    //Constructor
    constructor() {
        //Set grid size
        this._gridSize = 8;

        //Allocate dynamic array for board
        CreateBoard();

        //Sets values of board to 0    
        ResetBoard();
    };

    //no true deconstructor in javascript

    CreateBoard() {
        this._board = new Array(this._gridSize);
        for (let i = 0; i < this._gridSize; i++) {
            this._board[i] = new Array(this._gridSize);
        }
    };

    ResetBoard() {
        for (let i = 0; i < this._gridSize; i++) {
            for (let j = 0; j < this._gridSize; j++) {
                //Board uses functions to manipulate data types
                this._board[i][j].resetCell();
            }
        }
    };

    Update(cords) {
        this._board[cords[0]][cords[1]].HasBeenShot(true);
        this._board[cords[0]][cords[1]].HasHit();
    };

    returnCellShot(x, y) {
        return this._board[x][y].returnShot();
    };

    returnCellShip(x, y) {
        return this._board[x][y].returnShip();
    };

    addCellShip(x, y, ship) {
        this._board[x][y].HasShip(ship);
    };
}
