
// Handlers

const getAlbumInfoHandler = function(req, res){
    
};

const addAlbumInfoHandler = function(req, res){
    
};

const updateAlbumInfoHandler = function(req, res){
    
};

const deleteAlbumInfoHandler = function(req, res){
    
};

const getAlbumHandler = function(){
    //Todo: enviar album zippado
};

// Routes

const getAlbumInfo = {
    config: {
        handler: getAlbumInfoHandler
    }
};

const addAlbumInfo = {
    config: {
        handler: addAlbumInfoHandler
    }
};


const updateAlbumInfo = {
    config: {
        handler: updateAlbumInfoHandler
    }
};

const deleteAlbumInfo = {
    config: {
        handler: deleteAlbumInfoHandler
    }
};

const getAlbum = {
    config: {
        handler: getAlbumHandler
    }
};

module.exports = [ 
    getAlbumInfo, 
    addAlbumInfo, 
    updateAlbumInfo, 
    deleteAlbumInfo, 
    getAlbum 
];