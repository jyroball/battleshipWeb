/*
Project : BattleShip
Class : 17B
Team : 2
Version : V8 Converted WEB V1
Date : Nov 23 2020
*/
class Input {
    //private:
    _size;
    _nameSize;
    _input;
    _name;
    
    //public:
    
    inputDisplay = new View();
    
    //Constructor
    constructor() {
        //Allocate memory for coordinate input
        this._size = 4;
        this._input = '';
        //Allocate memory for name
        this._nameSize = 10;
        this._name = ''; // just make string.
    };

    //String.fromCharCode(('A'.charAt(0) + row))
    //no true deconstructor in javascript
    inputCoordinates(choices) {
        let menuInput = [];
        
        //input choice
        cin(menuInput);
        
        menuInput = parseInt(menuInput[0]);//dirty

        //validates number of inputs
        while(menuInput < 0 || menuInput > choices) {
            
            //display.userInputError();
            this.inputDisplay.userInputError();
            
            menuInput = [];//dirty
            cin(menuInput);
            menuInput = parseInt(menuInput[0]);//dirty
        }
        
        let userInput = parseInt(menuInput);
        return userInput;
    };

    //changed to int to chose up, down, left, right
    inputUserSetUp() {
        //Initialize stuff
        let orientation = [];//dirty
        
        //Ask for the direction of the rotation
        //display.directionPrompt();
        cin(orientation);
        
        orientation = orientation[0].toUpperCase();//dirty
        
        //Change if not one of the options
        while(orientation != 'U' && orientation != 'D' && orientation != 'L' && orientation != 'R') {
            this.inputDisplay.userInputError();
            orientation = [];//dirty
            cin(orientation);
            orientation = orientation[0].toUpperCase();//dirty
        }
        //Return sideways as true if Yes, and false if No for ship orientation
        switch(orientation) {
            case 'U': return 1; break;
            case 'R': return 2; break;
            case 'D': return 3; break;
            case 'L': return 4; break;
            default: return 1; break;
        }
    };

    //Input name into char array
    inputPlayerData() {
        //Input the name of player
        let name = [];
        cin.getline(name);
        //Return name
        return name.join('').substring(0,this._nameSize);
    };

    inputMenu(choices) {
        let menuInput = [];//dirty
        
        //input choice
        cin(menuInput);

        menuInput = parseInt(menuInput[0]);//dirty
        
        //validates number of inputs
        while(menuInput < 0 || menuInput > choices) {
            
            //display.userInputError();
            this.inputDisplay.userInputError();
            
            menuInput = [];//dirty
            cin(menuInput);
            menuInput = parseInt(menuInput[0]);//dirty
        }
        
        let userInput = parseInt(menuInput);
        return userInput;
    };

    inputLikePlacement() {
        let again = [];
        cin(again);
        return again[0];
    };
}
