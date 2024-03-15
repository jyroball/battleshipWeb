    let stringbuffer = '';
    let arraybuffer = [];
    let outputelement = '';
    let inputelement = '';

    const endl = '<br>';

    // Function to input string data.
    function putData(value) {
        cout(value,endl);
        stringbuffer += value + "\n";
    }

    // Dont freeze the browser!
    function waitForInput() {
        putData(prompt("input"));
    }

    function inputPending() {
        return !(stringbuffer.length == 0 && arraybuffer.length == 0);
    }
    
    // Input cin , usage = cin(output1,output2, ... );
    function cin() {
        if (arguments.length != 0) {
            waitForInput();
            if (stringbuffer.length != 0) {
                arraybuffer = arraybuffer.concat(stringbuffer.split(/\s+\r?\n/));
                stringbuffer = '';
            }
            //copy and pass values through array
            let newarray = arraybuffer.shift().split('');
            for (let i = 0; i < newarray.length; i++){
                arguments[0].push(newarray[i]);
            }
            
            if (arguments.length != 1) {
                var params = Array.prototype.slice.call(arguments);
                params.shift();
                cin.apply(this, params);
            }
        } else if (arraybuffer.length != 0) {
            stringbuffer += arraybuffer.join("\n");
            arraybuffer = [];
        }
    }

    // Input getline , usage = getline(output1, output2, ... );
    function getline() {
        if (arguments.length != 0) {
            waitForInput();
            if (stringbuffer.length == 0) {
                arraybuffer = stringbuffer.split(/\r?\n/);
                stringbuffer = '';
            }
            arguments[0] = arraybuffer.shift().split('').slice();
            if (arguments.length != 1) {
                var params = Array.prototype.slice.call(arguments);
                params.shift();
                cin.apply(this, params);
            }
        }
        //Check to see if there are remaining lines. restore string buffer.
        else if (arraybuffer.length != 0) {
            stringbuffer += arraybuffer.join("\n");
            arraybuffer = [];
        }
    }

    // Sets output element.
    function setOutputElement(element) {
        outputelement = element;
    }

    // Output , usage = cout(input1, input2, ... );
    function cout() {
        //checks to see if element exists.
        if (outputelement) {
            //output arguments.
            for (obj of arguments) {
                document.getElementById(outputelement).innerHTML += obj;
            }
        }
    }
