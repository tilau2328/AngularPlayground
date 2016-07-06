const slugifyName = function( name ){
    var slug = name.toString().toLowerCase().trim()
                   .replace(/&/g, '-and-') 
                   .replace(/[\s\W-]+/g, '-');
    return slug;
};

module.exports = {
    slugify: slugifyName
};