// Cell Coordinate Regex : Validates Coordinates , Used for Element Detection.
var cell_reg = /^[a-zA-Z]{1}[1-9]{1}[0]{0,1}$/; 

//Generic Tool, Converts Coordinate to Element Coordinate 'A2'
function GetElemCoord(coord) {
    let letterCord = String.fromCharCode(String("A").charCodeAt(0) + coord.y);
    return letterCord + coord.x;
}

//Generic Tool, Converts Element Coordinate to Coordinate {y:,x:}
function GetCoord(elemcoord) {
    let BaseAlphaCode = String("A").charCodeAt(0);
    let ycord = elemcoord.charCodeAt(0) - BaseAlphaCode;
    let xcord = parseInt(elemcoord.substr(1, 2));
    return { y: ycord, x: xcord };
}