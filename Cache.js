var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

/* This function counts number of repeating values in a map */
function countRepetingValues( map, arg) {
    let count = 0;
    for ( let value of map.values()) {
            if (value === arg) {
                count++;
            }
        }
    return count;
}

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

    switch(commandArgument1) {
        case "SET":
            if (numberOfOpenTransactions > 0 ) {
                transactionMapArray[numberOfOpenTransactions-1].set(commandArgument2,commandArgument3);
                helperNumber++;
            } 
            else {
                memoryMap.set(commandArgument2,commandArgument3);
            }
                console.log("\n");
            break;
        case "GET":
            let newMemoryMap = transactionMapArray[numberOfOpenTransactions-1];
            let value = (numberOfOpenTransactions > 0 && commited === false && helperNumber > 0) ? newMemoryMap.get(commandArgument2) : memoryMap.get(commandArgument2);
            let result = value ? value : "NULL";
            console.log(`${result}\n`);
            break;
        case "UNSET":
            if (numberOfOpenTransactions > 0 && commited === false ) {
                transactionMapArray[numberOfOpenTransactions-1].delete(commandArgument2);
                helperNumber++;
            }
            else {
                memoryMap.delete(commandArgument2);
            } 
            console.log("\n");
            break;
        case "NUMEQUALTO":
            let mapToCount = (numberOfOpenTransactions > 0 && commited === false && helperNumber > 0) ? transactionMapArray[numberOfOpenTransactions-1] : memoryMap;
            let count = countRepetingValues(mapToCount, commandArgument2);
            console.log(`${count}\n`);
            break;
        case "END":
            process.exit();
        case "BEGIN":
            transactionMapArray.push( new Map() );
            numberOfOpenTransactions++;
            console.log("\n");
            break;
        case "ROLLBACK": 
            transactionMapArray.pop();
            numberOfOpenTransactions--;
            helperNumber--;
            let transaction = transactionMapArray.length === 0 && commited === true ? "NO TRANSACTION\n" : "\n";
            console.log(transaction);
            break;
        case "COMMIT":
            if ( numberOfOpenTransactions > 0) {
                let transactionMap =transactionMapArray[numberOfOpenTransactions-1];
               for (let [key, value] of transactionMap.entries()) {
                 memoryMap.set(key,value);  
               } 
               transactionMapArray.pop();
               numberOfOpenTransactions--;
               commited = true;
               console.log("\n")
            }
            else {
                return  console.log("NO TRANSACTION\n");
            }
            break;
        default:
            console.log("*** PLEASE ENTER A VALID COMMAND ***");
            break;

    }
});