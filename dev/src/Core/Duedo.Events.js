
/*
==============================
Duedo.EventsManager
Author: http://www.edoardocasella.it


WHAT DOES IT DO?
- Add a time-based event to the running game (like a sound or an animation or a generic function every 'n' time ---> 'n' can be a function too that returns a numeric value: ex myRandFunc())
- Add a "DoFor" event using mygame.Events.DoFor(myObject, "Color", "red", 1) <- the property will be modified for 1 second and the will return as the original


EVENT BINDABLE TRIGGERS:
- expired
==============================
*/
Duedo.Events = function(game) {
	Duedo.Object.call(this);
	this.Game = game || Duedo.Global.Games[0];
	this._DoForEvents;
	this._Cache;
	this._init();
};



/*Inherit object*/
Duedo.Events.prototype = Object.create(Duedo.Object.prototype);
Duedo.Events.prototype.constructor = Duedo.Events;

/*
 * _init
*/
Duedo.Events.prototype._init = function() {
    this.Children     = [];
    this._DoForEvents = [];
    this._Cache = [];
};



/*
 * Update
 * Main update loop
*/
Duedo.Events.prototype.Update = function( deltaT ) {

	for(var i = this.Children.length -1; i >= 0; i--)
	{

		var Event = this.Children[i];

		if(Duedo.Utils.IsNull(this.Game.StateManager.CurrentState()) || Event.ParentState !== this.Game.StateManager.CurrentState())
		{
			continue;
		}

		Event.ElapsedTime += deltaT;


		var CallTime = (typeof Event.Time === "function" ? Event.RepeatEvery : Event.Time);

		if(Event.ElapsedTime >= CallTime)
		{
			Event.ElapsedTime = 0;

			if(Event.RepeatEvery)
			{
				if(typeof Event.Time !== "function")
				{
					Event.Time = Event.RepeatEvery;
				}
				else
				{
					Event.RepeatEvery = Event.Time.call(this);
				}
			}

			if(!Duedo.Utils.IsNull(Event.Function))
			{
				Event.Function.call(this);
			}

			Event.Repeated++;

			if(Event.Expired())
			{
				/*Call related triggers*/
				Event._CallTriggers("expired");

				/*Remove the event*/
				this.Children.splice(i, 1);
				continue;
			}
		}
	}



	if (this._DoForEvents.length)
	    this._UpdateDoForEvents(deltaT);


};



/*
 * _UpdateDoForEvents
 * @private
 * Update all the _DoFor events
*/
Duedo.Events.prototype._UpdateDoForEvents = function (deltaT) {


    for (var i = this._DoForEvents.length - 1; i >= 0; i--)
    {
        var e = this._DoForEvents[i];

        e._ElapsedTime += deltaT;

        if(e._ElapsedTime >= e.Duration)
        {

            if (Duedo.IsFunc(e.Object))
                e.Object.call(this);
            else
            {
                e.Object[e.Prop] = e._OrigVal;

                //OnEnd callback
                if (!Duedo.Utils.IsNull(e.OnEnd))
                    e.OnEnd.call(e.Object);
            }

            this._DoForEvents.splice(i, 1);
        }
    }


};



/*
 * AddEvent
 * @name: name of the event
 * @func: function to call
 * @repeat: number of times this function will be called
 * @time: represent a time interval (among how many milliseconds does the action start?),
 	 this can be a custom function too that returns a value (ex. return Duedo.Utils.RandInRange(0, 60))
 * Used for: an event that occurs repeatedly or every a random time (ex, a distant explosion sound... or a ship that flies every 2 minutes...)
*/
Duedo.Events.prototype.AddEvent = function(name, func, repeat, time) {

	/*New time base event*/
	var Event = new Duedo.Event(this);

	Event.Name         = name   || "event" + this.Children.length;
	Event.Function     = func   || null;

	Event.Repeat       = repeat || 1;
	Event.Time         = time   || 0;

	if(Event.Repeat > 1)
	{
		if(typeof Event.Time === "function")
		{
			/*Were using a personalized function*/
			var CallTime = Event.Time.call(this);

			if(Duedo.Utils.IsNull(CallTime))
			{
				throw "Duedo.Events: your event function must return a value";
			}

			Event.RepeatEvery = Event.Time.call(this);
		}
		else
		{
			Event.RepeatEvery = Event.Time;
		}
	}

	Event.ParentState  = this.Game.StateManager.CurrentState();

	this.Children.push(Event);


	return Event;

};



/*
 * DoFor/DoBetween
 * @public
 * Modify a property for a limited time, then returns to the old value
 * @FIX: What happens if it is called several times with the same values?
 * ----- We can use the 'onend' callback to set a boolean on the affected object
 * Can be used with DoBetween too with those params:
 * @obj = function to call
 * @prop = how soon
 */
Duedo.Events.prototype.DoBetween = function (func, time) {
    return this.DoFor(func, time); //ex. mygame.Events.DoBetween(my_func, 0.5 seconds);
};

Duedo.Events.prototype.DoFor = function (obj, prop, val, time, onend) {

    var tEvent = false;

    if (!isNaN(prop)) {
        time = prop;
        tEvent = true;
    }

    /*DFE object*/
    var dfe = {
        Object: obj,
        Val: val,
        Duration: time,
        Prop: prop,
        OnEnd: onend,
        _OrigVal: obj[prop],
        _StartTime: this.Game.ElapsedTime,
        _ElapsedTime: 0
    };

    if (!tEvent)
        obj[prop] = val;

    /*Add the event to the stack*/
    this._DoForEvents.push(dfe);


    /*Return an event reference*/
    return dfe;
};



/*
 * RemoveDoForEvent
 * @public
 * Remove a DoFor or DoBetween event
 * @param: a dfe object reference (look at DoFor method)
*/
Duedo.Events.prototype.RemoveDoForEvent = function (dfe) {

    var index = this._DoForEvents.indexOf(dfe);
    if (index !== -1)
        return this._DoForEvents.splice(index, 1);

    return null;
};



/*
 * RemoveEvent
*/
Duedo.Events.prototype.RemoveEvent = function(name) {

	if(Duedo.Utils.IsNull(name))
	{
		return null;
	}

	if(name instanceof Object)
	{
		for(var i in this.Children)
		{
			if(this.Children[i] === name)
			{
				this.RemoveEvent(this.Children[i]);
				break;
			}
		}
	}
	else
	{
		for(var i in this.Children)
		{
			if(this.Children[i].Name === name)
			{
				return this.Children.splice(i, 1);
			}
		}
	}

};



/*
 * GetEvent
*/
Duedo.Events.prototype.GetEvent = function( name ) {

	for( var i in this.Children )
	{
		if(this.Children[i].Name === name)
		{
			return this.Children[i];
		}
	}

};










/*
==============================
Duedo.Event
==============================
*/
Duedo.Event = function(EventsManager) {
	Duedo.Object.call(this);
	this.Type = Duedo.EVENT;

	this.Parent = EventsManager || null;

	this.Name;
	this.Time;
	this.ElapsedTime;
	this.StartTime;
	this.Function;
	this.Repeat;
	this.Repeated;
	this.ParentState;

	this._init();
};


/*Inherit object*/
Duedo.Event.prototype = Object.create(Duedo.Object.prototype);
Duedo.Event.prototype.constructor = Duedo.Event;

/*
 * _init
*/
Duedo.Event.prototype._init = function() {

	this.Name        = "event" + this.Parent.Children.length;
	this.Time        = 0;
	this.StartTime   = this.Parent.Game.ElapsedTime;
	this.Function    = null;
	this.Repeat      = 1;
	this.Repeated    = 0;
	this.ElapsedTime = 0;


	return this;
};


/*
 * Repeat
*/
Duedo.Event.prototype.Repeat = function(times) {
	this.Repeat = times;
	return this;
};


/*
 * Expired
*/
Duedo.Event.prototype.Expired = function() {
	return (this.Repeated >= this.Repeat);
};
