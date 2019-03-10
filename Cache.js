var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let memoryMap = new Map();

rl.on('line', function (line) {
    let commandInput = line.split(" ");
    let commandArgument1 = commandInput[0];
    let commandArgument2 = commandInput[1];
    let commandArgument3 = commandInput[2];

    // insert condition that will check if input is valid
    // it would be nice to also include a guide to valid commands

    switch(commandArgument1) {
        case "SET":
            memoryMap.set(commandArgument2,commandArgument3);
            console.log("\n");
            break;
        case "GET":
            let value =  memoryMap.get(commandArgument2);
            let result = value ? value : "NULL";
            console.log(`${result}\n`);
            break;
        case "UNSET":
            memoryMap.delete(commandArgument2);
            console.log("\n");
            break;
        case "NUMEQUALTO":
            console.log(" FIX ME");
            break;
        case "END":
            process.exit();
            break; // is this break really needed if we are exiting the program?
        case "BEGIN":
            console.log(" FIX ME");
            break;
        case "ROLLBACK":
            console.log(" FIX ME");
            break;
        case "COMMIT":
            console.log(" FIX ME");
            break;

    }
});