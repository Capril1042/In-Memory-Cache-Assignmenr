var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let memoryMap = new Map();
let transactionMapArray = [];
let numberOfOpenTransactions = 0;
rl.on('line', function (line) {
    let commandInput = line.split(" ");
    let commandArgument1 = commandInput[0];
    let commandArgument2 = commandInput[1];
    let commandArgument3 = commandInput[2];

    let openTransaction;
    // insert condition that will check if input is valid
    // it would be nice to also include a guide to valid commands

    switch(commandArgument1) {
        case "SET":
        console.log(numberOfOpenTransactions);
           if (numberOfOpenTransactions > 0) {
               transactionMapArray[numberOfOpenTransactions-1].set(commandArgument2,commandArgument3);
           } 
           else {
               memoryMap.set(commandArgument2,commandArgument3);
           }
           console.log(transactionMapArray);
           console.log(transactionMapArray[numberOfOpenTransactions-1]);
            console.log("\n");
            break;
        case "GET":
            let newMemoryMap = transactionMapArray[numberOfOpenTransactions-1];
            let value = numberOfOpenTransactions > 0 ? newMemoryMap.get(commandArgument2) : memoryMap.get(commandArgument2);
            let result = value ? value : "NULL";
            console.log(`${result}\n`);
            break;
        case "UNSET":
            openTransaction ?
            transactionMapArray[numberOfOpenTransactions-1].delete(commandArgument2)
            : memoryMap.delete(commandArgument2);
            console.log("\n");
            break;
        case "NUMEQUALTO":
            let count = 0;
            for ( let value of memoryMap.values()) {
                if (value === commandArgument2) {
                    count++;
                }
            }
            console.log(`${count}\n`);
            break;
        case "END":
            process.exit();
            break; // is this break really needed if we are exiting the program?
        case "BEGIN":
            transactionMapArray.push( new Map() );
            openTransaction = true;
            numberOfOpenTransactions++;
            console.log(`DEBUG ${transactionMapArray}`);
            console.log(transactionMapArray, numberOfOpenTransactions)
            console.log("\n");
            break;
        case "ROLLBACK":
            console.log(transactionMapArray);
            let rollbackCounter = numberOfOpenTransactions -1;
            while (rollbackCounter > 0) {
                transactionMapArray.pop();
                rollbackCounter--;
            }
            numberOfOpenTransactions--;
            if (numberOfOpenTransactions === 0) {
                openTransaction = false;
                console.log("NO TRANSACTION");
            }
            console.log(`DEBUG ${transactionMapArray[numberOfOpenTransactions-1]}`)
            console.log("\n");
            break;
        case "COMMIT":
            console.log(" FIX ME");
            break;

    }
});