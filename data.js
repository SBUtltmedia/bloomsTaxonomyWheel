


function getBloomData(){

 var bloomPromise = jQuery.Deferred();

    
    
    
$.get( "http://apps.tlt.stonybrook.edu/gproxy/?id=1paDFGUTPZeBcbdWtxD5x8IIQGG8TJqMiI8uNpytUCgU", function( data ) {
var bloomData= $.csv.toObjects(data);
bloomPromise.resolve( bloomData)
 
});

return bloomPromise.promise()
}

