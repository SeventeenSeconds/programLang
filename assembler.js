// MOVW R4, 0 
// 1110 0011 0000 0000 0100 0000 0000 0000 
// e3 00 40 00
// 00 40 00 e3

// instructions
// movw, movt, add, ldr, or, str, sub, b, 

let fs = require('fs');
let instructions = [];
// create file to write 

// read file
fs.readFile('./machine-instructions.txt', function (err, data) {
    instructions = data.toString("utf-8").split('\n');
    instructions.forEach(instruction => {
        let binaryInstruction = parseInstruction(instruction);
        if (binaryInstruction) {
            writeBytes(binaryInstruction.split(" "));
        }
    });
});

// parse instructions

function parseInstruction(instruction) {
    let inst = instruction.split(" ");
    method = inst[0].toUpperCase();
    if (method == "MOVW" || method == "MOVT") {
        return writeMov(inst);
    } else if (method == "ADD" || method == "SUB") {
        // return null;
        return writeOp(inst);
    } else if (method == "LDR" || method == "STR") {
        return null;
        writeLS(inst);
    } else if (method == "B") {
        return null;
        writeBranch(inst);
    }
}

function writeBytes(instruction) {
    // console.log(instruction);
    let binArr = [];
    let byte;
    // reverse the binary and convert the binary, not the hex

    for (let i = 0; i < instruction.length; i += 2) {
        binArr.push(instruction[i] + instruction[i + 1]);
    }
    binArr = binArr.reverse();
    let parsedBinary = [];

    for (let i = 0; i < binArr.length; i++) {
        byte = parseInt(binArr[i], 2);
        parsedBinary.push(byte);
    }
    fs.appendFileSync('kernel7.img', Buffer.from(parsedBinary));
}

function writeMov(instruction) {
    let binary = "1110 0011 ";
    if (instruction[0] == "MOVW") {
        binary += "0000 ";
    } else {
        binary += "0100 ";
    }
    let hexIV = removeHeX(instruction[2]);
    let binIV = hexToBin(hexIV);
    // write first 4 bytes of immediate value
    binary += binIV.substring(0, 4) + " ";

    // then destination register
    // 4 bytes
    binary += returnRegisterIVBin(instruction[1]) + " ";

    // then 12 bytes of the rest of immediate value 
    binary += binIV.substring(4, 8) + " ";
    binary += binIV.substring(8, 12) + " ";
    binary += binIV.substring(12, 16);
    return binary;
}

function writeOp(instruction) {
    let binary = "1110 00";
    let iBit = false;
    let sBit = false;
    if (instruction.length == 5) {
        iBit = true;
        sBit = true;
    } else if (instruction.length == 4) {
        if (instruction[4] == "S") {
            sBit = true;
        } else {
            iBit = true;
        }
    }
    // IBIT
    binary += (iBit ? "1" : "0");
    if (instruction[0] == "SUB") {
        binary += "0 010";
    } else if (instruction[0] == "ADD") {
        binary += "0 100";
    }
    // SBIT
    binary += (sBit ? "1" : "0") + " ";
    binary += returnRegisterIVBin(instruction[2]) + " ";
    binary += returnRegisterIVBin(instruction[1]) + " ";

    let binIV = hexToBin(instruction[3]);
    binary += binIV.substring(4, 8) + " ";
    binary += binIV.substring(8, 12) + " ";
    binary += binIV.substring(12, 16);
}

function writeLS(instruction) {

}

function writeBranch(instruction) {

}

(255).toString(); // "255" (default is radix 10)
(255).toString(2); // "11111111" (radix 2, i.e. binary)
(255).toString(16); // "ff" (radix 16, i.e. hexadecimal)

function removeHeX(hex) {
    let h = hex.split("x");
    return h[1].substring(0, h[1].length - 1);
}

function hexToBin(hex) {
    let bin = parseInt(hex, 16).toString(2);
    bin = padBinaryZeros(bin, 16);
    return bin;
}

function binaryToHex(binary) {
    return parseInt(binary, 2).toString(16);
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function returnRegisterIVBin(register) {
    let reg = register.replace("R", "");
    return padBinaryZeros(parseInt(reg).toString(2), 4);
}

function padBinaryZeros(bin, limit) {
    let zeros = "";
    for (let i = 0; i < (limit - bin.length); i++) {
        zeros += "0";
    }
    return zeros + bin;
}

//TODO: method to reverse binary instructions

// split them into the peices of the grammar - movw would be 1 chunk of this instruction - the opperator bit? whatever it's called
// write bytes to file for each parsed instruction


