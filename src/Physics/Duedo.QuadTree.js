/*
==========================================
QuadTree
Author: http://www.edoardocasella.it
Initially based on http://gamedevelopment.tutsplus.com/tutorials/quick-tip-use-quadtrees-to-detect-likely-collisions-in-2d-space--gamedev-374


Places a Duedo Object that has a Location vector and a dimension (.Width, .Height) inside a quadtree grid

==========================================
*/


/*
 * How to:
 * Instantiate and use a new QuadTree: 
 * 
 * var q = new Duedo.QuadTree(mygame, 0, your-world-dimension-as-rectangle );
 *
*/
Duedo.QuadTree = function(gameContext, level, /*Duedo.Rectangle*/bounds) {
	this.Game = gameContext || Duedo.Global.Games[0];
	this.Type = Duedo.QUADTREE;

	/*how many objects a node can hold before it splits*/
	this.MaxObjects = 5;
	/*the deepest level subnode*/
	this.MaxLevels = 7;
	/*the current node level (0 being the topmost node)*/
	this._Level = 0;
	/*the 2D space that the node occupies*/
	this._Bounds;
	/*the four subnodes*/
	this._Nodes;
	/*objects list*/
	this._ObjectsList;
	/*Parent node*/
	this._ParentNode = null;
	/*The main node*/
	this._MainNode   = null;

	//Debug
	this.Debug = {
		StrokeStyle: "black"
	};

	this.__Connected = false;
	//Init
	this._Init(level, bounds);

};


//Counterclock regions
Duedo.QuadTree.TOP_RIGHT    = 0;
Duedo.QuadTree.TOP_LEFT     = 1;
Duedo.QuadTree.BOTTOM_LEFT  = 2;
Duedo.QuadTree.BOTTOM_RIGHT = 3;


/*
 * _Init
*/
Duedo.QuadTree.prototype._Init = function(level, bounds) {
	
	this._ObjectsList = [];
	this._Bounds = bounds || new Duedo.Rectangle(new Duedo.Vector2(0, 0), 0, 0);
	this._Level = level || 0;
	this._Nodes = [];
	this._MainNode = this;
};



/*
 * Connect
 * Add this quadtree to the main engine loop
*/
Duedo.QuadTree.prototype.Connect = function () {

	if (this.__Connected)
		return this;

	this.Game.Add(this);
	this.__Connected = true;
	return this;
};



/*
 * Clear
*/
Duedo.QuadTree.prototype.Clear = function() {
	
	this._ObjectsList = [];
	return this;

};




/*
 * _Split
 * Split the node into 4 subnodes
*/
Duedo.QuadTree.prototype._Split = function() {
	
	var subWidth  = this._Bounds.Width / 2;
	var subHeight = this._Bounds.Height / 2;

	var x = this._Bounds.Location.X;
	var y = this._Bounds.Location.Y;

	this._Nodes[0] = new Duedo.QuadTree(this.Game, this._Level + 1, new Duedo.Rectangle(new Duedo.Vector2(x + subWidth, y), subWidth, subHeight));
	this._Nodes[1] = new Duedo.QuadTree(this.Game, this._Level + 1, new Duedo.Rectangle(new Duedo.Vector2(x, y), subWidth, subHeight));
	this._Nodes[2] = new Duedo.QuadTree(this.Game, this._Level + 1, new Duedo.Rectangle(new Duedo.Vector2(x, y + subHeight), subWidth, subHeight));
	this._Nodes[3] = new Duedo.QuadTree(this.Game, this._Level + 1, new Duedo.Rectangle(new Duedo.Vector2(x + subWidth, y + subHeight), subWidth, subHeight));

	//Link parent node
	for (var i in this._Nodes) {
		this._Nodes[i]._ParentNode = this;
		this._Nodes[i]._MainNode = this._MainNode;
	}
	return this;
};



/*
 * GetIndex
 * Determine which node the object belongs to. -1 means
 * object cannot completely fit within a child node and is part
 * of the parent node
 */
Duedo.QuadTree.prototype.GetIndex = function(rect) {

	var index = -1;

	var midX = this._Bounds.Center.X;
	var midY = this._Bounds.Center.Y;

	//Rect is on top or bottom quadrants?
	var onTop     = rect.Location.Y < midY && rect.Location.Y + rect.Height < midY;
	var onBottom  = rect.Location.Y > midY;  
	
	if(rect.Location.X < midX && rect.Location.X + rect.Width < midX) {
		if(onTop)
			index = Duedo.QuadTree.TOP_LEFT;
		else if(onBottom) index = Duedo.QuadTree.BOTTOM_LEFT; 
	}
	else if(rect.Location.X > midX)
		if(onTop)
			index = Duedo.QuadTree.TOP_RIGHT;
		else if(onBottom)
			index = Duedo.QuadTree.BOTTOM_RIGHT;


	return index;

};


/*
 * Insert
 * Insert the object into the quadtree. If the node
 * exceeds the capacity, it will split and add all
 * objects to their corresponding nodes.
 */
Duedo.QuadTree.prototype.Insert = function(rect) {

	if(this.Null(rect))
		return this;

	if(this._HasChildNodes())
	{
		var index = this.GetIndex(rect);
		
		if (index !== -1) {
			this._Nodes[index].Insert(rect);
			/*the object retains a reference to its container*/
			rect.__QNode = this._Nodes[index];
			return;
		}
	}


	//Insert into the main list
	this._ObjectsList.push(rect);

	//... then check if we are in need of splitting the node
	if(this._ObjectsList.length > this.MaxObjects && this._Level < this.MaxLevels)
	{
		if(!this._HasChildNodes())
			this._Split();

		var i = 0;
		while(i < this._ObjectsList.length)
		{
			var index = this.GetIndex(this._ObjectsList[i]);

			if(index !== -1)
				this._Nodes[index].Insert(this._ObjectsList.splice(i, 1)[0]);
			else
				i++;
		}
	}


	return this;

};



Duedo.QuadTree.prototype.Add = Duedo.QuadTree.prototype.Insert;



/*
 * Null
 * Is this object null?
*/
Duedo.QuadTree.prototype.Null = function(obj) {
	return (obj === null || typeof obj === "undefined");	
};


/*
 * _HasChildNodes
 * Return true if this node contains child nodes
*/
Duedo.QuadTree.prototype._HasChildNodes = function() {
	return !this.Null(this._Nodes[0]);
};


/*
 * Retrieve
 * Return objects that can collide with @rect rect
*/
Duedo.QuadTree.prototype.Retrieve = function(rect) {

	var index = this.GetIndex(rect);
	var list = this._ObjectsList;

	if(this._HasChildNodes())
	{
		if(index !== -1)
		{
			list = list.concat(this._Nodes[index].Retrieve(rect));
		}
	}


	return list;

};



/*
 * Connected
 * Return true if this quadtree is inside the game loop (so affected by update logics)
*/
Object.defineProperty(Duedo.QuadTree.prototype, "Connected", {

	get: function () { return this.__Connected; }

});


/*IsEmpty*/
Object.defineProperty(Duedo.QuadTree.prototype, "IsEmpty", {
	
	get: function () {
		return (this._ObjectsList.length == 0);
	}

});

/*
 * Update
 * Update the quadtree for moving objects
*/
Duedo.QuadTree.prototype.Update = function () {

	for (var x = this._ObjectsList.length - 1; x >= 0; x--) {
		var ob = this.Remove(this._ObjectsList[x]);
		if(ob != null)
			this._MainNode.Insert(ob);
	}

	for (var i = this._Nodes.length - 1; i >= 0; i--) {
		this._Nodes[i].Update();
	}
};


/*
 * Remove
 * Remove an object from this node
*/
Duedo.QuadTree.prototype.Remove = function (obj) {

    var index = this._ObjectsList.indexOf(obj);
    if (index != -1)
        return this._ObjectsList.splice(index, 1)[0];
    else return null;
    
};


Duedo.QuadTree.prototype.__Remove = function (__obj) {
};


/*
 ==========================
 DRAWING METHODS
 ==========================
*/
/*
 * Draw
 * Draw this node
*/
Duedo.QuadTree.prototype.Draws = function(ctx) {

	this.DrawObjects(ctx);
	ctx.strokeStyle = "black";
	ctx.rect(this._Bounds.Location.X, this._Bounds.Location.Y, this._Bounds.Width, this._Bounds.Height);
	ctx.stroke();
	
	if (this._HasChildNodes())
		for (var i in this._Nodes)
			this._Nodes[i].Draws(ctx);
};


/*
 * DrawNode
*/
Duedo.QuadTree.prototype.DrawObjects = function(ctx) {

	var obj;
	
	ctx.strokeStyle = "black";

	for(var i = 0; i < this._ObjectsList.length; i++ ) {
		obj = this._ObjectsList[i];
		ctx.strokeRect(obj.Location.X, obj.Location.Y, 5, 5);
	}

	/*Total per node*/
	if(this == this._MainNode)
		ctx.strokeText(this._ObjectsList.length, this._Bounds.Location.X + 10, this._Bounds.Location.Y + 30);
	else
	ctx.strokeText(this._ObjectsList.length, this._Bounds.Location.X + 10, this._Bounds.Location.Y + 10);
	

};


/*
 * Draw
 * @static public
 * Draw a quadtree
*/
Duedo.QuadTree.Draw = function(qt, ctx) {
	qt.Draws(ctx);
};