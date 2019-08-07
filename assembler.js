// MOVW R4, 0 
// 1110 0011 0000 0000 0100 0000 0000 0000 
// e3 00 40 00
// 00 40 00 e3

// instructions
// movw, movt, add, ldr, or, str, sub, b, 

var fs = require('fs');
var instructions = [];

// read file
// get instructions out
fs.readFile('../Programming Languages/machine-instructions.txt', function (err, data) {
    instructions = data.toString("utf-8").split('\n');
    // instructions.forEach(instruction => {
    //     console.log(instruction); 
    // }); 
    instructions.forEach(instruction => {
        parseInstruction(instruction);
    });
});

// parse instructions

function parseInstruction(instruction) {
    var inst = instruction.split(" ");
    method = inst[0].toUpperCase();
    if (method == "MOVW" || method == "MOVT") {
        writeMov(inst);
    } else if (method == "ADD" || method == "SUB") {
        writeMath(inst);
    } else if (method == "LDR" || method == "STR") {
        writeLS(inst);
    } else if (method == "B") {
        writeBranch(inst);
    }


}

function writeMov(instruction) {
    var binary = "1110 0011 ";
    if (instruction[0] == "MOVW") {
        binary += "0000 ";
    } else {
        binary += "0100 ";
    }
    var hex = removeHeX(instruction[2]);
    var bin = hex2bin(hex);
    console.log(bin); 
    binary += bin.substring(0, 4);
    returnRegisterInBin(instruction[1]);

    // then destination register
    // 4 bytes

    // then 12 bytes of the rest of immediate value 
}

function removeHeX(hex) {
    let h = hex.split("x");
    return h[1].substring(0, h[1].length - 1);
}

function hex2bin(hex) {
    let bin = parseInt(hex, 16).toString(2); 
    bin = padBinaryZeros(bin, 16); 
    return bin;
}

function writeMath(instruction) {

}

function writeLS(instruction) {

}

function writeBranch(instruction) {

}

(255).toString(); // "255" (default is radix 10)
(255).toString(2); // "11111111" (radix 2, i.e. binary)
(255).toString(16); // "ff" (radix 16, i.e. hexadecimal)

function returnRegisterInBin(register) {
    let reg = register.replace("R", "");
    console.log(reg); 
    console.log(parseInt(reg).toString(2)); 
    // convert the number to binary 
    // console.log(dec2bin(reg)); 
    return true;
}

function padBinaryZeros(bin, limit) {
    let zeros = ""; 
    for (var i = 0; i < (limit - bin.length); i++) {
        zeros += "0";
    }
    return zeros + bin;
}


//TODO: method to reverse binary instructions

// split them into the peices of the grammar - movw would be 1 chunk of this instruction - the opperator bit? whatever it's called
// write bytes to file for each parsed instruction


