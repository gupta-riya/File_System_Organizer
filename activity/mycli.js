//commmands->
    //view --tree , --flat
        //organize-> same folder/multiple folder
        //help
    //[node ,mycli.js, view ,dir_name,mode]
    //node mycli.js organize -/foldername
    //node mycli.js help


// to create commands or list them can be done in two ways - either write functions for eah command and there place the console.log commands for the same 
//or you can the architecture use in almost all the real command lines

//this is the common architecture 
//importing from created files
let viewfnObj = require("./commands/view");                          //these viewFn, organizeFn, helpFn names should not be changed as these are the name in the library also
let organizefnObj= require("./commands/organize");
let helpfnObj = require("./commands/help");

let input = process.argv.slice(2);
let cmd = input[0];                     //after slicing what is the first command

switch(cmd)
{
    case 'view' : 
                   viewfnObj.viewFn(input[1],input[2]);
                    break;
    
    case 'organize':
                    organizefnObj.OrganizeFn(input[1]);
                    break;

    case 'help' : 
                    helpfnObj.helpFn();
                    break;
    default :        
                    console.log("Wrong command enter help to see all the commands");
                    break;
        
}