/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/

class Model {
    //const
    _shipSize = [5, 4, 3, 3, 2];
    _shipType = [5, 4, 3, 2, 1];

    //private:
    _playerboards;
    _playerships;

    //Constructor
    constructor(numplayers) {
        this._playerboards = new Array(numplayers);
        this._playerships = new Array(numplayers);
        // Populate Player Ships
        for (let i = 0; i < numplayers; i++) {
            this._playerships[i] = new Array(this._shipType.length);
            for (let j = 0; j < this._shipType.length; j++) {
                this._playerships[i][j] = new Ship(this._shipType[j]);
            }
        }
    }

    ShipFits(player, coords, ship) {
        let hasSpace = true; // Flag for Has Space.
        let playercells = this._playerboards.GetCells(); //Grab Player Cells
        let tempcoords = { y: coords.y, x: coords.x }; // Clone Coordinates
        let shipdata = this._playerships[player][ship]; // Reference Ship

        // Scan cells to see if ship fits.
        for (let i = 0; i < this._shipSize[ship]; i++) {
            let cellship = playercells[tempcoords.y][tempcoords.x].returnShip();
            // Check if Coordinate is in bounds and not overlapping another ship, Can overlap self, incase ship moved.
            if (!_playerboards[player].InBounds(tempcoords) || (cellship != -1 && cellship != ship)) {
                hasSpace = false;
                break;
            }
            // Move Temp Coordinates by one.
            if (shipdata.Rotated()) {
                tempcoords.x++;
            } else {
                tempcoords.y++;
            }
        }
        return hasSpace;
    }

    //Returns if ship is set.
    ShipSet(player, ship) {
        let shipdata = this._playerships[player][ship]; // Reference Ship
        let shipcoords = shipdata.Coordinates(); //Reference Ship's Coordinates
        return shipcoords.y != -1 && shipcoords.x != -1;
    }

    // Applies Ship to Cells.
    ApplyShip(player, coords, ship) {
        let playercells = this._playerboards.GetCells(); //Grab Player Cells
        let tempcoords = { y: coords.y, x: coords.x }; // Clone Coordinates
        let shipdata = this._playerships[player][ship]; // Reference Ship
        // Update Cells.
        for (let i = 0; i < this._shipSize[ship]; i++) {
            playercells[tempcoords.y][tempcoords.x].SetShip(ship);
            //Move Temp Coordinates by one.
            if (shipdata.Rotated()) {
                tempcoords.x++;
            } else {
                tempcoords.y++;
            }
        }
        shipdata.SetCoordinates(coords);
    }

    // Clears Ship from Cells.
    ClearShip(player, ship) {
        if (this.ShipSet(player, ship)) {
            let playercells = this._playerboards[player].GetCells(); //Grab Player Cells
            let shipdata = this._playerships[player][ship]; // Reference Ship
            let shipcoords = shipdata.Coordinates(); //Reference Ship's Coordinates
            let tempcoords = { y: shipcoords.y, x: shipcoords.x }; // Clone Coordinates
            // Update Cells.
            for (let i = 0; i < this._shipSize[ship]; i++) {
                playercells[tempcoords.y][tempcoords.x].ClearShip();
                //Move Temp Coordinates by one.
                if (shipdata.Rotated()) {
                    tempcoords.x++;
                } else {
                    tempcoords.y++;
                }
            }
            //Set ship coordinates to unset.
            shipdata.SetCoordinates({ y: -1, x: -1 });
        }
    }

    // Updates Ship Data.
    UpdateShip(player, coords, rotated, ship) {
        let shipdata = this._playerships[player][ship]; // Reference Ship
        shipdata.SetCoordinates(coords);
        shipdata.SetRotated(rotated);
        shipdata.SetShipType(this._shipType[ship]);
    }

    // Checks and Places Ship.
    PlaceShip(player, coords, rotated, ship) {
        this.UpdateShip(player, coords, rotated, ship);
        let success = this.ShipFits(player, coords, ship);
        if (success) {
            this.ApplyShip(player, coords, ship);
        }
        return success;
    }
}
