var Class = require("core").Class;
var RuleAbstract = require("./RuleAbstract.js").RuleAbstract;
var Event = require("core").Event.Event;
var ErrorEvent = require("core").Event.ErrorEvent;
var Request = require("core").Net.Request;
var BinaryData = require("core").Data.BinaryData;
var Response = require("core").Net.Response;


var TryCacheRule = function(){
    this.Extends = RuleAbstract;
    
    /**
     *
     */
    this.execute = function(request, response){
        var that = this;
      

        var keyHeaders = this.configuration.args.headerPrefix + request.getUrl();
        var keyBody = this.configuration.args.bodyPrefix + request.getUrl();
        

        console.log('     -- checking in cache: ' + keyHeaders);
        this.cache.get(keyHeaders, function(headersData){

           /**
            * jezeli w cachu nie ma naglowkow to odpuszczamy sobie
            */ 
           if(!headersData) {
               console.log('     -- object (headers) IS NOT in cache. continue...');
               that.dispatchEvent(new Event(RuleAbstract.Event.COMPLETE, null));
               return;
           }
           
           console.log('     -- object (headers) IS in cache.');
           
           // tworze tymczasowy obiekt response zeby wygodniej uzywac naglowkow
           var tmpResponse = new Response();
           tmpResponse.setHeaders(JSON.parse(headersData));
           
           

           /**
            * probujemy pobrac z cache'a body
            */
           console.log('     -- checking in cache: ' + keyBody);
           that.cache.get(keyBody, function(bodyData){

               if(!bodyData){
                    console.log('     -- object (body) IS NOT in cache. continue...');
                    that.dispatchEvent(new Event(RuleAbstract.Event.COMPLETE, null));
               } else {
                   console.log('     -- object (body) IS in cache. continue...');
                   // mam kontent ale mozeliwe ze trzeba bedzie skorzystac z IE
                   response.setStatusCode(200);
                   response.setHeaders(tmpResponse.getHeaders());
                   // TODO: ustalic identyczne flagi dla HTTP i BD
                   response._setBody(bodyData);                         
                   that.dispatchEvent(new Event(RuleAbstract.Event.BREAK, response));
               }
           });
        });
    };
        
    
    
    
    this._isModified = function(req, res) {
      
      var modifiedSince = req.getHeader('if-modified-since');
      var lastModified = res.getHeader('last-modified');

      // check If-Modified-Since
      if (modifiedSince && lastModified) {
        modifiedSince = new Date(modifiedSince);
        lastModified = new Date(lastModified);
        // Ignore invalid dates
        if (!isNaN(modifiedSince.getTime())) {
          if (lastModified <= modifiedSince) return false;
        }
      }

      return true;
    };
    
        


}
TryCacheRule = new Class( new TryCacheRule() );
exports.TryCacheRule = TryCacheRule;
