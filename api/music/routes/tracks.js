
// Handlers

const getTrackInfoHandler = function(req, res){
    
};

const addTrackInfoHandler = function(req, res){
    
};

const updateTrackInfoHandler = function(req, res){
    
};

const deleteTrackInfoHandler = function(req, res){
    
};

const getTrackHandler = function(req, res){
    //Todo: enviar faixa
};

// Routes

const getTrackInfo = {
    config: {
        handler: getTrackInfoHandler
    }
};

const addTrackInfo = {
    config: {
        handler: addTrackInfoHandler
    }
};

const updateTrackInfo = {
    config: {
        handler: updateTrackInfoHandler
    }
};

const deleteTrackInfo = {
    config: {
        handler: deleteTrackInfoHandler
    }
};

const getTrack = {
    config: {
        handler: getTrackHandler
    }
};

module.exports = [ 
    getTrackInfo, 
    addTrackInfo, 
    updateTrackInfo, 
    deleteTrackInfo, 
    getTrack 
];