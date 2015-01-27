/*
==========================================
Duedo.Utils
Author: http://www.edoardocasella.it

Notes:
- Generic utils: like rand, browser info, merging, colors, conversions etc...
- Text utils:    utilities to manage strings
- Can utils:     improve compatibility and other similar stuff
==========================================
*/

/*Utils - generic */
Duedo.Utils      = function () {};
/*Text - string utilities*/
Duedo.Utils.Text = function () {};
/*Can - support methods*/
Duedo.Utils.Can  = function () {};
/*Cookie*/
Duedo.Cookie = function () {};

/*
=====================================
POLYFILL
=====================================
*/
/* Polyfill trim*/
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g,'');
    }
}


/*Polyfill bind*/
if (!('bind' in Function.prototype)) {
    Function.prototype.bind = function () {
        var fn = this, context = arguments[0], args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
        }
    }
}


/*
 * Object.ExtendDeeply
 * Copy an object into another (adding subobjects)
*/
Object.ExtendDeeply = function (destination, source) {
    for (var property in source) {
        if (source[property] && source[property].constructor &&
         source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            arguments.callee(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};



/*IE Ver*/
Duedo.GetIEVersion = function() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;
    else
        return 0;
}



/*
 * Get browser info
 * Thanks to Joby Joseph for his research on the net
 * return array: array[0] = browsername, array[1] = browserversion
*/
Duedo.BrowserInfo = function() {

    var iever = Duedo.GetIEVersion();
    if (iever != 0)
        return ["IE", iever];

    var N = navigator.appName;
    var ua = navigator.userAgent;
    var tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null)
        M[2] = tem[1];

    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    return M;
};


/*
 * IsConsoleOpen
 * Check whether the console is currently open
*/
Duedo.IsConsoleOpen = function () {

    if (window.console && window.console['firebug']) {
        return true;
    }

    if (window.console) {
        console.profile();
        console.profileEnd();

        if (console.clear) {
            console.clear();
        }

        if (console['profiles']) {
            return console['profiles'].length > 0;
        }
    }

    return false;

};


/*
 * Delay
 * Simple delay. Stops the process for 'ms' time
*/
Duedo.Delay = function (ms) {
    var stTime = new Date().getTime();
    while (1)
        if ((new Date().getTime() - stTime) >= ms)
            break;
};


/*Funcs*/
Duedo.Random = function (max) { return Math.floor(Math.random() * (max - 0 + 1)) + 0; };
Duedo.IsFunc = function (func) { return typeof func === "function"; };
Duedo.ReloadPage = function (clearCache) { return window.location.reload(clearCache); };
Duedo.Goto = function (url, blank) { window.open(url, blank === true ? "_blank" : "_self"); };
Duedo.Null = function (data) { return typeof data === "undefined" || data === null; };
Duedo.RemoveSpaces = function (string) { return string.replace(/\s/g, ""); };
Duedo.Is32Bit = function (value) { /*ADD*/ };
Duedo.Is64Bit = function (value) { /*ADD*/ };





/*
 * Can.Duedo
 * Check if Duedo can be used on the current client
*/
Duedo.Utils.Can.Duedo = function() {
    return Duedo.Utils.Can.Canvas();
};



/*
 * Can.Canvas
 * Check canvas rendering support
 * return: bool
*/
Duedo.Utils.Can.Canvas = function() {

    var cv = document.createElement("canvas");

    if(!cv)
        return false;
    else
    {
        if(!cv.getContext)
            return false;
    }

    return true;
};





/*
 * Can.WebAudio
 * Check WebAudio API support
 * return: bool
*/
Duedo.Utils.Can.WebAudio = function() {

    var API_AUDIO = ["AudioContext", "webkitAudioContext"];

    for( var i in API_AUDIO )
    {
        if( !!window[API_AUDIO[i]] )
        {
            return API_AUDIO[i];
        }
    }


    return false;

};



/*
 * Can.BlendModes
 * Thanks to: PIXI.js
*/
Duedo.Utils.Can.BlendModes = function() {

    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    var context = canvas.getContext('2d');

    context.fillStyle = '#000';
    context.fillRect(0,0,1,1);
    context.globalCompositeOperation = 'multiply';
    context.fillStyle = '#fff';
    context.fillRect(0,0,1,1);

    return context.getImageData(0,0,1,1).data[0] === 0;

};




/*
 * Can.PlayType
 * Check if the browser can play a certain sound by his mime type
 * return: bool
*/
Duedo.Utils.Can.PlayType = function( MIME ) {

    var testElement = document.createElement(MIME.substring(0, 5));

    if (testElement.canPlayType)
    {
        var isPlayable = testElement.canPlayType(MIME);

        if ((isPlayable.toLowerCase() == 'maybe') || (isPlayable.toLowerCase() == 'probably'))
        {
            return true;
        }
        else
        {
            return false;
        }

    }
    else
    {
        return -1;
    }

};






/*
 * Endianness
 * Get host machine endianness
 * Thanks to TooTallNate https://gist.github.com/TooTallNate/4750953
*/
Duedo.Utils.Endianness = function() {
    
    var b = new ArrayBuffer(4);
    var a = new Uint32Array(b);
    var c = new Uint8Array(b);
    
    a[0] = 0xdeadbeef;
    
    if (c[0] == 0xef) 
        return 'LE';
    if (c[0] == 0xde) 
        return 'BE';
    
    throw new Error('unknown endianness');

};



/*
 * GetMimeType
 * @private
 */
Duedo.Utils.GetMimeType = function (ext) {

    if (Duedo.Utils.IsNull(ext))
    {
        throw "Duedo.Utils.GetMimeType: was not given an extension";
    }

    switch (ext)
    {
        case "mp4":
            return 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        case "ogg":
            return 'video/ogg; codecs="theora, vorbis"';
        case "webm":
            return 'video/webm; codecs="vp8, vorbis"';
        case "mp3":
            return 'audio/mpeg';
        case "wav":
            return "audio/wav";
        default:
            return null;
    }


};



/*
 * HexToRGBA
 * Convert HEX color to RGBA
 * @hex to convert
 * @opacity: 0 to 100
*/
Duedo.Utils.HexToRGBA = function(hex, opacity) {

    if(hex.indexOf('#') !== -1)
        hex = hex.replace('#', '');

    if(Duedo.Utils.IsNull(opacity))
        opacity = 100;

    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+ r +','+ g +','+ b +','+ opacity/100 +')';

    return result;
};



Duedo.Utils.RandRGB = function () {
    return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
};

Duedo.Utils.RandRGBA = function (alpha) {
    return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ', ' + (alpha ? alpha : (Math.random().toFixed(3)))+ ')';
};



/*
 * RGBToHex
 * Convert RGB color to Hex
*/
Duedo.Utils.RGBToHex = function(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};



/*
 * GetBase64Image
 * Convert image to DataURL
*/
Duedo.Utils.GetBase64Image = function(img, DataInfo) {

    var canvas    = document.createElement("canvas");
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    dataURL = canvas.toDataURL("image/png");

    if(Duedo.Utils.IsNull(DataInfo) || DataInfo === true)
    {
        return dataURL;
    }
    else if(DataInfo === false)
    {
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
    
};



/*
 * ResizeProportionally
 * Resize a dimension maintaining the aspect ratio
*/
Duedo.Utils.ResizeProportionally = function(sW, sH, dW, dH) {

    var ratio = Math.min(dW / sW, dH / sH);
    
    return {
        Width:  sW * ratio,
        Height: sH * ratio
    }

};



/*
 * IsDataURL
 * Detect if a given string is DataUrl
 * @return: bool
 * Thanks to bgrins: https://gist.github.com/bgrins/6194623
*/
Duedo.Utils.IsDataURL = function(string) {
    return !!string.match(Duedo.Utils.IsDataURL.regex);
};
Duedo.Utils.IsDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;


/*
 * MouseToCanvas
 * 
 * @MLocation: mouse location (relative to document) 
 * @Canvas: canvas object
 * Get mouse coordinates on the canvas
 * @return: Duedo.Vector2
*/
Duedo.Utils.MouseToCanvas = function ( MLocation, Canvas ) {
    
    var Bbox = Canvas.getBoundingClientRect();

    return new Duedo.Vector2( 
        (MLocation.X - Bbox.left) * (Canvas.width / Bbox.width),  
        (MLocation.Y - Bbox.top) * (Canvas.height / Bbox.height)
    );

};



/*
 * Rand
 * @min: number min value
 * @max: number max value
*/
Duedo.Utils.RandInRange = function ( min, max ) {
     return Math.random() * (max - min) + min;
};

/*
 * Rand -1 +1
*/
Duedo.Utils.RandM1T1 = function () {
    return Math.random() * 2 - 1;
};


/*
 * IsNull
 * !To remove and replace with Duedo.Null
*/
Duedo.Utils.IsNull = function( val ) {
    return Duedo.Null(val);
};



/*
 * MergeObjects
 * Merge 2 objects
 * return: third object
 */
Duedo.Utils.MergeObjects = function (obj1, obj2) {

    var obj3 = {};

    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }

    return obj3;

};


/* 
 * MergeObjectsDeep
 * Merge 2 objects with subobjects
 * return: third object
 */
Duedo.Utils.MergeObjectsDeep = function ( obj1, obj2 ) {
    //??????????????????????????????????????????????????????????
};


/*
 * Deg2Rad
 * Convert degrees into radians
*/
Duedo.Utils.Deg2Rad = function( deg ) {
    return deg * (Math.PI / 180);
};
Duedo.Utils.DegToRad = Duedo.Utils.Deg2Rad;
var deg2rad = Duedo.Utils.Deg2Rad;

/*
 * Rad2Deg
 * Convert radians into degrees
*/
Duedo.Utils.Rad2Deg = function( rad ) {
    return rad * (180 / Math.PI);
};
Duedo.Utils.RadToDeg = Duedo.Utils.Rad2Deg;



/*
 * SortArrayAscending
 * @array: array of objects to sort
 * @property: porperty you want to sort
*/
Duedo.Utils.SortArrayAscending = function(array, property) {

    return array.sort(function(a, b) {
            
            if(a[property] < b[property])
                return 1;
            else if(a[property] > b[property]) 
                return -1;
            else 
                return 0;

        });

};



/*
 * ShuffleArray
 * Shuffle the given array
 * @return the given array
*/
Duedo.Utils.ShuffleArray = function(array){

    for (var i = array.length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;

};


/*
 * SortArrayDescending
 * @array: array of objects to sort
 * @property: porperty you want to sort
*/
Duedo.Utils.SortArrayDescending = function(array, property) {

    return array.sort(function(a, b) {

            if(a[property] < b[property])
                return -1;
            else if(a[property] > b[property]) 
                return 1;
            else 
                return 0;
        });

};



/*
 * Text.ClearBetween
 * //
 * @string: the original string
 * @from: string/char prefix
 * @to: string/char suffix
*/
Duedo.Utils.Text.ClearBetween = function ( string, from, to ) {

    var SUB;
    
    while( (SUB = Duedo.Utils.Text.Between(string, from, to))  !== '' )
    {
        string = string.replace(from + SUB + to, '');
    }

    return string;

};



/*
 * Text.Between
 * Get string between "prefix" and "suffix"
 * @string: the string
 * @prefix: prefix
 * @suffix: suffix
*/
Duedo.Utils.Text.Between = function (string, prefix, suffix) {

    var s = string;

    var i = s.indexOf(prefix);

    if (i >= 0)
    {
        s = s.substring(i + prefix.length);
    }
    else
    {
        return '';
    }
    if (suffix)
    {
        i = s.indexOf(suffix);

        if (i >= 0)
        {
            s = s.substring(0, i);
        }
        else
        {
            return '';
        }
    }

    return s;
};



/*
 * Text.ReplaceCharsAll
 * Replace all characters === "char" with "repWith"
 * @string: string
 * @char: the char to replace
 * @repWidth: the char to replace with
*/
Duedo.Utils.Text.ReplaceCharsAll = function ( string, char, repWith ) {

    if( char instanceof Array )
    {
        for( var i in char )
        {
            string = Duedo.Utils.Text.ReplaceCharsAll( string, char[i], repWith );
        }
    }
    else
    {
        var regex = new RegExp(Duedo.Utils.Text.EscapeRegExp(char), 'g');

        string = string.replace(regex, repWith);
    }

    return string;

};



/*
 * Text.EscapeRegExp
 *
*/
Duedo.Utils.Text.EscapeRegExp = function(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}



/*
 * Text.ReplaceSpace
 * Replaces all spaces
 * @string: the string
*/
Duedo.Utils.Text.ReplaceSpaces = function (string) {
    return Duedo.RemoveSpaces(string);
};




/*
 ================================================
 * Duedo.Cookie
 ================================================
*/


/*
 ========================
 * SetCookie
 ========================
*/
Duedo.Cookie.SetCookie = function (name, value, days) {

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};

/*
 ========================
 * ReadCookie
 ========================
*/
Duedo.Cookie.ReadCookie = function (name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }

    return null;
};


/*
 ========================
 * EraseCookie
 ========================
*/
Duedo.Cookie.EraseCookie = function (name) {
    Duedo.Cookie.SetCookie(name, "", -1);
};