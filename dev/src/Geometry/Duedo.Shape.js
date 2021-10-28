/*
==========================================
Shape
Author: http://www.edoardocasella.it
Based on Core HTML5 Canvas by David Geary
==========================================
*/

Duedo.Shape = function () {
    Duedo.GraphicObject.call(this);
    this.Game = Duedo.Global.Games[0];
    this.StrokeStyle = 'rgba(255, 253, 208, 0.9)';
    this._FillStyle = 'rgba(162, 204, 0, 1)';
    this.BlendMode   = Duedo.BlendModes.NORMAL;
    this.Rotation = 0;
    /*
    this.shadowOffsetX = 10;
    this.shadowOffsetY = 0;
    this.shadowColor = 'black';
    this.shadowBlur = 6;
    */
    this.Points = []; //outerclockwise
    this._init();
};


/*Inherit generic object*/
Duedo.Shape.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.Shape.prototype.constructor = Duedo.Shape;



/*
 * _init
*/
Duedo.Shape.prototype._init = function() {
    this._super();
};



/*
 * MinimumTranslationVector
 * public
 * Get minimum translation vector (used for SAT collision detection)
*/
Duedo.Shape.prototype.MinimumTranslationVector = function (axes, shape) {

    var minimumOverlap = 100000;
    var overlap;
    var axisWithSmallestOverlap;

    for (var i = 0; i < axes.length; ++i) {

        axis = axes[i];

        projection1 = shape.Project(axis);
        projection2 = this.Project(axis);

        overlap = projection1.Overlaps(projection2);

        if (overlap === 0)
        {
            return {    //no collision
                axis: undefined,
                overlap: 0
            }
        }
        else
        {
            if (overlap < minimumOverlap)
            {
                minimumOverlap = overlap;
                axisWithSmallestOverlap = axis;
            }
        }
    }

    return { //mtv
        axis: axisWithSmallestOverlap,
        overlap: minimumOverlap
    };

};


/*
 * CollidesWith
 * public
 * Check collision between two shapes
*/
Duedo.Shape.prototype.CollidesWith = function (shape) {
    var axes = this.GetAxes().concat(shape.GetAxes());
    return !this.SeparationOnAxes(axes, shape);
};



/*
 * SeparationOnAxes
 * public
*/
Duedo.Shape.prototype.SeparationOnAxes = function (axes, shape) {

    if (!axes || !shape)
        return false;

    for (var i = 0; i < axes.length; ++i)
    {
        axis = axes[i];

        projection1 = shape.Project(axis);
        projection2 = this.Project(axis);

        if (!projection1.Overlaps(projection2))
        {
            return true;
        }
            
    }

    return false;
};



/*
 * Translate
*/
Duedo.Shape.prototype.Translate = function(x, y) {

    if(x instanceof Duedo.Vector2)
    {
        y = x.Y;
        x = x.X;
    }

    this.Location.X += x;
    this.Location.Y += y;

    return this;
};



Duedo.Shape.prototype.Rotate = function (rad) {
    throw 'rotate() not implemented';
};


Duedo.Shape.prototype.GetAxes = function () {
    throw 'getAxes() not implemented';
};

Duedo.Shape.prototype.Project = function (axis) {
    throw 'project() not implemented';
};

Duedo.Shape.prototype.Move = function (dx, dy) {
    throw 'move() not implemented';
};

Duedo.Shape.prototype.Translate = function (tx, ty) {
    throw 'translate() not implemented';
};

Duedo.Shape.prototype.GetPosition = function () {
    throw 'getPosition() not implemented';
};

Duedo.Shape.prototype.CreatePath = function (context) {
    throw 'createPath(context) not implemented';
};


/*
 * PreUpdate
*/
Duedo.Shape.prototype.PreUpdate = function (deltaT) {



};


/*
 * Update
*/
Duedo.Shape.prototype.Update = function (deltaT) {
    this.SuperUpdate(deltaT);
    this.UpdateAnimations(deltaT);
};


/*
 * PostUpdate
*/
Duedo.Shape.prototype.PostUpdate = function(deltaT) {

    //Update location if it's fixed to viewport
    if(this.FixedToViewport)
    {
        this.Location.X = this.Game.Viewport.View.Location.X + this.ViewportOffset.X;
        this.Location.Y = this.Game.Viewport.View.Location.Y + this.ViewportOffset.Y;
    }
    

    //Update vertices of complex polygons
    //Cache
    if (this.Points.length && !Duedo.Vector2.Compare(this.LastLocation, this.Location))
        this.UpdateVertices();

    this.LastLocation = this.Location.Clone();

    /*FIX: And what if the children needs the LastLocation? (in the game loop are updated after this)*/
};



/*
Fill
===================
*/
Duedo.Shape.prototype.Fill = function (context) {
    // context.save();
    /*
    context.shadowBlur = 2;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowColor = "red";
    */
    context.globalCompositeOperation = this.BlendMode;
    context.globalAlpha = this.Alpha;
    context.fillStyle = this.FillStyle;
    this.CreatePath(context);
    context.fill();
    // context.restore();
};


/*
Stroke
===================
*/
Duedo.Shape.prototype.Stroke = function (context) {
    context.globalCompositeOperation = this.BlendMode;
    context.globalAlpha = this.Alpha;
    context.strokeStyle = this.StrokeStyle;
    this.CreatePath(context);
    context.stroke();
};


/*
Is point in path
===================
*/
Duedo.Shape.prototype.IsPointInPath = function (context, x, y) {
    this.CreatePath(context);
    return context.isPointInPath(x, y);
};


/*Draw*/
Duedo.Shape.prototype.Draw = function ( context ) {

    if( !this.Renderable || this.Alpha < 0)
    {
        return false;
    }
    context.save();

    if( this.Rotation !== 0 ) {  
        const origin = new Duedo.Vector2(
            this.Location.X + (this.Width * this.Anchor.X), 
            this.Location.Y + (this.Height * this.Anchor.Y)
        );
        context.translate(origin.X, origin.Y);
        context.rotate(Duedo.Units.DegToRadians(this.Rotation));
        context.translate(-(origin.X), -(origin.Y));
    }

    this.Fill(context);
    this.Stroke(context);

    context.restore();
    
    return this;

};


/*
 * UpdateVertices
 * Update point by point
*/
Duedo.Shape.prototype.UpdateVertices = function () {
    
    var translate = new Duedo.Vector2(0, 0);

    translate.X = this.Location.X - this.Points[0].X;
    translate.Y = this.Location.Y - this.Points[0].Y;

    for (var i in this.Points)
        this.Points[i].Add(translate);

};



Duedo.Shape.prototype.Rotate = function (rad) {
};


Duedo.Shape.prototype.RotateContext = function (context) {
    //throw 'RotateContext(context) not implemented';
};



/*
 * FillStyle
 * Can be an image (pattern) or a color
*/
Object.defineProperty(Duedo.Shape.prototype, "FillStyle", {

    get: function () {
        return this._FillStyle;
    },

    set: function (v) {

        /*Pattern*/
        if (v instanceof Image)
            this.FillStyle = this.Game.Renderer.Context.createPattern(v, 'repeat');
        /*RGB|RGBA|HEX*/
        else
            this._FillStyle = v;
    }

})