/*
Project : BattleShip
Class : 17B
Team : 1
Version : Revised Web Version V3
NOTE WE ARE USING COORDINATE SYSTEM Y,X to account for "A 10" being our standard.
*/

//Interfaced Controller to work with PHP
class Controller {
    //private:
    _model;
    _view;
    //public:
    _gamestate; //Game States Determine The Functionality and Display
    /*
    (client)Loading - Waiting for server response.
    Queue - Waiting for other player. Pinging Every 30 Seconds.
    Setup - User is setting up ships.
    Waiting - Displays User's Boards. Pinging Every 30 Seconds. (Display last turn action if applicable)
    Turn - User is doing their turn. (Display last turn action if applicable)
    Spectating - Watching a On-Going Game.
    Post - Game Ended, Post Score Screen. (Display user's last turn if applicable)
    Error - ??? Error Happened.
    */
    //Constructor
    constructor() {
        this._gamestate = "Loading"; //Initial Game State.
        this._view = new View(); // Initiate View Classes.
        this._model = new Model(2); // Only 2 Players Obviously!
    }

    UpdateView(common_data) {
        switch (this._gamestate) {
            case "Queue":
                break;
            case "Setup":
                break;
            case "Waiting":
                break;
            case "Turn":
                break;
            case "Spectating":
                break;
            case "Post":
                break;
            case "Error":
                break;
            default:
            //Loading Still...
        }
    }

    UpdateBoards(player, data) {

    }
}
