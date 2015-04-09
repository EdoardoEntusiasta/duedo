/*
==============================
Duedo.World
Author: http://www.edoardocasella.it
==============================
*/

Duedo.World = function ( gameContext, WWMaxX, WWMaxY ) {
    this.Game = gameContext || Duedo.Global.Games[0];
    Duedo.GraphicObject.call(this);

    this.Type = Duedo.WORLD;
    this.Bounds;

    this._init(gameContext, WWMaxX, WWMaxY);
};



/*Inherit generic object*/
Duedo.World.prototype = Object.create(Duedo.GraphicObject.prototype);
Duedo.World.prototype.constructor = Duedo.World;



/*
 * _init
 * @private
*/
Duedo.World.prototype._init = function (game, WWMaxX, WWMaxY) {
    this._super();

    /*Create world bounds*/
    this.Bounds = new Duedo.Rectangle(
        new Duedo.Vector2(0, 0), 
        WWMaxX || this.Game.Renderer.Canvas.width, 
        WWMaxY || this.Game.Renderer.Canvas.height
    );


    
    return this;

};




/*
 * Update
 * @public
*/
Duedo.World.prototype.Update = function (deltaT) {

    /*"This" animations*/
    this.UpdateAnimations(deltaT);
    
    return this;

};




/*
 * Center
*/
Object.defineProperty(Duedo.World.prototype, "Center" , {

    get: function() {
        return new Duedo.Vector2(this.Bounds.Width / 2, this.Bounds.Height / 2);
    },

});



/*
 * RandomX
*/
Object.defineProperty(Duedo.World.prototype, "RandomX", {

    get: function() {
        return Duedo.Utils.RandInRange(0, this.Bounds.Width);
    }

});



/*
 * RandomY
*/
Object.defineProperty(Duedo.World.prototype, "RandomY", {

    get: function() {
        return Duedo.Utils.RandInRange(0, this.Bounds.Height);
    }

});



/*
 * RandomVector2
*/
Object.defineProperty(Duedo.World.prototype, "RandomVector2", {

    get: function() {
        return new Duedo.Vector2(this.RandomX, this.RandomY);
    }

});


/*
 * World width
*/
Object.defineProperty(Duedo.World.prototype, "Width", {

    get: function () {
        return this.Bounds.Width;
    }

});


/*
 * World height
*/
Object.defineProperty(Duedo.World.prototype, "Height", {

    get: function () {
        return this.Bounds.Height;
    }

});



























