/*
==========================================
Duedo.Cache
Author: http://www.edoardocasella.it

Notes:
This is where all the buffered data is stored
==========================================
*/

Duedo.Cache = function(gameContext) {
	this.Game = gameContext || Duedo.Global.Games[0];

	this._Data = {
		_Sounds:  {},
		_Images:  {},
		_JSON:    {},
		_Txt:     {}
	};
	

	this.Total  = 0;

};


/*Constructor*/
Duedo.Cache.prototype.constructor = Duedo.Cache;


/*
 * AddSound
*/
Duedo.Cache.prototype.AddSound = function( bufferedData, name ) {

	if(Duedo.Utils.IsNull(bufferedData) || Duedo.Utils.IsNull(name))
	{
		throw "Duedo.Cache.AddSound: undefined sound " + name;
	}

	this._Data._Sounds[name] = bufferedData;

	this.Total++;

	return bufferedData;
};


/*
 * Get
 * Return a cached object
 * Slow. Better to use the specific function: like GetSound for sounds etc...
*/
Duedo.Cache.prototype.Get = function (name) {
	
	for (var i in this._Data)
		if (!Duedo.Utils.IsNull(this._Data[i][name]))
			return this._Data[i][name];

	return null;
};


/*
 * GetSound
*/
Duedo.Cache.prototype.GetSound = function( name ) {

	return this._Data._Sounds[name];

};


/*
 * RemoveSound
*/
Duedo.Cache.prototype.RemoveSound = function( name ) {

	delete this._Data._Sounds[name];
	this.Total--;
};


/*
 * AddImage
*/
Duedo.Cache.prototype.AddImage = function( bufferedData, name ) {

	if(Duedo.Utils.IsNull(bufferedData) || Duedo.Utils.IsNull(name))
	{
		throw "Duedo.Cache.AddImage: undefined image " + name;
	}

	this._Data._Images[name] = bufferedData;

	this.Total++;

	return bufferedData;

};



/*
 * GetImage
*/
Duedo.Cache.prototype.GetImage = function( name ) {

	return this._Data._Images[name];

};


/*
 * RemoveImage
*/
Duedo.Cache.prototype.RemoveImage = function( name ) {

	delete this._Data._Images[name];
	this.Total--;
};


/*
 * AddJSON
*/
Duedo.Cache.prototype.AddJSON = function( bufferedData, name ) {

	if(Duedo.Utils.IsNull(bufferedData) || Duedo.Utils.IsNull(name))
	{
		throw "Duedo.Cache.AddJSON: undefined JSONData " + name;
	}

	this._Data._JSON[name] = bufferedData;

	this.Total++;

	return bufferedData;

};



/*
 * GetJSON
*/
Duedo.Cache.prototype.GetJSON = function( name ) {
		
	return this._Data._JSON[name];

};



/*
 * RemoveJSON
*/
Duedo.Cache.prototype.RemoveJSON = function( name ) {

	delete this._Data._JSON[name];
	this.Total--;
};


/*
 * AddTxt
*/
Duedo.Cache.prototype.AddTxt = function( bufferedData, name ) {

	if(Duedo.Utils.IsNull(bufferedData) || Duedo.Utils.IsNull(name))
	{
		throw "Duedo.Cache.AddTxt: undefined txt " + name;
	}

	this._Data._Txt[name] = bufferedData;

	this.Total++;

	return bufferedData;

};


/*
 * GetTxt
*/
Duedo.Cache.prototype.GetTxt = function( name ) {
	
	return this._Data._Txt[name];

};



/*
 * RemoveTxt
*/
Duedo.Cache.prototype.RemoveTxt = function( name ) {

	delete this._Data._Txt[name];
	this.Total--;
};



/*
 * Destroy
 * Destroy all the cache contents
*/
Duedo.Cache.prototype.Destroy = function() {

	for (var i in this._Data._Sounds)
	{
		delete this._Data._Sounds[i];
	}

	for (var i in this._Data._Images)
	{
		delete this._Data._Images[i];
	}

	for (var i in this._Data._JSON)
	{
		delete this._Data._JSON[i];
	}

	for (var i in this._Data._Txt)
	{
		delete this._Data._Txt[i];
	}


	this.Total = 0;

};