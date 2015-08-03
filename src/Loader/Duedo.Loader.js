/*
==========================================
Duedo.Loader
Author: http://www.edoardocasella.it

Notes:
Resources preloader

Loader bindable events
- progress
- error
- complete
- startloading

==========================================
*/


Duedo._LoadingInstance = function () {
    
    this._Resources = {
        Path: null,
        Name: null,
        Complete: null
    };
    
    this.Percentage = 0;

    /*@private*/
    this._Total = 0;
    this._Loaded = 0;
    this._OnComplete;
    this._OnProgress;
    this._OnStart;
};


Duedo._LoadingInstance.prototype = Object.create(Duedo.Object.prototype);
Duedo._LoadingInstance.prototype.constructor = Duedo._LoadingInstance;




Duedo.Loader = function ( GameContext, Cache ) {
    Duedo.Object.call(this);
    this.GameContext = GameContext || Duedo.Global.Games[0];
    
    /*Game cache reference*/
    this._Cache = Cache || undefined;

    /*Stores resources to be loaded*/
    this.Resources = new Array();
    
    /*Loaded percentage*/
    this.Percentage = 0;

    /*Resources amount*/
    this.Total = 0;
    
    /*Have been loaded?*/
    this.Loaded = 0;
    
    this.HasLoaded = false;

    this.Loading = false;

    this.AudioContext;
    this._UsingWebAudio = false;

    /*Loadable extensions*/
    this.AudioMimeTypes;
    this.ImageMimeTypes;
    this.TextMimeTypes;

    /*Store errors*/
    this.Errors = [];

    /*Timing properties*/
    this.StartTime = null;
    this.EndTime = null;
    this.TimeRequired = null;

    this.Queued = [];


    this._setup();
};




/*Inherit object*/
Duedo.Loader.prototype = Object.create(Duedo.Object.prototype);
Duedo.Loader.prototype.constructor = Duedo.Loader;


/*
 * Setup
 * @private
 */
Duedo.Loader.prototype._setup = function () {

    var WebAudioAPI = Duedo.Utils.Can.WebAudio();

    if(WebAudioAPI)
    {
        this.AudioContext = new window[WebAudioAPI]();
        this._UsingWebAudio = true;
    }

    /*Loadable extensions*/
    this.AudioMimeTypes = ["mp3", "ogg", "wav", "mp4", "webm"];
    this.ImageMimeTypes = ["png", "jpg", "bmp"];
    this.TextMimeTypes  = ["txt", "json"];

   
};








/*
 * AddResource
 * @public
 */
Duedo.Loader.prototype.AddResource = function ( _path, /*callback*/ _complete) {

    if (Duedo.Utils.IsNull(_path)) return;

    //Multiple files
    if( _path.indexOf("|") != -1 )
    {
        var resPaths = _path.split("|");

        for( var i in resPaths )
        {
            this.AddResource(resPaths[i], _complete);
        }

        return;
    }



    var name = _path.substring(_path.lastIndexOf("/") + 1, _path.lastIndexOf("."));


    if( this.Queued.indexOf(name) !== -1 )
    {
        return;
    }


    //Check browser compatibility
    var ext = _path.split('.').pop();

    if( this.AudioMimeTypes.indexOf(ext) !== -1 )
    {
        var MIME = Duedo.Utils.GetMimeType(ext);

        if( !Duedo.Utils.Can.PlayType(MIME) ) 
        {
            console.warn("Duedo.AddResource: this browser currently does not support " + ext + " codec for the audio resource -> " + _path);
            return;
        }
    }



    this.Resources.push({
        path: _path || undefined,
        name: name,
        complete: _complete || undefined
    });
    

    this.Queued.push(name);



    this.Total++;
    
};










/*
 * Add resources
 * @public
 */
Duedo.Loader.prototype.AddResources = function ( array ) {
    
    if (!(array instanceof Array))
    {
        return this;
    }
        

    for (var i in array)
    {
        this.AddResource(array[i].path, array[i].complete);
    }


    return this;
};









/*
 * Start loading
 * @public
 */
Duedo.Loader.prototype.StartLoading = function () {

    

    /*If nothing to load*/
    if(!this.Resources.length)
        return this._LoadingCompleted();

    
    var ext, src;

    this.HasLoaded = false;

    for ( var i in this.Resources )
    {
        src = this.Resources[i];

        if(typeof src.path === "undefined") {
            continue;
        }
        
        ext = src.path.split('.').pop();
        
        this._LoadResource(src.path, src.name, src.complete, ext);      
    }   


    this.Loading = true;

    this.StartTime = this.GameContext.ElapsedTime;


    this._CallTriggers("startloading");

    return this;
};












/*
 * Start loading
 * @private
 */
Duedo.Loader.prototype._LoadResource = function ( source, name, onLoad, ftype ) {

    var scope = this;

    switch (ftype) 
    {


        case "mp3":
        case "wav":
        case "ogg":
        case "mp4":
        case "webm":

            if (this._UsingWebAudio === true)
            {
                var xhr = new XMLHttpRequest();

                xhr.open('GET', source, true);
                xhr.send();
                xhr.responseType = "arraybuffer";

                /*Audio resource has been loaded*/
                xhr.onload = function (e) {

                    scope.AudioContext.decodeAudioData(
                        xhr.response,
                        function OnDecodeSuccess(buffer) {

                            if (!buffer) {
                                alert('Duedo.Loader._LoadAudioResourceXML: Error decoding file data: ' + source + " - restart");
                                return;
                            }

                            scope._ResourceLoaded(buffer, name, ftype, onLoad);

                        }
                    );

                }

                /*On error listener*/
                xhr.onerror = function (e) {
                    scope.Errors.push(source);
                    scope._CallTriggers("error");
                }
            }
            else
            {
                /*AudioTag*/
                var sound;

                sound = new Audio();

                sound.addEventListener('canplaythrough', function () {
                    scope._ResourceLoaded(this, name, ftype, onLoad);
                });

                sound.addEventListener('error', function () {
                    scope.Errors.push(source);
                    scope._CallTriggers("error");
                });


                sound.src = source;
            }
            break;



        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
        case "bmp":
            var image;

            image = new Image();

            image.onload = function () {
                scope._ResourceLoaded(this, name, ftype, onLoad);
            };

            image.onerror = function () {
                scope.Errors.push(source);
                scope._CallTriggers("error");
            };

            image.crossOrigin = this.crossOrigin;

            image.src = source;
            break;



        case "txt":
            var xhr = new XMLHttpRequest();
            xhr.open('GET', source, true);
            xhr.send();
            xhr.responseType = "text";

            /*Txt resource has been loaded*/
            xhr.onreadystatechange = function ()
            {
                if(xhr.readyState === 4)
                {
                    if(xhr.status === 200 || xhr.status == 0)
                    {
                        scope._ResourceLoaded(xhr.responseText, name, ftype, onLoad);
                    }
                }
            }

            /*On error listener*/
            xhr.onerror = function (e) {
                scope.Errors.push(source);
                scope._CallTriggers("error");
            }

            break;


        case "json":
            var xhr = new XMLHttpRequest();
            /*
                IIS WebConfig remainder
                  <system.webServer>
                    <staticContent>
                      <mimeMap fileExtension=".json" mimeType="application/json" />
                    </staticContent>
                  </system.webServer>
            */
            xhr.open('GET', source, true);
            xhr.responseType = "text";
            xhr.onload = function () {
                scope._ResourceLoaded(this.responseText, name, ftype, onLoad);
            }
            xhr.send();
            break;
    }


};







/*
 * ResourceLoaded
 * @private
 */
Duedo.Loader.prototype._ResourceLoaded = function (source, name, type, onLoad) {

    switch (type) {

        case "mp3":
        case "wav":
        case "ogg":
        case "mp4":
        case "webm":
            this._Cache.AddSound(source, this._GetNameAsProperty(name));
            break;

        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
        case "bmp":
            this._Cache.AddImage(source, this._GetNameAsProperty(name));
            break;

        case "txt":
            this._Cache.AddTxt(source, this._GetNameAsProperty(name)); 
            break;

        case "json":
            this._Cache.AddJSON(source, this._GetNameAsProperty(name));
        break;

        default:
            return null;
    }

    
    this.Loaded++;

    if (!Duedo.Utils.IsNull(onLoad)) {
        onLoad(source);
    }


    this.Percentage = (this.Loaded * 100) / this.Total;


    this._CallTriggers("progress");

    if (this.Percentage === 100) 
    {
        return this._LoadingCompleted();
    }



    return;
};







/*
 * LoadingCompleted
 * @private
 */
Duedo.Loader.prototype._LoadingCompleted = function () {
    
    this.Loading = false;
    this.HasLoaded = true;
    this.Queued = [];
    this.Resources = [];

    /*Loading time*/
    this.EndTime = this.GameContext.ElapsedTime;
    this.TimeRequired = (this.EndTime - this.StartTime);


    this._CallTriggers("complete");

};





/*
 * StopLoading
 * @public
 */
Duedo.Loader.prototype.StopLoading = function() {

};





/*
 * GetNameAsProperty
 * @private
 */
Duedo.Loader.prototype._GetNameAsProperty = function (_name) {
    //ADD: se la prima lettera è un numero elimina
    return _name.replace(/\s+/g, " ").replace(/-/g, '_');
};