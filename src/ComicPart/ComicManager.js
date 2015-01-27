/*
==============================
Duedo.ComicManager
Author: http://www.edoardocasella.it

Notes:
==============================
*/


Duedo.ComicManager = function() {

	this._Scenes = [];
	this._ActiveScene;
	this._LastActiveScene;
	this._PendingSceneChange = false;
	this._Running = true;

	this.Transition = "crossfade";
};

/*
 * AddAScene
*/
Duedo.ComicManager.prototype.Add = function(scene) {

	if(!scene instanceof Duedo.ComicScene)
		return;

	this._Scenes.push(scene);
	this.SortByIndex();
};


/*
 * _CallNextScene
*/
Duedo.ComicManager.prototype._CallNextScene = function() {
	
	var nextS = this._Scenes[this._ActiveScene.Index + 1];

	//Call next scene
	if(!Duedo.Utils.IsNull(nextS)) {
		this._LastActiveScene = this._ActiveScene;
		this._ActiveScene = nextS;
	}

	this._PendingSceneChange = false;

};


/*
 * PreUpdate
*/
Duedo.ComicManager.prototype.PreUpdate = function(dt) {

	if(!this._Running)
		return;

	if(this._PendingSceneChange)
		this._CallNextScene();

	if(!Duedo.IsNull(this._ActiveScene))
	{

		this._ActiveScene.PreUpdate.call(this, dt);

		if(this._ActiveScene.SceneEnded())
		{
			this._PendingSceneChange = true;
		}
	}

};


/*
 * Update
*/
Duedo.ComicManager.prototype.Update = function(dt){
	
	if(!this._Running)
		return;

	if(!Duedo.IsNull(this._ActiveScene))
	{
		this._ActiveScene.Update.call(this, dt);
	}

};


/*
 * PostUpdate
*/
Duedo.ComicManager.prototype.PostUpdate = function(dt) {

	if(!this._Running)
		return;

	if(!Duedo.IsNull(this._ActiveScene))
	{
		this._ActiveScene.PostUpdate.call(this, dt);
	}

};


/*
 * GetSceneByIndex
*/
Duedo.ComicManager.prototype.GetSceneByIndex = function(index) {
	this.SortByIndex();
	return this._Scenes[index];
};


/*
 * GetSceneByName
*/
Duedo.ComicManager.prototype.GetSceneByName = function(name) {

	for(var i in this._Scenes)
	{
		if(this._Scenes[i].Name === name)
			return this._Scenes[i];
	}

};


/*
 * OrderByIndex
*/
Duedo.ComicManager.prototype.SortByIndex = function() {
	Duedo.Utils.SortArrayAscending(this._Scenes, "Index");
};



/*
 * Draw
*/
Duedo.ComicManager.prototype.Draw = function(ctx) {



};



/*
 * Pause
*/
Object.defineProperty(Duedo.ComicManager.prototype, "Pause", {
	
	get: function() {
		return this._Running;
	},

	set: function(bool) {

		if(bool === true)
		{
			this._Running = false;
		}
		else
		{
			this._Running = true;
		}
	}
});