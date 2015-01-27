/*
==============================
Duedo.Debug.Storage
Author: http://www.edoardocasella.it
==============================
*/



Duedo.DebugStorage = function() {
	this.DebugInfoObjects = [];
}



/*
 * Add
 * @public
*/
Duedo.DebugStorage.prototype.Add = function( object ) {

	if(Duedo.Utils.IsNull(object))
	{
		return false;
	}


	this.DebugInfoObjects.push(object);

};



/*
 * PreUpdate
 * @public
*/
Duedo.DebugStorage.prototype.PreUpdate = function(dt) {

	for(var i = this.DebugInfoObjects.length - 1; i >= 0; i--)
	{
		var obj = this.DebugInfoObjects[i];

		if(!obj.InUse)
		{
			this.DebugInfoObjects.splice(i, 1);
			continue;
		}

		if(obj["PreUpdate"])
		{
			obj.PreUpdate(dt);
		}
	}

};



/*
 * Update
 * @public
*/
Duedo.DebugStorage.prototype.Update = function(dt){


	for(var i = this.DebugInfoObjects.length - 1; i >= 0; i--)
	{
		var obj = this.DebugInfoObjects[i];
		
		if(obj["Update"])
		{
			obj.Update(dt);
		}
	}


};



/*
 * PostUpdate
 * @public
*/
Duedo.DebugStorage.prototype.PostUpdate = function(dt) {

	for(var i = this.DebugInfoObjects.length - 1; i >= 0; i--)
	{
		var obj = this.DebugInfoObjects[i];
		
		if(obj["PostUpdate"])
		{
			obj.PostUpdate(dt);
		}
	}

};



/*
 * Clear
 * @public
 * Clear Debug.Storage info storage
*/
Duedo.DebugStorage.prototype.Clear = function() {

	for( var i in this.DebugInfoObjects)
	{
		delete this.DebugInfoObjects[i];
	}

};