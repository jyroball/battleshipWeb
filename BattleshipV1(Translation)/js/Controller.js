/*
Project : BattleShip
Class : 17B
Team : 2
Version : V8 Converted WEB V1
Date : Nov 23 2020
*/
class Controller {
    //private:
    _userInput;              //Hold user input
    static _numPlayers = 2;   //Hold number of players
    _players;                //Pointer to array of players
    
    //public:
    pdata = new Model();                   //Model object to hold player data
    display = new View();                 //View object for output
    input = new Input();                   //Input object for input. 'in' might be researved.

    //Constructor
    constructor() {
        this._userInput = 'X';
        this._players = new Array(this._numPlayers);
    };

    //Game setup
    setUp() {
        //Loop for two players
        for (let i = 0; i < this._numPlayers; i++) {
            let intSize = 2; //Size of input coordinates array
            let coords = new Array(intSize); //Hold input coordinates
            let orientation; //Hold ship orientation choice
    
            //Ask Player for their name
            this.display.playerNamePrompt(i);
    
            //Set Player name
            this._players[i].setPlayerName(this.input.inputPlayerData());
    
            //Bool for loops
            let like = false; //User likes ship placement = true
            let fits = false; //Ships fit = true
    
            //Place Ships
            //Loop until user likes placement
            while (!like) {
                this._players[i].resetGrid(); //Reset grid
    
                //Loop on number of ships in fleet
                for (let u = 0; u < 5; u++) {
                    fits = false;
    
                    //Checks if ship fits in grid
                    while (!fits) {
                        //Output Grid for reference
                        this.display.drawPlayerGrid(this._players[i]);
    
                        //Output prompt for coordinates
                        this.display.coordinatePrompt();
                        coords = this.input.inputCoordinates();
    
                        //Output prompt for ship orientation
                        this.display.directionPrompt();
                        orientation = this.input.inputUserSetUp();
    
                        //Place ships in grid 
                        fits = this.pdata.shipFits(this._players[i].returnGrid(), coords, orientation, u);
    
                        //if shipFits = true run placeShips()
                        if (fits) {
                            this._players[i].updateGrid(this.pdata.placeShips(this._players[i].returnGrid(), coords, orientation, u));
    
                            //Prompt saying it fits choose another ship to place
                            this.display.shipFitMessage(true);
    
                        } else {
                            //prompt saying it does not fit, do it again
                            this.display.shipFitMessage(false);
    
                        }
                    }
                }
                //Ask if ship position is good
                this.display.drawPlayerGrid(this._players[i]);
    
                //Check if the player likes the positions
                this.display.shipPosCheckMessage();
    
                //Hold choice to re-start ship placement
                let again;
                again = this.input.inputLikePlacement();
    
                if (again == 'y' || again == 'Y') {
                    like = true;
                } else {
                    like = false;
                }
            }
        }
    };

    //Main menu
    mainMenu() {
        let startMenu=true; //Bool for menu loop
        while(startMenu) {
            //Output Menu
            this.display.menu();
            let choice = 4;
            //Menu options
            switch(this.input.inputMenu(choice)) {
                case 0:
                    this.display.quitMessage();
                    startMenu = false;
                    break;
                case 1:
                    this.display.startTwoPlayerMessage();
                    setUp();
                    break; 
                case 2:
                    //Output rules from view
                    this.display.rules();
                    break;
                case 3:
                    //Output Stats from view and stuff
                    //Has not been made yet, need stats from model
                    break;
                case 4:
                    //Output Leaderboard
                    //Has not been made yet, need binary file to input leader board
                    break; 
                default:
                    //display.endMessage();
                    startMenu = false;
                    break;
            }
        }
    };
}
