
//definig types of files or folders
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
//create dir function
function dirCreator(dirPath)
{
    if(fs.existsSync(dirPath)==false)
    {
        fs.mkdirSync(dirPath);
    }
}
//require modules
let fs = require("fs");
let path = require("path");

//traverse
//identify -> dest directory
//copy

function isFileChecker(dirPath)
{
    return fs.lstatSync(dirPath).isFile();
}

function readContent(dirPath)
{
    return fs.readdirSync(dirPath);
}

function getExtension(dirpath)
{
    return dirpath.split(".").pop();
}

function GetDirectoryName(dirpath)
{
    let extension = getExtension(dirpath);
    //or  path.extname(dirpath).substring(1) as it comes with '.'

    for(let type in types){
      
        for(let i = 0  ;i < types[type].length ; i++){
            if(types[type][i]==extension){
                return type;
            }
        }
    }

    return "others";
}

function OrganizeDir(dirpath,orgFilePath)
{
     let isFile = isFileChecker(dirpath);

     if(isFile==true)
     {
         //get the name from the path 
         let folderName = GetDirectoryName(dirpath);
         let dest_folder = path.join(orgFilePath,folderName);
         let file_name = path.basename(dirpath);
         let dest = path.join(dest_folder,file_name);
         fs.copyFileSync(dirpath,dest);
        
     }else
     {
         let childrens = readContent(dirpath);
         for(let i = 0 ; i < childrens.length ; i++){
            let childPath = path.join(dirpath,childrens[i]);
            OrganizeDir(childPath,orgFilePath);
         }
     }
}

function OrganizeFn(dirpath)
{
    //making directory at the specified path
let orgFilePath = path.join(dirpath,"organized_files");
dirCreator(orgFilePath);

// making folders with name of media, archives, documents,app
for(let key in types){
    let innerdirPath = path.join(orgFilePath,key);
    dirCreator(innerdirPath);
}
    //others (other than defined types)
let otherPath = path.join(orgFilePath,"others");
dirCreator(otherPath);
OrganizeDir(dirpath,orgFilePath);

}


module.exports = {

OrganizeFn : OrganizeFn
}

/*
    if to take input - node organize.js "folder_path_where_dir_needs_to_be_created"
    always put path in double quotes
*/



