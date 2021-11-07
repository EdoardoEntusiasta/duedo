/*
==========================================
Duedo.Line
Author: http://www.edoardocasella.it
Thanks to: Phaser game engine
==========================================
*/

Duedo.Line = function (start /*Duedo.Point*/, end /*Duedo.Point*/) {
    Duedo.Shape.call(this);

    this.Type = Duedo.LINE;

    /*Setup*/
    this.Start = start;
    this.End = end;

    this.Location = this.Start;

    this.LineWidth = 0.1;

};


/*Inherit shape object*/
Duedo.Line.prototype = Object.create(Duedo.Shape.prototype);
Duedo.Line.prototype.constructor = Duedo.Line;





Duedo.Line.prototype.Set = function (start, end) {
    this.Start = start;
    this.End   = end;
    return this;
};



Duedo.Line.prototype.Contains = function (x, y) {
    return this.PointOnLine(x, y);
};


Duedo.Line.prototype.Intersects = function (line, asSegment) {
    return Duedo.Line.Intersects(this.Start, this.End, line.Start, line.End, asSegment);
};


/**
* AS REPORTED IN: PHASER HTML5 GAME ENGINE
* Checks for intersection between two lines as defined by the given start and end points.
* If asSegment is true it will check for line segment intersection. If asSegment is false it will check for line intersection.
* Returns the intersection segment of AB and EF as a Point, or null if there is no intersection.
* Adapted from code by Keith Hair
*
* @method Phaser.Line.intersectsPoints
* @param {Point/Vector2} a - The start of the first Line to be checked.
* @param {Point/Vector2} b - The end of the first line to be checked.
* @param {Point/Vector2} e - The start of the second Line to be checked.
* @param {Point/Vector2} f - The end of the second line to be checked.
* @param {boolean} [asSegment=true] - If true it will check for segment intersection, otherwise full line intersection.
* @return {Duedo.Vector2} The intersection segment of the two lines as a Point, or null if there is no intersection.
*/
Duedo.Line.Intersects = function (a, b, e, f, asSegment) {
    
    if (typeof asSegment === 'undefined') { asSegment = true; }

    var result = new Duedo.Vector2(0, 0);

    var a1 = b.Y - a.Y;
    var a2 = f.Y - e.Y;
    var b1 = a.X - b.X;
    var b2 = e.X - f.X;
    var c1 = (b.X * a.Y) - (a.X * b.Y);
    var c2 = (f.X * e.Y) - (e.X * f.Y);
    var denom = (a1 * b2) - (a2 * b1);

    if (denom === 0) {
        return null;
    }

    result.X = ((b1 * c2) - (b2 * c1)) / denom;
    result.Y = ((a2 * c1) - (a1 * c2)) / denom;

    if (asSegment) {
        var uc = ((f.Y - e.Y) * (b.X - a.X) - (f.X - e.X) * (b.Y - a.Y));
        var ua = (((f.X - e.X) * (a.Y - e.Y)) - (f.Y - e.Y) * (a.X - e.X)) / uc;
        var ub = (((b.X - a.X) * (a.Y - e.Y)) - ((b.Y - a.Y) * (a.X - e.X))) / uc;

        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            return result;
        }
        else {
            return null;
        }
    }

    return result;


};


Duedo.Line.prototype.PointOnLine = function (x, y) {
    /*
    if(!this.FixedToViewport) {
        objLoc = this.Location.Clone()
            .Subtract(new Duedo.Vector2(this.Width * this.Anchor.X, this.Height * this.Anchor.Y))
            // make it relative to the canvas
            .Subtract(this.Game.Viewport.View.GetAsVector());
    } else {
        objLoc = this.ViewportOffset.Clone()
			.Subtract(new Duedo.Vector2(this.Width * this.Anchor.X, this.Height * this.Anchor.Y));
    }
    */
    // todo Considera anche il width/height della linea
    // TODO la location a cosa corrisponde? Alla dimensione * l'ancora?
    // TODO se modifico la location modifico allo stesso tempo il punto A e il punto B della retta?
    return ((x - this.Start.X) * (this.End.Y - this.Start.Y) === (this.End.X - this.Start.X) * (y - this.Start.Y));
};


Duedo.Line.prototype.SetStart = function (start) {
    this.Start = start;
    return this;
};



Duedo.Line.prototype.SetEnd = function (end) {
    this.End = end;
    return this;
};



Duedo.Line.prototype.DistanceToEnd = function () {
    return this.Start.DistanceTo(this.End);
};



Duedo.Line.prototype.Clone = function () {
    return new Duedo.Line(this.Start.Clone(), this.End.Clone());
};



Duedo.Line.prototype.Copy = function (line) {
    this.Start.Copy(line.Start);
    this.End.Copy(line.End);
    return this;
};

Duedo.Line.prototype.SetStartX = function (x) {
    this.Start.X = x;
    return this;
};

Duedo.Line.prototype.SetStartY = function (y) {
    this.Start.Y = y;
    return this;
};

Duedo.Line.prototype.SetEndX = function (x) {
    this.End.X = x;
    return this;
};

Duedo.Line.prototype.SetEndY = function (y) {
    this.End.Y = y;
    return this;
};

Duedo.Line.prototype.CreatePath = function(context) {
    context.beginPath();
    context.lineWidth = DUnits.M2P(this.LineWidth); // line height
    context.moveTo(DUnits.M2P(this.Start.X), DUnits.M2P(this.Start.Y));
    context.lineTo(DUnits.M2P(this.End.X), DUnits.M2P(this.End.Y));
};


Duedo.Line.prototype.Rotate = function (rad, origin) {
    if (Duedo.Utils.IsNull(rad)) return;
    if (!origin)
        origin = this.Center;
    
    this.Start.Rotate(rad, origin);
    this.End.Rotate(rad, origin);
    return this;
};


Object.defineProperty(Duedo.Line.prototype, "Center", {
    get: function () {
        return new Duedo.Point(((this.Start.X + this.End.X) / 2), ((this.Start.Y + this.End.Y) / 2));
    }
});


Object.defineProperty(Duedo.Line.prototype, "Angle", {
    get: function() {
        return Math.atan2(this.End.Y - this.Start.Y, this.End.X - this.Start.X);
    }
});



Object.defineProperty(Duedo.Line.prototype, "Width", {
    get: function () {
        return Math.abs(this.Start.X - this.End.X);
    }
});

Object.defineProperty(Duedo.Line.prototype, "Height", {
    get: function () {
        return Math.abs(this.Start.Y - this.End.Y);
    }
});


Object.defineProperty(Duedo.Line.prototype, "Top", {

    get: function () {
        return Math.min(this.Start.Y, this.End.Y);
    }

});


Object.defineProperty(Duedo.Line.prototype, "Bottom", {

    get: function () {
        return Math.max(this.Start.Y, this.End.Y);
    }

});

Object.defineProperty(Duedo.Line.prototype, "Left", {

    get: function () {
        return Math.min(this.Start.X, this.End.X);
    }

});


Object.defineProperty(Duedo.Line.prototype, "Right", {

    get: function () {
        return Math.max(this.Start.X, this.End.X);
    }

});