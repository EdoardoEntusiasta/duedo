/*
==============================
Duedo.ComicScene
Author: http://www.edoardocasella.it

Notes:
==============================
*/

Duedo.ComicScene = function() {

	this.Name;
	this.Index;
	this.Duration;
	this._ElapsedTime;
	this.Paused;
	this._Children = [];

};


//ADD: alpha, graphic object, etc... per le transizioni per esempio...


Duedo.ComicScene.prototype.Add = function(child) {
	this._Children.push(child);
	this._SortChildrenByZ();
};


Duedo.ComicScene.prototype.SceneEnded = function() {

	//Check if scene is ended
	if(this._ElapsedTime >= this.Duration)
	{
		return true;
	}

	return false;

};


/*
 * _SortByZ
 * @private
*/
Duedo.ComicScene.prototype._SortChildrenByZ = function() {
	Duedo.Utils.SortArrayAscending(this._Children, "Z");
};


/*
 * PreUpdate
*/
Duedo.ComicScene.prototype.PreUpdate = function(dt) {

	if(this.Paused)
		return;

	this._ElapsedTime += dt;


	for(var i = this._Children.length - 1; i >= 0; i--)
	{
		child = this._Children[i];

		if(!child.InUse)
		{
			this._Children.splice(i, 1);
			continue;
		}
		else
		{
			if(!Duedo.Utils.IsNull(child["PreUpdate"]))
			{
				child.PreUpdate(dt);
			}
		}
	}

};


/*
 * Update
*/
Duedo.ComicScene.prototype.Update = function(dt) {

	if(this.Paused)
		return;

	for(var i = this._Children.length - 1; i >= 0; i--)
	{
		child = this._Children[i];

		if(!child.InUse)
		{
			this._Children.splice(i, 1);
			continue;
		}
		else
		{
			if(!Duedo.Utils.IsNull(child["Update"]))
			{
				child.Update(dt);
			}
		}
	}


};


/*
 * PostUpdate
*/
Duedo.ComicScene.prototype.PostUpdate = function(dt) {

	if(this.Paused)
		return;

	for(var i = this._Children.length - 1; i >= 0; i--)
	{
		child = this._Children[i];

		if(!child.InUse)
		{
			this._Children.splice(i, 1);
			continue;
		}
		else
		{
			if(!Duedo.Utils.IsNull(child["PostUpdate"]))
			{
				child.PostUpdate(dt);
			}
		}
	}


};


/*
 * Draw
*/
Duedo.ComicScene.prototype.Draw = function() {

	ctx.save();
	ctx.Alpha = this.Alpha;



	ctx.restore();

};