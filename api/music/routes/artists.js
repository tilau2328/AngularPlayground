
// Handlers

const getArtistInfoHandler = function(req, res){
        
};

const addArtistInfoHandler = function(req, res){
        
};

const updateArtistInfoHandler = function(req, res){
    
};

const deleteArtistInfoHandler = function(req, res){
    
};

// Routes

const getArtistInfo = {
    config: {
        handler: getArtistInfoHandler
    }
};

const addArtistInfo = {
    config: {
        handler: addArtistInfoHandler
    }
};


const updateArtistInfo = {
    config: {
        handler: updateArtistInfoHandler
    }
};

const deleteArtistInfo = {
    config: {
        handler: deleteArtistInfoHandler
    }
};

module.exports = [ 
    getArtistInfo, 
    addArtistInfo, 
    updateArtistInfo, 
    deleteArtistInfo 
];