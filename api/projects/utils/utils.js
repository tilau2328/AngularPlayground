
const slugify = function(title){
    var slug = title.toString().toLowerCase().trim()
                .replace(/&/g, '-and-') 
                .replace(/[\s\W-]+/g, '-');
    return slug;
};

module.exports = { 
    slugify: slugify
};