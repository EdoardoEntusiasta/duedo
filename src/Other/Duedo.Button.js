/*
==============================
Duedo.Button
Author: http://www.edoardocasella.it

A generic interactive button
==============================
*/

//FIXME: Add a cache property to prevent repeating the same operations


Duedo.Button = function ( gameContext ) {
    Duedo.GraphicObject.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.BUTTON;
    
    this.Name;
    this.Active;

    this._Text;
    this.TextVerticalAlign = "top";
    this.TextHorizontalAlign = "right";

    this.Stroke;
    this.Texture;
    this.TextureHover;
    this.Shadow = false;
    this.ShadowOffsetX = 0;
    this.ShadowOffsetY = 0;
    this.ShadowBlur = 10;
    this.ShadowColor = "black";

    this._FillWith;

    //Mouse interaction
    this._isMouseOver = false;
    this._Clicked = false;

    this.HoverSound;
    this.ClickSound;

    //Callbacks
    this.OnHoverCallback;
    this.OnMouseOutCallback;
    this.OnClickCallback;
    //Inactive callbacks
    this.InactiveHoverCallback;
    this.InactiveMouseOutCallback;

    this._MouseWasOver = false;

    this._init();
};


/*Inherit graphic object*/
Duedo.Button.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Button.prototype.constructor = Duedo.Button;




/*
 * _init
*/
Duedo.Button.prototype._init = function () {
    this._super();

    /*Initialize a visible button*/
    this.Width  = 200;
    this.Height = 30;
    this.Location.X       = 0;
    this.Location.Y       = 0;
    this.Name             = "button";
    this.Active           = true;
    this.Text             = null;
    this.Stroke           = "black";
    this.Texture          = "grey";
    this.TextureHover     = "red";
    
};




/*
 * Update
 * Main update loop
*/
Duedo.Button.prototype.Update = function ( deltaT ) {

    /*Super update*/
    this.SuperUpdate(deltaT);

    /*Mouse interactions*/
    this._UpdateMouseEvents(deltaT);    
      
    /*Update any children*/
    if(this.Children.length)
    {
        for(var x = this.Children.length - 1; x >= 0; x--)
            if(!Duedo.Utils.IsNull(this.Children[x]["Update"]))
                this.Children[x].Update(deltaT);
    }

};




/*
 * PostUpdate
 * Update graphicObject alpha, children and other stuff
*/
Duedo.Button.prototype.PostUpdate = function(deltaT) {
    
    if(this.Body)
    {
        this.Body.Link(deltaT);
    }

    //FIX:: this.Alpha = (Duedo.Utils.IsNull(this.Parent) ? this.Alpha * this.Game.World.Alpha : this.Parent.Alpha);
    this.UpdateAnimations( deltaT );
    
    /*Renderable*/
    this.Renderable = (this.Game.Viewport.Intersects(
        new Duedo.Rectangle(
            this.Location,
            this.Width, 
            this.Height)
    ) && this.Alpha > 0);

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y + this.ViewportOffset.Y;
    }


    if(this.Text)
    {        
        this._AlignText();
    }

    /*Update any children*/
    if(this.Children.length)
    {
        for(var x = this.Children.length - 1; x >= 0; x--)
            if(!Duedo.Utils.IsNull(this.Children[x]["PostUpdate"]))
                this.Children[x].PostUpdate(deltaT);
    }

};



/*
 * _AlignText
 * private
*/
Duedo.Button.prototype._AlignText = function() {

    switch(this.TextHorizontalAlign) 
    {
        case "center":
            this.Text.Location.X = this.Location.X + ((this.Width / 2) - (this.Text.Width / 2));
            break;
        case "left"  : 
            this.Text.Location.X = this.Location.X + 1; 
            break;
        case "right" : 
            this.Text.Location.X = (this.Location.X + this.Width) - (this.Text.Width + 2);
            break;
        default:
            this.Text.Location.X = this.Location.X + 1;
            break;
    }

    switch(this.TextVerticalAlign) 
    {
        case "center":
            this.Text.Location.Y = this.Location.Y + ((this.Height / 2) - (this.Text.Height / 2));
            break;
        case "left"  : 
            this.Text.Location.Y = this.Location.Y + ((this.Height / 2) - (this.Text.Height / 2));
            break;
        case "right" : 
            this.Text.Location.Y = this.Location.Y + ((this.Height / 2) - (this.Text.Height / 2));
            break;
        default:
            this.Text.Location.Y = this.Location.Y + 1;
            break;
    }

};



/*
 * _UpdateMouseEvents
 * private
 * Mouse events listener: hover, click
*/
Duedo.Button.prototype._UpdateMouseEvents = function ( deltaT ) {

    if(!this.Renderable)
    {
        return;
    }

    if( this.MouseHover() )
    {

        if( !this._MouseWasOver )
        {

            if( typeof this.HoverSound !== "undefined" && this.Active)
            {
                this.Game.SoundManager.Play(this.HoverSound, this.Name + "_" + this.HoverSound);
            }


            if(this.Active)
                this._FillWith = this.TextureHover;


            if( typeof this.OnHoverCallback !== "undefined" )
            {
                if(!this.Active)
                {
                    if(!Duedo.Utils.IsNull(this.InactiveHoverCallback))
                    {
                        this.InactiveHoverCallback.call(this);
                    }     
                }
                else
                {
                    this.OnHoverCallback.call( this );
                }
                
            }

            this._MouseWasOver = true;
        }

        /*Handle click*/
        if( this.Game.InputManager.Mouse.IsDown(Duedo.Mouse.LEFT_BUTTON) === true && !this._Clicked && this.Active)
        {
            this._Clicked = true;            
        }


        if ( this.Game.InputManager.Mouse.IsDown(Duedo.Mouse.LEFT_BUTTON) === false && this._Clicked) 
        {
            this._Clicked = false;

            if( this.ClickSound ) 
            {
                this.Game.SoundManager.Play(this.ClickSound, this.Name + "_" + this.ClickSound);
            }

            if( typeof this.OnClickCallback !== "undefined" )
            {
                this.OnClickCallback.call(this);
            }
        }

    }
    else
    {
        this._FillWith = this.Texture;

        /*OnMouseOutCallback*/
        if(this._MouseWasOver)
        {
            if(this.Active) 
            {
                if(!Duedo.Utils.IsNull(this.OnMouseOutCallback))
                {
                    this.OnMouseOutCallback.call(this);
                }
            }
            else
            {
                if(!Duedo.Utils.IsNull(this.InactiveMouseOutCallback))
                {
                    this.InactiveMouseOutCallback.call(this);
                }
            }
            
        }

        this._MouseWasOver = false;
        this._Clicked = false;
    }


    return this;
};




/*
 * Text
 * Add text to this button
*/
Object.defineProperty(Duedo.Button.prototype, "Text", {

    set: function( value ) {
        
        if(!Duedo.Utils.IsNull(this._Text))
        {
            this._Text.Text = value;
            return;
        }

        if(value instanceof Duedo.Text)
        {
            value.Parent = this;
            this._Text   = value;
        }
        else
        {
            var DUEDOText    = new Duedo.Text(this.Game, value);
            DUEDOText.Parent = this;
            this._Text       = DUEDOText;

            value = DUEDOText;
        }

        this.Children.push(value);

    },

    get: function() {
        return this._Text;
    }

});





/*
 * Draw
*/
Duedo.Button.prototype.Draw = function ( context2d ) {
    
    if(!this.Renderable)
    {
        return;
    }

    context2d.save();
    context2d.globalAlpha = this.Alpha;

    
    if (this._FillWith instanceof Image) 
    {
        context2d.drawImage(this._FillWith, this.Location.X, this.Location.Y, this.Width, this.Height);
    }
    else
    {
        context2d.beginPath();
        context2d.strokeStyle = this.Stroke;

        context2d.fillStyle = this._FillWith || "grey";
        context2d.rect(this.Location.X, this.Location.Y, this.Width, this.Height);

        if(this.Shadow === true)
        {
            context2d.shadowColor   = this.ShadowColor;
            context2d.shadowOffsetX = this.ShadowOffsetX;
            context2d.shadowOffsetY = this.ShadowOffsetY;
            context2d.shadowBlur    = this.ShadowBlur;
        }

        context2d.fill();
        context2d.stroke();

        context2d.closePath();
    }
    
    
    context2d.restore();
    
};



/*
 * Width
 * @public
 * Width of this button
*/
Object.defineProperty(Duedo.Button.prototype, "Width", {
    get:function() {
        return this._Width * this.Scale.X;
    },
    set:function(val) {
        this._Width = val;
    }
});



/*
 * Height
 * @public
 * Height of this button
*/
Object.defineProperty(Duedo.Button.prototype, "Height", {
    get:function() {
        return this._Height * this.Scale.Y;
    },
    set:function(val) {
        this._Height = val;
    }

});


/*
 * HalfWidth
 * @public
 * HalfWidth of this button
*/
Object.defineProperty(Duedo.Button.prototype, "HalfWidth", {
    get:function() {
        return this.Width / 2;
    }
});


/*
 * HalfHeight
 * @public
 * HalfHeight of this button
*/
Object.defineProperty(Duedo.Button.prototype, "HalfHeight", {
    get:function() {
        return this.Height / 2;
    }
});
