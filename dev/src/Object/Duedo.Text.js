/*
==============================
Duedo.Text
Author: http://www.edoardocasella.it
Notes: generic text object. Text can be wrapped using the \n. Text can have a body. 

Thanks to Phaser.js by Richard Davey
==============================
*/

//FIXME: Add a cache property to prevent repeating the same operations


//Consts
Duedo.SPACE_WIDTH; //initialized in Duedo.GameContext._initConstants();


Duedo.Text = function ( gameContext, text, location, style, name) {
    Duedo.GraphicObject.call(this);

    /*Avoid sending gameContext everytime*/
    arguments = [].slice.call(arguments);
    if (typeof gameContext == "string") {
        arguments.unshift(Duedo.Global.Games[0]);
    }

    this.Game = arguments[0];
    this.Type = Duedo.TEXT;
    
    /*Show text box*/
    this.Debug = false;

    this.Parent = null;

    /*Private vars*/
    this._Text = "text";
    this._LineSpacing = 0;

    // Fonts
    this._FontName = 'Arial';
    this._FontWeight = 'normal';
    this._FontSize = '15pt';

    /*@bool: text has been modified?*/
    this._Retouched;

    //Max line width (width)
    this.MaxLineWidth = 0;
    this.LineHeight = 0;
    this.LinesWidths = [];
    this.Lines = [];

    /*Text style*/
    this.Style = {};

    this.HorizontalAlign = "left";
    this.VerticalAlign = "top";

    this._init(arguments[1], arguments[2], arguments[3], arguments[4]);
};


/*Inherit graphic object*/
Duedo.Text.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Text.prototype.constructor = Duedo.Text;




/*Debug all the text element*/
Duedo.Text.DebugAll = false;





/*
 * Init
 */
Duedo.Text.prototype._init = function ( text, locationVec, style, name ) {
    this._super();


    if( text !== null && typeof text !== "undefined" )
    {
        this.Text = text;
    }

    if (locationVec !== null && typeof locationVec !== "undefined")
    {
        this.Location = locationVec;
    }

    /*Setup style*/
    this.SetStyle( style );

    this.Name = name || "text";

    this._Retouched = true;
};



/*
 * SetStyle
 * @mstyle: style {}
 */
Duedo.Text.prototype.SetStyle = function (mstyle) {
    

    mstyle = mstyle || {};

    // Font
    this._FontName             = mstyle.FontName        || "Calibri";
    this._FontWeight           = mstyle.FontWeight      || "normal";
    this._FontSize             = mstyle.FontSize        || "15pt";

    // Style
    this.Style.Fill            = mstyle.Fill            || "black";
    this.Style.StrokeStyle     = mstyle.StrokeStyle     || "white";
    this.Style.StrokeThickness = mstyle.StrokeThickness || 0;
    this.Style.Align           = mstyle.Align           || "center";
    this.Style.WordWrap        = mstyle.WordWrap        || true;
    this.Style.WordWrapWidth   = mstyle.WordWrapWidth   || 100;
    this.Style.ShadowOffsetX   = mstyle.ShadowOffsetX   || 0;
    this.Style.ShadowOffsetY   = mstyle.ShadowOffsetY   || 0;
    this.Style.ShadowColor     = mstyle.ShadowColor     || "black";
    this.Style.ShadowBlur      = mstyle.ShadowBlur      || 0;
    this.Style.LineHeight      = mstyle.LineHeight      || 0;

};




Duedo.Text.prototype.GetBounds = function () { };


/*
 * Main update
 */
Duedo.Text.prototype.Update = function (deltaT) {
    this.SuperUpdate();


    //Text has been modified, so update internal data
    if(this._Retouched)
    {
        this.Lines = this.Text.split(/(?:\r\n|\r|\n)/);
        this._UpdateTextWidth();


        const fontHeight = this.DetermineFontHeight(`font-family:${this._FontName}`);
        //Calculate line height
        this.LineHeight = fontHeight + this.Style.StrokeThickness + this._LineSpacing + this.Style.ShadowOffsetY;

        this._Retouched = false;
    }
    

    this.UpdateAnimations(deltaT);
        
};



/*
 * _UpdateTextWidth
 * @private
 * Calculate the max width of this text
*/
Duedo.Text.prototype._UpdateTextWidth = function() {

    //calculate text width
    var lineWidth = 0;
    var ctx = this.Game.Renderer.Context;
    
    ctx.save();
    ctx.font = this.Font;

    for (var i = 0; i < this.Lines.length; i++)
    {
        
        lineWidth = this.Game.Renderer.Context.measureText(this.Lines[i]).width;
        this.LinesWidths[i] = lineWidth;
        
        this.MaxLineWidth = Math.max(this.MaxLineWidth, lineWidth) / 30;
       
        lineWidth = 0;
    }

    ctx.restore();

};



/*
 * PostUpdate
*/
Duedo.Text.prototype.PostUpdate = function(deltaT) {
 
    if(this.Body)
    {
        this.Body.Link();
    }

    /*Renderable*/ 
    this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            !this.FixedToViewport 
            ? 
                new Duedo.Vector2(this.Location.X - this.Width * this.Anchor.X, this.Location.Y - this.Height * this.Anchor.Y) 
            : 
                new Duedo.Vector2(this.ViewportOffset.X / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.X, this.ViewportOffset.Y / this.Game.Viewport.Zoom + this.Game.Viewport.View.Location.Y),
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X * this.Game.Viewport.Zoom + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y * this.Game.Viewport.Zoom + this.ViewportOffset.Y;
    }
    
};



/*
 * SetShadow
 */
Duedo.Text.prototype.SetShadow = function (x, y, color, blur) {

    this.Style.ShadowOffsetX = x || 0;
    this.Style.ShadowOffsetY = y || 0;
    this.Style.ShadowColor   = color || "black";
    this.Style.ShadowBlur    = 5;

};



/*
 * Draw
 */
Duedo.Text.prototype.Draw = function (context) {
    
    if(!this.Renderable) {
        return;
    }

    context.save();

    //Setup drawing context
    context.globalAlpha     = this.Alpha;
    context.fillStyle       = this.Style.Fill;
    context.strokeStyle     = this.Style.StrokeStyle;
    context.lineWidth       = this.Style.LineHeight;
    context.strokeThickness = this.Style.StrokeThickness;
    
    context.font = this.Font;
    context.fillStyle = this.Style.Fill;
    
    //Shadow
    //bug: shadow don't work while using MLTEXT.JS down here...
    context.shadowOffsetX   = this.Style.ShadowOffsetX;
    context.shadowOffsetY   = this.Style.ShadowOffsetY;
    context.shadowColor     = this.Style.ShadowColor;
    context.shadowBlur      = this.Style.ShadowBlur;
    
    var fn;
    
    if(this.Style.StrokeThickness)
        fn = "strokeText";

    if(this.Style.Fill)
    {
        if(fn === "strokeText")
            fn = "fillAndStrokeText";
        else
            fn = "fillText";
    }

    var height = this.Height;
    var width  = 500;
    

    /*
     * Rotate if needed
    */    
    if( this.Rotation !== 0 )
    {
        context.translate(this.Location.X + (width * this.Anchor.X), this.Location.Y + (height * this.Anchor.Y));
        context.rotate(Duedo.Units.DegToRadians(this.Rotation));
        context.translate(-(this.Location.X +  (width * this.Anchor.X)), -(this.Location.Y + (height * this.Anchor.Y)));
    }
    
    if(this.FixedToViewport && !Duedo.Conf.ScaleFixedToViewportOnZoom) {
        context.scale(this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom, this.Game.Viewport.ZoomMin / this.Game.Viewport.Zoom);
    }

    context.mlFillOrStrokeText(
        this.Text, 
        DToPixels(this.Location.X) - DToPixels(this.Width * this.Anchor.X),
        DToPixels(this.Location.Y) - DToPixels(this.Height * this.Anchor.Y),
        DToPixels(width), 
            DToPixels(height),
        this.VerticalAlign, 
        this.HorizontalAlign, 
        DToPixels(this.LineHeight + this.LineSpacing),
        fn);      
    
    /*Show text box*/
    if(this.Debug || Duedo.Text.DebugAll) {
        context.strokeStyle = 'orange';
        context.rect(
            DToPixels(this.Location.X) - DToPixels(this.MaxLineWidth * this.Anchor.X),
            DToPixels(this.Location.Y) - DToPixels(this.Height * this.Anchor.Y), 
            DToPixels(this.MaxLineWidth),
            DToPixels(this.Height)
        );
        context.stroke();
        context.font = '12px arial';
        context.fillStyle = 'orange';
        context.fillText(`Text X:${this.Location.X.toFixed(0)} Y:${this.Location.Y.toFixed(0)}`, 
            DToPixels(this.Location.X) - DToPixels(this.Width * 0.5),
            DToPixels(this.Location.Y - 0.1) - DToPixels(this.Height * 0.5)
        );
    }

    context.restore();
    

};



/*
 * DetermineFontHeight
 * @public
*/
Duedo.Text.prototype.DetermineFontHeight = function(fontStyle)
{
    var body      = document.getElementsByTagName('body')[0];
    var temp      = document.createElement('div');
    var tempText  = document.createTextNode('M');
    
    temp.appendChild(tempText);
    temp.setAttribute('style', fontStyle + ';position:absolute;top:0;left:0');
    body.appendChild(temp);
    

    result = temp.offsetHeight / Duedo.Conf.PixelsInMeter;

    body.removeChild(temp);

    return result;
};



/*
 * Height
*/
Object.defineProperty(Duedo.Text.prototype, "Height", {

    get: function () {
        return ((this.DetermineFontHeight("font:" + this.Style.Font + ";") + this.Style.StrokeThickness + this.LineSpacing) * this.Lines.length);
    }

});



/*
 * HalfHeight
 * return text half height
*/
Object.defineProperty(Duedo.Text.prototype, "HalfHeight", {
    get: function() {
        return this.Height / 2;
    } 
});



/*
 * Width
 * return text width
*/
Object.defineProperty(Duedo.Text.prototype, "Width", {
    get: function() {
        this._UpdateTextWidth();
        return this.MaxLineWidth;
    } 
});



/*
 * HalfWidth
 * return text half width
*/
Object.defineProperty(Duedo.Text.prototype, "HalfWidth", {
    get: function() {
        //this._UpdateTextWidth();
        return this.MaxLineWidth / 2;
    } 
});



/*
 * Text
 * @val: string - text 
*/
Object.defineProperty(Duedo.Text.prototype, "Text", {

    set: function ( val ) {
        this._Text = val.toString();
        this._Retouched = true;
    },

    get: function() {
        return this._Text;
    }

});


/*
 * FontName
 * @val: string
*/
Object.defineProperty(Duedo.Text.prototype, "FontName", {

    set: function (val) {
        this._FontName = val;
        this._Retouched = true;
    },

    get: function () {
        return this._FontName;
    }

});


/*
 * FontSize
 * @val: number - font size
*/
Object.defineProperty(Duedo.Text.prototype, "FontSize", {

    set: function (val) {
        if(!isNaN(val)) {
            val = val + 'px';
        }
        this._FontSize = val;
        this._Retouched = true;
    },

    get: function () {
        return this._FontSize;
    }

});



/*
 * FontWeight
 * @val: number - font weight
*/
Object.defineProperty(Duedo.Text.prototype, "FontWeight", {

    set: function (val) {
        this._FontWeight = val;
        this._Retouched = true;
    },

    get: function () {
        return this._FontWeight;
    }

});



/**
* LineSpacing
* @number: Additional spacing (in pixels) between each line of text if multi-line.
*/
Object.defineProperty(Duedo.Text.prototype, 'LineSpacing', {

    get: function() {
        return this._LineSpacing;
    },

    set: function(value) {

        if (value !== this._LineSpacing)
        {
            this._LineSpacing = parseFloat(value);
            this._Retouched = true;
        }

    }

});



/**
* StrokeThickness
* A shortcut to this.Style.StrokeThickness
*/
Object.defineProperty(Duedo.Text.prototype, "StrokeThickness", {
    set: function(val) {
        this.Style.StrokeThickness = parseFloat(val);
    },
    get: function() {
        return this.Style.StrokeThickness;
    }
});



/**
* StrokeStyle
* A shortcut to this.Style.StrokeStyle
*/
Object.defineProperty(Duedo.Text.prototype, "StrokeStyle", {
    set: function(val) {
        this.Style.StrokeStyle = val;
    },
    get: function() {
        return this.Style.StrokeStyle;
    }
});



/**
* Font
* An overall of the font
*/
Object.defineProperty(Duedo.Text.prototype, "Font", {
    get: function() {
        return this._FontWeight + ' ' + this._FontSize + ' ' + this._FontName;
    }
});





/*
 * MLTEXT.JS by Jordi Baylina
 * Library: mllib.js
 * Desciption: Extends the CanvasRenderingContext2D that adds two functions: mlFillText and mlStrokeText.
 * The prototypes are: 
 * function mlFillText(text,x,y,w,h,vAlign,hAlign,lineheight);
 * function mlStrokeText(text,x,y,w,h,vAlign,hAlign,lineheight);
 *
 * Where vAlign can be: "top", "center" or "button"
 * And hAlign can be: "left", "center", "right" or "justify"
 * Author: Jordi Baylina. (baylina at uniclau.com)
 * License: GPL
 * Date: 2013-02-21
*/
function mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, fn) {
    
    text = text.replace(/[\n]/g, " \n ");
    text = text.replace(/\r/g, "");

    var words = text.split(/[ ]+/);

    var sp;
    
    if(!Duedo.Text.SPACE_WIDTH)
        sp = this.measureText(' ').width;
    else sp = Duedo.Text.SPACE_WIDTH;

    var lines = [];
    var actualline = 0;
    var actualsize = 0;
    var wo;

    lines[actualline] = {};
    lines[actualline].Words = [];

    i = 0;
    while (i < words.length) 
    {
        var word = words[i];

        if (word == "\n") 
        {
            lines[actualline].EndParagraph = true;
            actualline++;
            actualsize = 0;
            lines[actualline] = {};
            lines[actualline].Words = [];
            i++;
        } 
        else 
        {
            wo = {};
            wo.l = this.measureText(word).width;

            if (actualsize === 0) 
            {
                while (wo.l > w) 
                {
                    word = word.slice(0, word.length - 1);
                    wo.l = this.measureText(word).width;
                }

                if (word === "") return; // I can't fill a single character

                wo.word = word;
                lines[actualline].Words.push(wo);
                actualsize = wo.l;
                if (word != words[i]) 
                {
                    words[i] = words[i].slice(word.length, words[i].length);
                } 
                else 
                {
                    i++;
                }
            } 
            else 
            {
                if (actualsize + sp + wo.l > w) 
                {
                    lines[actualline].EndParagraph = false;
                    actualline++;
                    actualsize = 0;
                    lines[actualline] = {};
                    lines[actualline].Words = [];
                } 
                else 
                {
                    wo.word = word;
                    lines[actualline].Words.push(wo);
                    actualsize += sp + wo.l;
                    i++;
                }
            }
        }
    }
    
    if (actualsize === 0) 
        lines[actualline].pop();
    
    lines[actualline].EndParagraph = true;

    var totalH = lineheight * lines.length;
    while (totalH > h) 
    {
        lines.pop();
        totalH = lineheight * lines.length;
    }

    var yy;
    if (vAlign == "bottom") 
    {
        yy = y + h - totalH + lineheight;
    } 
    else if (vAlign == "center") 
    {
        yy = y + h / 2 - totalH / 2 + lineheight;
    } 
    else 
    {
        yy = y + lineheight;
    }

    var oldTextAlign = this.textAlign;
    this.textAlign = "left";

    for (var li in lines) 
    {
        var totallen = 0;
        var xx, usp;

        for (wo in lines[li].Words) 
            totallen += lines[li].Words[wo].l;

        if (hAlign == "center") 
        {
            usp = sp;
            xx = x + w / 2 - (totallen + sp * (lines[li].Words.length - 1)) / 2;
        } 
        else if ((hAlign == "justify") && (!lines[li].EndParagraph)) 
        {
            xx = x;
            usp = (w - totallen) / (lines[li].Words.length - 1);
        } 
        else if (hAlign == "right") 
        {
            xx = x + w - (totallen + sp * (lines[li].Words.length - 1));
            usp = sp;
        } 
        else 
        { // left
            xx = x;
            usp = sp;
        }
        for (wo in lines[li].Words) 
        {
            if (fn == "fillText") 
            {
                this.fillText(lines[li].Words[wo].word, xx, yy);
            } 
            else if (fn == "strokeText") 
            {
                this.strokeText(lines[li].Words[wo].word, xx, yy);
            }
            else if(fn == "fillAndStrokeText")
            {
                this.fillText(lines[li].Words[wo].word, xx, yy);
                this.strokeText(lines[li].Words[wo].word, xx, yy);
            }

            xx += lines[li].Words[wo].l + usp;
        }

        yy += lineheight;
    }

    this.textAlign = oldTextAlign;
}





/*
 * mlInit
 * Makes available the ml extension
 * Author: Jordi Baylina
*/
(function mlInit() {

    CanvasRenderingContext2D.prototype.mlFunction = mlFunction;

    CanvasRenderingContext2D.prototype.mlFillText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "fillText");
    };

    CanvasRenderingContext2D.prototype.mlStrokeText = function (text, x, y, w, h, vAlign, hAlign, lineheight) {
        this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, "strokeText");
    };

    CanvasRenderingContext2D.prototype.mlFillOrStrokeText = function (text, x, y, w, h, vAlign, hAlign, lineheight, fillorstroke) {
        this.mlFunction(text, x, y, w, h, hAlign, vAlign, lineheight, fillorstroke);
    };



})();