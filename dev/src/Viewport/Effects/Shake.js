
/**
 * Duedo Viewport's shake effect
 * @param {*} gameContext 
 * @param {*} Viewport 
 * @param {*} options 
 * @returns 
 */


Duedo.ViewportEffectShake = function ( gameContext, Viewport, options ) {
  Duedo.ViewportEffect.call(this, gameContext, Viewport);

  this._ElapsedTim;
  this.OriginalPosition;

	return this._init(options);
};


Duedo.ViewportEffectShake.prototype = Object.create(Duedo.ViewportEffect.prototype);
Duedo.ViewportEffectShake.prototype.constructor = Duedo.ViewportEffectShake;

/**
 * Init
 * Initialize effect
 * @param {*} options 
 */
Duedo.ViewportEffectShake.prototype._init = function(options = {}) {
  this._ElapsedTime = 0;
  this.OriginalPosition = this.Viewport.Location.Clone();
  this.Duration = options.Duration != null ? options.Duration : 0.5;
  this.Magnitude = options.Magnitude != null ? options.Magnitude : new Duedo.Vector2(0, 0);
}

/**
 * Update effect
 * @param {*} deltaT 
 * @returns 
 */
Duedo.ViewportEffectShake.prototype.Update = function(deltaT) {

		if(this._ElapsedTime < this.Duration) {
			this._ElapsedTime += deltaT;
			const offset = new Duedo.Vector2(
				Duedo.Utils.RandInRange(-0.2, 0.2) * this.Magnitude.X * deltaT,
				Duedo.Utils.RandInRange(-0.2, 0.2) * this.Magnitude.Y * deltaT
			)
			this.Viewport.View.Location.Add(offset);
		} else {
      // Return the camera to its initial position
      this.Viewport.SetPosition(this.OriginalPosition.X, this.OriginalPosition.Y);
			return false;
		}

    return true;
}

