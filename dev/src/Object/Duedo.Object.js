/*
==============================
Duedo.Object
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Object = function () {
    this.Id;

    /*
     Can be removed?
    */
    this.InUse = true;
    this.PendingDestroy = false;

    /*
     Parent object
    */
    this.Parent = null;

    /*
    Events
    */
    this._Triggers = {};

    /*
     * _LiveFor
     * @private
     * Use Object.LiveFor(time_ms) method
     * An object lives for a limited time (milliseconds)
    */
    this._LiveFor;

    /*
     Children
    */
    this.Children = [];

    /*
    Name
    */
    this.Name = "object";

    /*
     * BornTime
     * The time when the object is inserted into the loop
    */
    this.BornTime;

    /*
     * A little useful class
    */
    this.Cache = {};

};


Duedo.Object.prototype.constructor = Duedo.Object;




/*
 * LiveFor
 * An object lives for a limited time (milliseconds) : ex myobject.LiveFor(0.5);
 * @param ms: time
 * @param ondestroy: callback on destroy
*/
Duedo.Object.prototype.LiveFor = function (ms, ondestroy) {

    this._LiveFor = parseFloat(ms);

    if (!Duedo.Utils.IsNull(ondestroy))
        this.Bind("destroy", ondestroy)
};


/*
 * MustBeDead
 * Check graphicobject lifetime
 * Check if this object is still alive or must be dead and removed
*/
Duedo.Object.prototype.MustBeDead = function (game) {

    if (Duedo.Null(this.LiveFor) || Duedo.Null(this.BornTime))
        return false;

    if (game.ElapsedTime - this.BornTime > this._LiveFor)
        return true;

    return false;
};



/*
 * Destroy
 * Object will be removed the next frame
*/
Duedo.Object.prototype.Destroy = function () {

    this.PendingDestroy = true;
    this.InUse = false;

    return this;
};




/*
============================
 Binding
============================
*/

/*
 * Bind event
 * @eventName: string, name of the event
 * @callback: the callback function
*/
Duedo.Object.prototype.Bind = function (eventName, callback) {

    if ( typeof eventName !== "undefined" && typeof callback !== "undefined" )
    {
        eventName = eventName.toLowerCase();

        if ( typeof this._Triggers[eventName] === "undefined" )
        {
            this._Triggers[eventName] = new Array();
        }

        this._Triggers[eventName].push(callback);
    }

    return this;
};



Duedo.Object.prototype.Unbind = function (eventName) {
    // ! todo
};







/*
 * _CallTriggers
 * private
 * @eventName: string, name of the triggered event
*/
Duedo.Object.prototype._CallTriggers = function (eventName, caller) {

    eventName = eventName.toLowerCase();

    if( typeof this._Triggers[eventName] === "undefined" )
    {
        return;
    }

    for (var i in this._Triggers[eventName])
    {
        this._Triggers[eventName][i].call(Duedo.Utils.IsNull(caller) ? this : caller);
    }

    //[!] The events are retained after execution
    //Use ClearTriggers

    return this;

};






/*
 * ClearTriggers
 * Remove all the events attached to @eventName
 * @eventName: string, name of the triggered event
*/
Duedo.Object.prototype.ClearTriggers = function ( eventName ) {

    if( typeof eventName  === "undefined" || !eventName )
    {
        return this._Triggers = {};
    }
    else
    {
        if ( typeof this._Triggers[eventName] != "undefined" )
        {
            return this._Triggers[eventName] = new Array();
        }
           
    }

};








