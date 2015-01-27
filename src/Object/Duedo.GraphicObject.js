/*
==============================
Duedo.GraphicObject
Author: http://www.edoardocasella.it

Graphic objects are all that can be rendered like spritesheets, particle systems, layers, parallax, world, viewport etc...
==============================
*/

Duedo.GraphicObject = function () {
    Duedo.Object.call(this);

    /*
    Buffered graphic object resource
    */
    this.Source;

    /*
     * Name
    */
    this.Name;

    /*
    * Dimension
    * @private
    */
    this._Width;
    this._Height;

    /*
    Location in the world
    */
    this.Location;
    this.LastLocation;

    /*
    Scale vector
    */
    this.Scale;


    /*
    Opacity/Alpha
    */
    this.Alpha;


    /*
     Rotation rad
    */
    this._Rotation;

    /*
     * Anchor
     * Rotation anchor of this object
    */
    this.Anchor;

    /*
    Is renderable
    Is object visible inside the viewport?
    */
    this.Renderable;


    /*
        Z - Ordering
        Used for rendering order
    */
    this._Z;
    this.RenderOrderID = 0;

    /*
       BlendMode
    */
    this.BlendMode;


    /*
        Animation manger
        Used to manage the animations on the properties of a graphic object
    */
    this.AnimationManager;
    
    
    /*
     * Physic body
    */
    this.Body;


    /*
        ViewportDependant
    */
    this.FixedToViewport = false;
    this.ViewportOffset;
   
};



/*Inherit from generic Object*/
Duedo.GraphicObject.prototype = Object.create(Duedo.Object.prototype);
Duedo.GraphicObject.prototype.constructor = Duedo.GraphicObject;



/*
 * _super
*/
Duedo.GraphicObject.prototype._super = function () { 

    this.Location           = new Duedo.Vector2(0, 0);
    this.LastLocation       = this.Location.Clone();
    this.AnimationManager   = new Duedo.AnimationManager(this.Game, this);
    this.Renderable         = true;
    this.Alpha              = 1;
    this.Rotation           = 0;
    this.Scale              = new Duedo.Vector2(1, 1);
    this._Z                 = 0;
    this.ViewportOffset     = new Duedo.Vector2(0, 0);
    this.Anchor             = new Duedo.Point(0.5, 0.5);

    return this;
};



/*
 * Translate
*/
Duedo.GraphicObject.prototype.Translate = function (tVector2) {

    if (tVector2 !== undefined || tVector2 instanceof Duedo.Vector2)
    {
        this.Location.Translate(tVector2);
    }
    else
    {
        throw "Duedo.Object.Translate: needs Duedo.Vector2";
    }

    return this;

};



/*
 * SetLocation
 * @public
 * Modify location vetor of this graphic object
*/
Duedo.GraphicObject.prototype.SetLocation = function(x, y) {
    this.Location.X = x || this.Location.X;
    this.Location.Y = y || this.Location.Y;
    return this;
};




/*
 * Rotate
 * @Angle: radians
*/
Duedo.GraphicObject.prototype.Rotate = function ( /*rad*/ angle) {

    this.Angle = angle;

    if (this.Angle > Math.PI * 2)
    {
        this.Angle -= Math.PI * 2;
    }

    return this;

};



/*
 * MouseHover
 * !no rotation
 * Check if mouse is over
 * DA RIMUOVERE *********************************************************
*/
Duedo.GraphicObject.prototype.MouseHover = function () {

    if( this.Renderable === false )
    {
        return false;
    }

    return this.Game.InputManager.Mouse.Intersects(this);

};



/*
 * Draw
*/
Duedo.GraphicObject.prototype.Draw = function () {
  //throw 'Duedo.GraphicObject.draw not implemented';
};



/*
 * SuperUpdate
 * @public
*/
Duedo.GraphicObject.prototype.SuperUpdate = function(deltaT) {
};




/*
 * Animate
 * Animate a property or a set of properties
 * @AffectedProperties: the target property ( can be an object as: Location: {X:200, Y:20} )
 * @Duration _number: duration of this animation
 * @Tweening _string: EaseIn, EaseOut, Quadratic, etc
*/
Duedo.GraphicObject.prototype.Animate = function (AffectedProperties, Duration, Tweening, name) {
    return this.AnimationManager.Animate( AffectedProperties, Duration, Tweening, name);
};
/*
 * UpdateAnimations
 * @deltaT = deltaT main loop
*/
Duedo.GraphicObject.prototype.UpdateAnimations = function ( deltaT ) {
    return this.AnimationManager.Update( deltaT );
};

Duedo.GraphicObject.prototype.StopAnimations = function(complete) {
    return this.AnimationManager.StopAll(complete);
};

Duedo.GraphicObject.prototype.PauseAnimations = function() {
    return this.AnimationManager.PauseAll();
};

Duedo.GraphicObject.prototype.ResumeAnimations = function() {
    return this.AnimationManager.ResumeAll();
};
/*
 * Animating
 * Is object animating?
 * FIX: E SE E' IN PAUSA???
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "Animating", {

    get: function () {
        return this.AnimationManager.Animations.length > 0;
    }

});



/*
 * Rotation
 * @public
 * Set the rotation angle in radians
*/
Object.defineProperty(Duedo.GraphicObject.prototype, 'Rotation', {

    get: function() {
        return this._Rotation;
    },

    set: function(value) {
        this._Rotation = /*radians*/ value;
    }

});



/*
 * Z
 * Represent the z plane of this graphic object
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "Z", {
    
    get:function() {
        return this._Z;
    },

    set: function(value) {
        
        if(this._Z === value)
            return;

        this._Z = Number(value);

        /*So we need to sort planes by Z before render*/
        this.Game.Renderer.SortPlanes = true;
        
            
    }

});




/*
 * Interactive
 * Set this object as interactive, then can be dragged, clicked...
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "Interactive", {

    set: function (bool) {

        if (bool === true) {
            this._Interactive = this.Game.InputManager.InteractivityManager.Add(this);
        }
        else {
            this._Interactive = this.Game.InputManager.InteractivityManager.Remove(this);
        }

    },


    get: function () {
        return this._Interactive;
    }

});



/*
 * Draggable
 * @public
 * Set this sprite as draggable
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "Draggable", {


    set: function (bool) {

        if (bool === true) {
            if (!this.Interactive)
                this.Interactive = true;

            this._Draggable = true;
        }
        else {
            if (this.Interactive) {
                this._Draggable = false;
                this.Interactive = false;
            }
        }

    },


    get: function () {
        return this._Draggable;
    }
});

















/*
 * EnablePhysics
 * Makes this graphic object a physical object
*/
Object.defineProperty(Duedo.GraphicObject.prototype, "EnablePhysics", {

    set: function(bool) {
        
        if(!this.Game.PhysicsEngine)
            return;

        if(bool === true)
        {
            this.Body = new Duedo.Body(this.Game, this);
        }
        else
        {
            this.Body.Shape.InUse = false;
            this.Body = null;
        }
    },


    get: function() {
        return !Duedo.Utils.IsNull(this.Body);
    }

});



