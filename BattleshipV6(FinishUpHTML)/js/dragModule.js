class ShipSetupModule {
    _boardsize; //store size Of board.
    _shipcellsize; //store cellsize of ships.
    _ships; //array of ship names.
    _ship_tokens; //array of ship token elements.
    _ship_slots; //array of ship slot elements.

    _mousepos; //Store Mouse Position
    _currentshipcell; //Store Current Cell Selected.
    _currentship; //Store ID of current ship.
    _dragging; // bool, to prevent more than once element dragging

    _slots_rotated;
    _enabled;

    //CONTROLLER COMMUNICATION//
    _extern_place_ship;
    _extern_remove_ship;

    //FUNCTIONS//
    //Constructor, {y:10,x:10} , 60 , ["names"]
    constructor(boardsize, shipcellsize, ships) {
        this._boardsize = boardsize;
        this._shipcellsize = shipcellsize;
        this._ships = ships;
        this._ship_tokens = new Array();
        this._ship_slots = new Array();
        this._mousepos = { x: 0, y: 0 };
        this._currentshipcell = { y: 0, x: 0 };
        this._currentship = -1;
        this._dragging = false;
        this._slots_rotated = false;
        this._enabled = false;
    }

    SetPlaceShipCallback(callback) {
        this._extern_place_ship = callback;
    }

    SetRemoveShipCallback(callback) {
        this._extern_remove_ship = callback;
    }

    GetElemCoord(coord) {
        let letterCord = String.fromCharCode(String("A").charCodeAt(0) + coord.y);
        return letterCord + (coord.x+1);
    }

    GetCoord(elemcoord) {
        let BaseAlphaCode = String("A").charCodeAt(0);
        let ycord = elemcoord.charCodeAt(0) - BaseAlphaCode;
        let xcord = parseInt(elemcoord.substr(1, 2))-1;
        return { y: ycord, x: xcord };
    }

    GetRelativePosition(elem, elem2) {
        let elemrect = elem.getBoundingClientRect();
        let elem2rect = elem2.getBoundingClientRect();
        return { l: elem2rect - elemrect, t: elem2 - elemrect };
    }

    GetTokenShip(token) {
        let ship = -1;
        for (let i = 0; i < this._ships.length; i++) {
            if (token.classList.contains(this._ships[i])) {
                ship = i;
                break;
            }
        }
        return ship;
    }

    EnableTokens()
    {
        this._enabled = true;
    }

    DisableTokens()
    {
        this._enabled = false;
    }

    SetupTokens() {
        for (let i = 0; i < this._ships.length; i++) {
            let ship = document.getElementsByClassName(this._ships[i]);
            if (ship.length > 0) {
                let name = this._ships[i];
                let token = ship[0];
                this._ship_tokens.push(token);
                this._ship_slots.push(document.getElementById(this._ships[i] + "slot"));
                token.classList.add("draggable");

                let module = this;
                token.onmousedown = function (e) {
                    module.dragging_token_start(e);
                };
            }
        }
        this.EnableTokens();
    }

    RotateSlots() {
        this._slots_rotated = !this._slots_rotated;
        let setupwindow = document.getElementById("setupwindow");

        if (!setupwindow.classList.contains("rotated")) {
            setupwindow.classList.add("rotated");
        } else if (setupwindow.classList.contains("rotated")) {
            setupwindow.classList.remove("rotated");
        }

        for (let i = 0; i < this._ship_slots.length; i++) {
            let child = this._ship_slots[i].getElementsByClassName("ship");
            console.log(child);
            if (child.length > 0) {
                child = child[0];
                if (this._slots_rotated && !child.classList.contains("rotated")) {
                    child.classList.add("rotated");
                } else if (!this._slots_rotated && child.classList.contains("rotated")) {
                    child.classList.remove("rotated");
                }
            }
        }
    }

    ReturnToken(shipid) {
        let token = this._ship_tokens[shipid];
        if (token) {
            if (this._slots_rotated && !token.classList.contains("rotated")) {
                token.classList.add("rotated");
            } else if (!this._slots_rotated && token.classList.contains("rotated")) {
                token.classList.remove("rotated");
            }
            this._ship_slots[shipid].appendChild(token);
        }
    }

    dragging_token_start(e) {
        if (this._enabled&&!this._dragging) {
            e = e || window.event;
            e.target.classList.add("dragging");
            e.preventDefault();
            // get the mouse cursor position at startup:
            this._mousepos.x = e.clientX;
            this._mousepos.y = e.clientY;

            var rect = e.target.getBoundingClientRect();

            this._currentshipcell.x = Math.floor(Math.min(Math.max(this._mousepos.x - rect.left, 0), rect.width) / this._shipcellsize);
            this._currentshipcell.y = Math.floor(Math.min(Math.max(this._mousepos.y - rect.top, 0), rect.height) / this._shipcellsize);

            let module = this;
            document.onmouseup = function (e) {
                module.dragging_token_stop(e);
            };
            document.onmousemove = function (e) {
                module.dragging_token(e);
            };
            this._currentship = this.GetTokenShip(e.target);
            this._dragging = true;
        }
    }

    dragging_token(e) {
        e = e || window.event;
        e.preventDefault();
        let token = this._ship_tokens[this._currentship];
        if(this._enabled&&token){
        // calculate the new cursor position:
        let offset = { x: this._mousepos.x - e.clientX, y: this._mousepos.y - e.clientY };
        this._mousepos.x = e.clientX;
        this._mousepos.y = e.clientY;

        // set the element's new position:
        token.style.left = token.offsetLeft - offset.x + "px";
        token.style.top = token.offsetTop - offset.y + "px";
        }
    }

    dragging_token_stop(e) {
        let token = this._ship_tokens[this._currentship];
        if (this._enabled&&token) {
            //Clear Top and Left
            token.style.top = "";
            token.style.left = "";

            let cellcoord = this.GetCellCoord(e);
            let tokenid = this._currentship;
            let rotated = token.classList.contains("rotated");
            if (cellcoord && tokenid != -1) {
                if (this._extern_place_ship(cellcoord, tokenid, rotated)) {
                    this.GetCellFromCoord(cellcoord).appendChild(token);
                }
            } else {
                this._extern_remove_ship(tokenid);
                this.ReturnToken(tokenid);
            }
            token.classList.remove("dragging");
            document.onmouseup = null;
            document.onmousemove = null;
            this._currentship = -1;
            this._dragging = false;
        }
    }

    IsCoordinate(coordstr) {
        return coordstr.match(/^[a-zA-Z]{1}[1-9]{1}[0]{0,1}$/) != null; // Validates Cell Class
    }

    GetCellFromCoord(coord) {
        return document.getElementById(this.GetElemCoord(coord));
    }

    GetCellCoord(e) {
        let coord;
        var mouse_elems = document.elementsFromPoint(e.clientX, e.clientY);
        for (let i = 0; i < mouse_elems.length; i++) {
            if (mouse_elems[i].classList.contains("cell")) {
                if (this.IsCoordinate(mouse_elems[i].id)) {
                    let cellcord = this.GetCoord(mouse_elems[i].id);
                    //Move Cord with Offset.
                    cellcord.x -= this._currentshipcell.x;
                    cellcord.y -= this._currentshipcell.y;
                    //Quick Check If In Bounds.
                    if (cellcord.x >= 0 && cellcord.x < this._boardsize.x && cellcord.y >= 0 && cellcord.y < this._boardsize.y) {
                        coord = cellcord;
                        console.log(coord);
                    }
                    break;
                }
            }
        }
        return coord;
    }
}
