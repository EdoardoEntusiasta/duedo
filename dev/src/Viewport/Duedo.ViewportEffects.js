

Duedo.ViewportEffect = function ( gameContext, Viewport ) {
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Viewport = Viewport;
	return this._init();
};

Duedo.ViewportEffect.prototype.constructor = Duedo.ViewportEffect;


Duedo.ViewportEffect.prototype._init = function() {}


Duedo.ViewportEffect.prototype.PreUpdate = function() {}

Duedo.ViewportEffect.prototype.Update = function() {}

Duedo.ViewportEffect.prototype.PostUpdate = function() {}


