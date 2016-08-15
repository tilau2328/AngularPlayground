const Path = require("path");
const Fs = require("fs");
const MusicBackup = JSON.parse(Fs.readFileSync('./music-backup.json'));

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//TODO: criar metodos asincronos
const createDir = function(path){
    if(!Fs.existsSync(path)){ Fs.mkdirSync(path); }
    //else { console.log("Directory: " + path + " already exists"); }
};

const createFile = function(path, file, override){
    if(override || !Fs.existsSync(path)){ 
        Fs.writeFile( path, file, function(err) {
            if(err) { console.log(err); }
        }); 
    } //else { console.log("File: " + path + " already exists"); }
};

const getId = function(type){
    switch(i)
    {
        case "bands":
        case "artists":
            return "name";
        case "albums":
        case "tracks":
            return "title";
        default:
            return "";
    }
};

const BasePath = Path.join(__dirname, 'files', 'Audio', 'Music');
createDir(BasePath);
var index = {};
for( var i in MusicBackup )
{
    var dirName = capitalizeFirstLetter(i);
    var currPath = Path.join(BasePath, dirName);
    var subIndex = {};
    subIndex[i] = [];
    createDir(currPath);
    
    var id = getId(i);

    for(var j = 0; j < MusicBackup[i].length; j++)
    {
        var item = MusicBackup[i][j];
        var itemName = i + "_" + j;
        var itemPath = Path.join(currPath, itemName);
        
        var indexItem = {};
        indexItem[id] = item[id];
        indexItem["index"] = j; 
        subIndex[i].push(indexItem);
        
        createDir(itemPath);
        createFile(Path.join(itemPath, "index.json"), JSON.stringify(item));
    }
    createFile(Path.join(currPath, "index.json"), JSON.stringify(subIndex));
    index[i] = subIndex[i];
}
