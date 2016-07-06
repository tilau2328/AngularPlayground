
// Handlers

const getBandInfoHandler = function(req, res){
    
};

const addBandInfoHandler = function(req, res){
    
};

const updateBandInfoHandler = function(req, res){
    
};

const deleteBandInfoHandler = function(req, res){
    
};

const getBandHandler = function(req, res){
    //TODO: enviar discografia zipada
};

// Routes

const getBandInfo = {
    config: {
        handler: getBandInfoHandler
    }
};

const addBandInfo = {
    config: {
        handler: addBandInfoHandler
    }
};

const updateBandInfo = {
    config: {
        handler: updateBandInfoHandler
    }
};

const deleteBandInfo = {
    config: {
        handler: deleteBandInfoHandler
    }
};

const getBand = {
    config: {
        handler: getBandHandler
    }
};

module.exports = [ 
    getBandInfo, 
    addBandInfo, 
    updateBandInfo, 
    deleteBandInfo, 
    getBand 
];