var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let memoryMap = new Map();
let transactionMapArray = [];
let numberOfOpenTransactions = 0;
let commited = false;
let helperNumber = 0;
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
           if (numberOfOpenTransactions > 0 ) {
               transactionMapArray[numberOfOpenTransactions-1].set(commandArgument2,commandArgument3);
                helperNumber++;
           } 
           else {
               memoryMap.set(commandArgument2,commandArgument3);
           }
           console.log(transactionMapArray);
           console.log(transactionMapArray[numberOfOpenTransactions-1]);
            console.log("\n");
            break;
        case "GET":
            console.log(memoryMap);
            console.log(transactionMapArray);
            console.log(commited);
            console.log(numberOfOpenTransactions)
            let newMemoryMap = transactionMapArray[numberOfOpenTransactions-1];
            let value = (numberOfOpenTransactions > 0 && commited === false && helperNumber > 0) ? newMemoryMap.get(commandArgument2) : memoryMap.get(commandArgument2);
            let result = value ? value : "NULL";
            console.log(`${result}\n`);
            break;
        case "UNSET":
            if (numberOfOpenTransactions > 0 && commited === false ) {
                transactionMapArray[numberOfOpenTransactions-1].delete(commandArgument2);
            }
            else {
                memoryMap.delete(commandArgument2);
            } 
             console.log(memoryMap);
            console.log(transactionMapArray);
            console.log(commited);
            console.log(numberOfOpenTransactions);
            console.log(helperNumber);
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
            transactionMapArray.pop();
            numberOfOpenTransactions--;
            if (numberOfOpenTransactions === 0) {
                openTransaction = false;
                console.log("NO TRANSACTION");
            }
            console.log(`DEBUG ${transactionMapArray[numberOfOpenTransactions-1]}`)
            console.log("\n");
            break;
        case "COMMIT":
            if ( numberOfOpenTransactions > 0) {
                let transactionMap =transactionMapArray[numberOfOpenTransactions-1];
               for (let [key, value] of transactionMap.entries()) {
                 memoryMap.set(key,value);  
               } 
               console.log(memoryMap);
               transactionMapArray.pop();
               numberOfOpenTransactions--;
               commited = true;
               console.log("\n")
            }
            else {
                return  console.log("NO TRANSACTION");
            }
            break;

    }
});