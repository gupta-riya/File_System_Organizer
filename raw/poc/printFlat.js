//file-system = node.js module
// all built in function can be google and u will found a number of modules ther

let fs = require("fs"); //built in module by node js
let path = require("path"); //this is also a node js module

function view(dirPath,mode)
{
    if(mode=="tree"){
        viewTree(dirPath,"");
    }else if(mode=="flat"){
        viewFlat(path);
        console.log("flat view implemented");
    }else{
        console.log("Wrong mode");
    }

}

function isFileChecker(dirPath)
{
    return fs.lstatSync(dirPath).isFile();      //function of node module fs
}

function readContent(dirPath)
{
   return fs.readdirSync(dirPath);  //another function of mfs module to read content
}

function viewFlat(dirPath,toPrint)
{
    let isFile = isFileChecker(dirPath);

    if(isFile==true)                    //if it is a file then we dont need to check for children and we can stop there
    {
        console.log(toPrint + "*");
    }
    else                               // if it is a folder we can check it for children
    {
        //directory
        //console.log(
        //print path
        console.log(toPrint);
        //get children
        let childrens = readContent(dirPath);
        //call for view flat
        for(let i = 0  ; i < childrens.length ; i++)
        {
            let childPath = path.join(dirPath,childrens[i]);
            viewFlat(childPath,toPrint + "\\" + childrens[i]);
        }
      //  console.log("children: ", childrens);
    }
}


function viewTree(dirPath,indent)
{
    let isFile = isFileChecker(dirPath);

    if(isFile==true)                    //if it is a file then we dont need to check for children and we can stop there
    {
        console.log(indent + path.basename(dirPath) + "*");
    }
    else                               // if it is a folder we can check it for children
    {
        //directory
        //console.log(
        //print path
        console.log(indent,path.basename(dirPath));
        //get children
        let childrens = readContent(dirPath);
        //call for view flat
        for(let i = 0  ; i < childrens.length ; i++)
        {
            let childPath = path.join(dirPath,childrens[i]);
            viewTree(childPath,indent+"\t");
        }
      //  console.log("children: ", childrens);
    }
}
module.exports = {
    viewfn : view
}

//viewFlat("d10");