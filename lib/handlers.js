/*
 * Request Handlers
 *
 */

// Dependencies
var helpers = require('./helpers');



// Define all the handlers
var handlers = {};


// Ping
handlers.ping = function(data,callback){
    callback(200);
};

// Not-Found
handlers.notFound = function(data,callback){
    callback(404);
};

// Favicon
handlers.favicon = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Read in the favicon's data
      helpers.getStaticAsset('favicon.ico',function(err,data){
        if(!err && data){
          // Callback the data
          callback(200,data,'favicon');
        } else {
          callback(500);
        }
      });
    } else {
      callback(405);
    }
};


// Index
handlers.index = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Prepare data for interpolation
      var templateData = {
        'head.title' : 'NodeJS workshop',
        'head.description' : 'Learn building webapp using pure NodeJS. NO NPM REQUIRED !',
        'body.class' : 'index'
      };
      // Read in a template as a string
      helpers.getTemplate('index',templateData,function(err,str){
        if(!err && str){
          // Add the universal header and footer
          helpers.addUniversalTemplates(str,templateData,function(err,str){
            if(!err && str){
              // Return that page as HTML
              callback(200,str,'html');
            } else {
              callback(500,undefined,'html');
            }
          });
        } else {
          callback(500,undefined,'html');
        }
      });
    } else {
      callback(405,undefined,'html');
    }
};


// Public assets
handlers.public = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Get the filename being requested
      var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
      if(trimmedAssetName.length > 0){
        // Read in the asset's data
        helpers.getStaticAsset(trimmedAssetName,function(err,data){
          if(!err && data){
  
            // Determine the content type (default to plain text)
            var contentType = 'plain';
  
            if(trimmedAssetName.indexOf('.css') > -1){
              contentType = 'css';
            }
  
            if(trimmedAssetName.indexOf('.png') > -1){
              contentType = 'png';
            }
  
            if(trimmedAssetName.indexOf('.jpg') > -1){
              contentType = 'jpg';
            }
  
            if(trimmedAssetName.indexOf('.ico') > -1){
              contentType = 'favicon';
            }
  
            // Callback the data
            callback(200,data,contentType);
          } else {
            callback(404);
          }
        });
      } else {
        callback(404);
      }
  
    } else {
      callback(405);
    }
};
  
// Export the handlers
module.exports = handlers;