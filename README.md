# In-Memory-Cache-Assignment

## Steps to Invoke Cache
Step 1: clone the repository
      * From a terminal window, change to the directory where you'd like to clone the repo.
      * use the following command to clone the repo.

        ` git clone https://github.com/Capril1042/In-Memory-Cache-Assignment.git `

Step 2: run the program
      * change into the directory where the cloned repo is located.
      * run the program using the following command.

        ` node Cache.js`

Step 3: begin typing commands
      * the tables below detail the commands you can use and what they do.

| Command | Example | Purpose | 
|---------|---------|---------|
| SET _key_ _value_ | `SET foo bar` | Set the variable _key_ to _value_. |
| GET _key_ | `GET foo` | Print the value associated to _key_. |
| UNSET _key_ | `UNSET foo` | Remove _key_ (and its associated value) from the cache. |
| NUMEQUALTO _value_ | `NUMEQUALTO bar` | Print the number of variables that are currently set to _value_. |
| END | `END` | Exit the program. |
| BEGIN | `BEGIN` | Open a new transaction block. |
| ROLLBACK | `ROLLBACK` | Undo all of the data commands issued within the most recent transaction block and close that block. |
| COMMIT | `COMMIT` |Close _all_ open transaction blocks, permanently applying all data commands made within them. | 
