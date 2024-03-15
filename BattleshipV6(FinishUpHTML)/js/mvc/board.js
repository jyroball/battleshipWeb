/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/
class Board {
    //private:
    _size; // Store Board Size {y:,x:}
    _cells; // Store Cells col[ row[cell] ]

    //public:
    //Constructor
    constructor(height, width) {
        // Store Board Size.
        this._size = { h: height, w: width };
        // Initilize Cell Array.
        this._cells = new Array(height);
        // Populate Cell Array.
        for (let y = 0; y < height; y++) {
            this._cells[y] = new Array(width);
            for (let x = 0; x < width; x++) {
                this._cells[y][x] = new Cell();
            }
        }
    }

    //Check if Coordinates are out of bound.
    InBounds(coords) {
        return coords.y >= 0 && coords.y < this._size.h && coords.x >= 0 && coords.x < this._size.w;
    }

    //Returns Cell at Coordinates.
    GetCell(coords) {
        return this._cells[coords.y][coords.x];
    }

    //Returns Cells, For Display Purposes.
    GetCells(){
        return this._cells;
    }
}
