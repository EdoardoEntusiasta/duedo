/*
==============================
Duedo.InteractiveObjects
Author: http://www.edoardocasella.it

Notes:
Stores, serves and manage all the input-interactive objects
Can use a quadtree

Notes:
------------------------------------------------------------------
How to, ex:
myGraphicObject.Interactive = true;
myGraphicObject.OnPointerUp = myfunction;

--- @Mouse events:
- OnPointerUp
- OnPointerDown
- OnPointerMove
- OnPointerOn
- OnDragging
--- @Bool
- Draggable {def: false}
- DragVertical {def: true}
- DragOrizontal {def: true}
- DragBringToTop {def: true}
- DragScale {def:1}
- DragMinAlpha {def: 0.5}

For more complete informations: Duedo.InteractiveProperties.js
------------------------------------------------------------------

Note: To use a QUADTREE use the function UseQuadTree( @quadtree q );

==============================
*/

Duedo.InteractivityManager = function(gameContext) {
	this.Game = gameContext || Duedo.Global.Games[0];

	//A little cache
	this._Cache = {};

	//Setup
	this.DragButton = Duedo.Mouse.LEFT_BUTTON;

	this.Empty = true;

	/*
	 * InteractiveObjects collection
	 * @static public
	*/
	this.Collection;

	/*
	 * Use a quadtree
	 * (too much interactive objects)
	*/
	this.QuadTree;
	/*
	 * @bool: Is this manager active?
	*/
	this.Active;

	/*
	 * TODO The collection has been altered? (additon, removal..) 
	*/
	this._Altered = false;

	/*
	* Drag
	* @private
	*/
	this._HookedObject;
	this._LastOvered;
	this._DragMouseLastLocation = null;
	this._Dragging = false;
	this._PointerWasDownOut = false;


	/*Manager events*/
	/*
	* When the pointer is down
	* on a non-interactive part
	*/
	this.OnPointerDownOut = null;
	this.OnPointerUpOut = null;

	//Initialize
	this._Init();
};


/*
=====================
_Init
@private
=====================
*/
Duedo.InteractivityManager.prototype._Init = function() {

	this.Collection      = {Entities: []};
	this.Active          = true;
	this.Highest         = 0;
	this.Least           = 0;
	this.Pointers        = [];

};


/*
 * Use a quadtree
 * Requests the support of a quadtree
*/
Duedo.InteractivityManager.prototype.UseQuadTree = function (qt) {

	if (this.QuadTree) return;

	this.QuadTree = qt;

	/*Move old entities to the new quadtree*/
	if (this.Collection["Entities"].length)
		for (var i = this.Collection["Entities"].length - 1; i >= 0; i--) {
			this.QuadTree.Add(this.Collection["Entities"][i]);
			this.Collection["Entities"].splice(i, 1);
		}
};


/*
=====================
AddPointer
@private
=====================
*/
Duedo.InteractivityManager.prototype.AddPointer = function(pointer) {
	this.Pointers.push(pointer);
};


/*
=====================
Update
@public
=====================
*/
Duedo.InteractivityManager.prototype.Update = function(dt) {

	if (this.Empty) return;

	//Update the quadtree
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FIX:
	if (this.QuadTree) this.QuadTree.Update();

	var Pointer = this.Game.InputManager.Mouse;

	//We have or had a dragged object
	if (this._HookedObject) {
		if(!Pointer.IsDown(this.DragButton)) {
			Pointer.Dragging = false;

			if (this._HookedObject.OnPointerUp)
				this._HookedObject.OnPointerUp.call(this._HookedObject);

			if (typeof this._HookedObject._Cache['OriginalZValue'] != "undefined")
			{
				this._HookedObject.Z = this._HookedObject._Cache['OriginalZValue'];
				delete this._HookedObject._Cache['OriginalZValue'];
			}

			this._HookedObject.LeftClicked = false;



			this._HookedObject._Dragging = false;
			this._HookedObject = null;
			this._DragMouseLastLocation = null;

		}
		else
		{
			if(Pointer.IsMoving)
				this._UpdateDragging();
			else this._HookedObject._Dragging = false;
		}

	}
	else
	{
		this._UpdatePointerInteractions(Pointer);
	}



	return this;

};



/*
 ======================
 ToCameraCoord
 @public
 @Support function
 ======================
*/
Duedo.InteractivityManager.prototype.ToCameraCoord = function (o) {
	return new Duedo.Rectangle(o.Location.Clone().Add(this.Game.Camera.View.Location), 1, 1);
};



/*
=====================
_UpdatePointerInteractions
@private
=====================
*/
Duedo.InteractivityManager.prototype._UpdatePointerInteractions = function (ptr) {

	if (Duedo.Utils.IsNull(ptr))
		return;

	/*Get interactive objects*/
	var obs = this.GetAll(
		this.ToCameraCoord(ptr));

	var Pointer = ptr;
	/*FIX: Sort only when altered*/
	//if (this._Altered) {
		this._Cache["SortedByZ"] = this._SortElements(obs, "RenderOrderID");
		this._Altered = false;
    //}
	for (var i in this._Cache["SortedByZ"]) {
		var obj = this._Cache["SortedByZ"][i];

		if (!obj.InteractionEnabled)
			continue;

		if (obj.ParentState == this.Game.StateManager.CurrentState() || obj.ParentState == -1)
		{
			this._TriggerEvents(obj, Pointer);
		}

	}


	/*Mouse down on a non-interactive element*/
	if (Pointer.IsDown(this.DragButton)) {
		this._PointerWasDownOut = true;
		if (this.OnPointerDownOut)
			this.OnPointerDownOut.call(this._HookedObject);
	}

	/*Mouse up on non-interactive element*/
	if (this._PointerWasDownOut && !Pointer.IsDown(this.DragButton))
	{
		this._PointerWasDownOut = false;
		if (this.OnPointerUpOut)
			this.OnPointerUpOut.call(this);
	}


	return;

};



/**
 * _TriggerEventss
 */
Duedo.InteractivityManager.prototype._TriggerEvents = function(obj, Pointer) {
	
		if (Pointer.Intersects(obj)) {
			
			if (this._LastOvered != null && this._LastOvered != obj) {
				this._OnPointerOut(this._LastOvered);
				// Propagate
				if(obj.PropagateEvents) {
					let next = this._LastOvered.Parent;
					while(next) {
						this._OnPointerOut(next);
						next = next.Parent;
					}
				}
			}

			this._LastOvered = obj;

			//Mouse was clicked elsewhere
			if (Pointer.IsDown(Duedo.Mouse.LEFT_BUTTON) && !obj._PointerWasOver) {
				return;
			}

			if (!Duedo.Vector2.Compare(Pointer.Location, Pointer.LastLocation)) {
				if (obj.OnPointerMove) {
					obj.OnPointerMove.call(obj);
				}
				// Propagate
				if(obj.PropagateEvents) {
					let next = obj.Parent;
					while(next) {
						if(next.OnPointerMove) {
							next.OnPointerMove.call(next);
						}
						next = next.Parent;
					}
				}
			}

			//OnPointerOn
			if (obj.OnPointerOn && !obj._OnPointerOnCalled) {
				obj.OnPointerOn.call(obj);
				obj._OnPointerOnCalled = true;
				// Propagate
				if(obj.PropagateEvents) {
					let next = obj.Parent;
					while(next) {
						if(next.OnPointerOn) {
							next.OnPointerOn.call(next);
							next._OnPointerOnCalled = true;
						}
						next = next.Parent;
					}
				}
			}

			//First: MouseHover
			obj.MouseIsOver = true;
			obj._PointerWasOver = true;
			
			// Propagate
			if(obj.PropagateEvents) {
				let next = obj.Parent;
				while(next) {
					next.MouseIsOver = true;
					next._PointerWasOver = true;
					next = next.Parent;
				}
			}


			// Clicked
			if (!Pointer.IsDown(Duedo.Mouse.LEFT_BUTTON) && obj.LeftClicked) {
				obj.LeftClicked = false;
				if (obj.OnClick)
					obj.OnClick.call(obj);
				// Propagate
				if(obj.PropagateEvents) {
					let next = obj.Parent;
					while(next) {
						next.LeftClicked = false;
						if(next.OnClick) {
							next.OnClick.call(next);
						}
						next = next.Parent;
					}
				}
			}

			if (Pointer.IsDown(Duedo.Mouse.LEFT_BUTTON) && !obj.LeftClicked) {
				obj.LeftClicked = true;
				if (obj.OnPointerDown)
					obj.OnPointerDown.call(obj);
				// Propagate
				if(obj.PropagateEvents) {
					let next = obj.Parent;
					while(next) {
						next.LeftClicked = true;
						if(next.OnPointerDown) {
							next.OnPointerDown.call(next);
						}
						next = next.Parent;
					}
				}
			}


			if (Pointer.IsDown(Duedo.Mouse.RIGHT_BUTTON) && !obj.RightClicked) {
				obj.RightClicked = true;
				if (obj.OnRightClick)
					obj.OnRightClick.call(obj);
				// Propagate
				if(obj.PropagateEvents) {
					let next = obj.Parent;
					while(next) {
						next.RightClicked = true;
						if(next.OnRightClick) {
							next.OnRightClick.call(next);
						}
						next = next.Parent;
					}
				}
			}


			if (Pointer.IsDown(this.DragButton)) {
				if (obj.Draggable) {
					this._HookedObject = obj;
					this._HookedObject.Pointer = Pointer;
					this._HookedObject._Dragging = true;
					Pointer.Dragging = true;
				}
			}

			return;
		}
		else
		{
			if (obj._PointerWasOver)
			{
				this._OnPointerOut(obj);
				// Propagate
				if(obj.PropagateEvents) {
					let next = obj.Parent;
					while(next) {
						this._OnPointerOut(next);
						next = next.Parent;
					}
				}
			}
		}

}



/*
 * PostUpdate
 * Main PostUpdate
*/
Duedo.InteractivityManager.prototype.PostUpdate = function () {

	/*Post update dragging*/
	if (this._HookedObject && this._HookedObject._Dragging) {
		if (Duedo.IsFunc(this._HookedObject.OnDragging))
			this._HookedObject.OnDragging.call(this._HookedObject);
	}

};



/*
=====================
_OnPointerOut
@private
=====================
*/
Duedo.InteractivityManager.prototype._OnPointerOut = function (obj) {

	obj._PointerIsOver = false;
	obj._PointerWasOver = false;
	obj.LeftClicked = false;
	obj.RightClicked = false;
	obj._OnPointerOnCalled = false;

	if (obj.OnPointerOut)
		obj.OnPointerOut.call(obj);

};



Duedo.InteractivityManager.prototype._SortElements = function (obs, by) {
	obs = Duedo.Utils.SortArrayDescending(obs, by);
	/*ADD/FIX: se pi� oggetti hanno lo stesso Z chi viene usato per prima? Stessa cosa nel renderer*/
	return obs;
};



/*
=====================
_UpdateDragging
@private
=====================
*/
Duedo.InteractivityManager.prototype._UpdateDragging = function () {

	if (this._HookedObject.Body)
		return;

	var obj   = this._HookedObject,
		Pointer = obj.Pointer;


	Pointer.Dragging = true;

	if (!this._DragMouseLastLocation)
		if (!Duedo.Vector2.Compare(this._DragMouseLastLocation, Pointer.Location))
			this._DragMouseLastLocation = Pointer.Location.Clone();


	if (obj.DragBringToTop && typeof obj._Cache['OriginalZValue'] == "undefined")
	{
		obj._Cache['OriginalZValue'] = obj.Z;
		obj.Z = this.Game.Renderer.MaxZPlane + 1;
	}

	//Calculate drag vector
	var DeltaMouse = Pointer.Location.Clone().Subtract(this._DragMouseLastLocation);
	var DirVector = DeltaMouse.MultiplyScalar(obj.DragScale);


	//Check axis motion
	if (!obj.DragVertical) {
		DirVector.X = 0;
	}

	if (!obj.DragHorizontal) {
		DirVector.Y = 0;
	}

	//Update coordinates
	DirVector.DivideScalar(Duedo.Conf.PixelsInMeter);

	if (obj.FixedToViewport) {
		obj.ViewportOffset.Add(DirVector);
	}
	else if (obj["Offset"]) {
        /*Child element*/
	    obj.Offset.Add(DirVector);
	}
	else
	{
		obj.Location.Add(DirVector);
	}

	//Keeps track of the last position of the pointer
	this._DragMouseLastLocation = Pointer.Location.Clone();

	obj._Dragging = true;

};




/*
 * Add
 * @public
 * Add an object to the current list
*/
Duedo.InteractivityManager.prototype.Add = function(object) {

	Object.ExtendDeeply(object, Duedo.InteractiveProperties);

	if (this.QuadTree) {
	    this.QuadTree.Add(object);
	}
	else
	    this.Collection["Entities"].push(object);

	this.Empty = false;
	this._Altered = true;

	return object;

};



/*
 * Remove
 * @public
 * Remove an object from the interactivity manager
*/
Duedo.InteractivityManager.prototype.Remove = function (obj) {

	if (!obj) return false;

	var index = this.Collection['Entities'].indexOf(obj);
	if (index != -1)
		this.Collection['Entities'].splice(index, 1);

	if (this.Collection['Entities'].length == 0)
		this.Empty = true;

	this._Altered = true;

	return false;
};



/*
 * GetAll
 * @public
 * Return all the interesting objects
 * @param optional pointer: a pointer
*/
Duedo.InteractivityManager.prototype.GetAll = function(pointer){

	if (this.QuadTree)
		return this.QuadTree.Retrieve(pointer);

	return this.Collection["Entities"];

};



/*
 * IsValidTarget
 * @public
 * Is this object valid for interactions?
*/
Duedo.InteractivityManager.prototype.IsValidTarget = function (obj) {

	if (obj.Scale.X === 0 || obj.Scale.Y === 0)
		return false;

	if (obj.Alpha < this.DragMinAlpha)
		return false;

	return true;

};




/*
Duedo.InteractiveObjects.prototype.GetHighestPriorityObject = function() {

	var cState = this.Game.StateManager.CurrentState();

	var Collection = this.Collection;

	if (Duedo.Null(Collection[cState]))
		return null;

	var Higher     = Collection[cState][0];

	//Omit items that do not belong to the current state
	for(var i in Collection)
	{
		if(Collection[cState][i].RenderOrderID > Higher.RenderOrderID)
			Higher = Collection[cState][i];
	}

	return (this.Higher = Higher);

};


Duedo.InteractiveObjects.prototype.GetLeastPriorityObject = function() {

	var Collection = this.Collection;

	var cState = this.Game.StateManager.CurrentState();

	if (Duedo.Null(Collection[cState]))
		return null;

	var Least = Collection[cState][0];

	//Omit items that do not belong to the current state
	for(var i in Collection[cState])
	{
		if(Collection[cState][i].RenderOrderID < Least.RenderOrderID)
			Least = Collection[cState][i];
	}

	return this.Least = Least;
};

*/
