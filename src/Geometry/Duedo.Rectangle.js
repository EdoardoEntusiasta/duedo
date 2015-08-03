
/*
==========================================
Duedo.Rectangle
==========================================
*/

Duedo.Rectangle = function (locationVec, width, height) {
    Duedo.Shape.call(this);
    this.Type = Duedo.RECTANGLE;

    this.Location = locationVec || new Duedo.Vector2(0, 0);
    this.Width = width || 0;
    this.Height = height || 0;
};


/*Inherit shape object*/
Duedo.Rectangle.prototype = Object.create(Duedo.Shape.prototype);
Duedo.Rectangle.prototype.constructor = Duedo.Rectangle;


/*
 * Static methods
 */
Duedo.Rectangle.Intersects = function (ra, rb, tolerance) {

    if (ra.Width <= 0 || ra.Height <= 0 || rb.Width <= 0 || rb.Height <= 0)
    {
        return false;
    }


    return !(ra.Right < rb.Location.X || ra.Bottom < rb.Location.Y || ra.Location.X > rb.Right || ra.Location.Y > rb.Bottom);

};




Duedo.Rectangle.Equals = function (a, b) {
    return (a.Location.X === b.Location.X && a.Y === b.Location.Y && a.Width === b.Width && a.Height === b.Height);
};






/*
 * Public and private methods
 */
Duedo.Rectangle.prototype.Clone = function () {
    return new Duedo.Rectangle(this.Location.X, this.Location.Y, this.Width, this.Height);
};




Duedo.Rectangle.prototype.GetAsVector = function () {
    return new Duedo.Vector2(this.Location.X, this.Location.Y);
};



Duedo.Rectangle.prototype.Intersects = function ( rectangle, tolerance ) {

    return Duedo.Rectangle.Intersects( this, rectangle, tolerance );

};





Duedo.Rectangle.prototype.Contains = function ( x, y ) {

    if (this.Width <= 0 || this.Height <= 0)
    {
        return false;
    }

    if( x instanceof Duedo.Point || x instanceof Duedo.Vector2 )
    {
        y = x.Y;
        x = x.X;
    }

    return (x >= this.Location.X && x <= this.Right && y >= this.Location.Y && y <= this.Bottom);

};




Object.defineProperty(Duedo.Rectangle.prototype, "Center", {
    
    get: function () {

        if (!Duedo.Utils.IsNull(this.Angle) && this.Angle != 0)
        {
            var cosa = Math.cos(this.Angle);
            var sina = Math.sin(this.Angle);
            var wp = this.Width / 2;
            var hp = this.Height / 2;
            
            return new Duedo.Point((this.Location.X + wp * cosa - hp * sina), (this.Location.Y + wp * sina + hp * cosa));

        }
        else
        {
            
            return new Duedo.Point(this.Location.X + this.HalfWidth, this.Location.Y + this.HalfHeight);
        }


    }

});


/*
Return interesection area as output (Duedo.Rectangle)
*/
Duedo.Rectangle.IntersectsInfo = function (a, b, output) {

    if (typeof output === "undefined")
    {
        output = new Duedo.Rectangle();
    }

    if (Duedo.Rectangle.Intersects(a, b))
    {
        output.Location.X = Math.max(a.Location.X, b.Location.X);
        output.Location.Y = Math.max(a.Location.Y, b.Location.Y);
        output.Width = Math.min(a.Right, b.Right) - output.Location.X;
        output.Height = Math.min(a.Bottom, b.Bottom) - output.Location.Y;
    }

    return output;

};








Object.defineProperty(Duedo.Rectangle.prototype, "Left", {

    get: function () {
        return this.Location.X;
    },

    set: function (value)
    {
        if (value >= this.Right)
        {
            this.Width = 0;
        }
        else
        {
            this.Width = this.Right - value;
        }

        this.Location.X = value;
    }

});








Object.defineProperty(Duedo.Rectangle.prototype, "Right", {

    get: function () {
        return this.Location.X + this.Width;
    },

    set: function (value)
    {
        if (value <= this.X)
        {
            this.Width = 0;
        }
        else
        {
            this.Width = this.Location.X + value;
        }
    }

});







Object.defineProperty(Duedo.Rectangle.prototype, "Top", {

    get: function () {
        return this.Location.Y;
    },

    set: function (value)
    {
        if (value >= this.Bottom)
        {
            this.Height = 0;
            this.Location.Y = value;
        }
        else
        {
            this.Height = (this.Bottom - value);
        }
    }

});






Object.defineProperty(Duedo.Rectangle.prototype, "Bottom", {

    get: function () {
        return this.Location.Y + this.Height;
    },

    /*Check*/
    set: function (value)
    {
        if (value <= this.Location.Y)
        {
            this.Height = 0;
        }
        else
        {
            this.Height = (this.Location.Y - value);
        }
    }

});






Object.defineProperty(Duedo.Rectangle.prototype, "TopLeft", {

    get: function () {
        return new Duedo.Point(this.Location.X, this.Location.Y);
    },

    set: function (value)
    {
        this.Location.X = value.Location.X;
        this.Location.Y = value.Location.Y;
    }

});





Object.defineProperty(Duedo.Rectangle.prototype, "TopRight", {

    get: function () {
        return new Duedo.Point(this.Right, this.Top);
    },

    set: function (value)
    {
        /*
        this.X = value.X;
        this.Y = value.Y;
        */
    }

});





Object.defineProperty(Duedo.Rectangle.prototype, "BottomRight", {

    get: function () {
        return new Phaser.Point(this.Right, this.Bottom);
    },

    set: function (value)
    {
        this.Right = value.Location.X;
        this.Bottom = value.Location.Y;
    }

});







Object.defineProperty(Duedo.Rectangle.prototype, "Volume", {

    get: function () {
        return this.Width * this.Height;
    }

});







Object.defineProperty(Duedo.Rectangle.prototype, "HalfWidth", {

    get: function () {
        return this.Width / 2;
    }

});






Object.defineProperty(Duedo.Rectangle.prototype, "HalfHeight", {

    get: function () {
        return this.Height / 2;
    }

});




Duedo.Rectangle.prototype.CreatePath = function(context) {
    context.beginPath();
    context.rect(DUnits.M2P(this.Location.X), DUnits.M2P(this.Location.Y), this.Width, this.Height);
};




