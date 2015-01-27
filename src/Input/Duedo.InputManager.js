/*
==========================================
Duedo.InputManager
Author: http://www.edoardocasella.it

Notes:
Manage keyboard and mouse input
==========================================
*/

Duedo.InputManager = function(gameContext) {
    this.Game = gameContext || Duedo.Global.Games[0];
    
    this.Enabled;
    
    /*Keyboard*/
    this.Keyboard;
    
    /*Mouse*/
    this.Mouse;
    this.RecordMouseHistory = false;
    this.HistoryPushRate = 0.5;
    this.HistoryRecordLimit = 10;
    
    //Mouse graphic pointer: cursor {@image}
    this.MouseGPointer = null;
    this.MouseGPointerDim = new Duedo.Dimension(20, 20);

    //InteractivityManager
    this.InteractivityManager;

    this._init();
};



/*
 * _init
 * @private
 * Boot input manager listeners
*/
Duedo.InputManager.prototype._init = function() {

    if(Duedo.Utils.IsNull(this.Game))
    {
        throw "Duedo.InputManager._init: missing game context";
    }

    this.Enabled = true;

    //Keyboard handler
    this.Keyboard = new Duedo.Keyboard(this.Game);
    //Mouse handler
    this.Mouse = new Duedo.Mouse(this.Game, this);
    /*Interactivity manager*/
    this.InteractivityManager = new Duedo.InteractivityManager(this.Game);

};



/*
 * Update
 * @public
 * Update handler
*/
Duedo.InputManager.prototype.Update = function(deltaT) {

    if(!this.Enabled)
        return;
    
    /*Update keyboard*/
    this.Keyboard.Update(deltaT);
    /*Update mouse*/
    this.Mouse.Update(deltaT);
    /*Update user interactions*/
    this.InteractivityManager.Update(deltaT);

};



/*
 * PostUpdate
 * @public
 * PostUpdate handler
*/
Duedo.InputManager.prototype.PostUpdate = function (deltaT) {
    this.Mouse.PostUpdate(deltaT);
    this.InteractivityManager.PostUpdate(deltaT);
};



/*
 * DisconnectAll
 * @public
 * Disconnect all input handlers
*/
Duedo.InputManager.prototype.DisconnectAll = function() {

    this.Keyboard.Disconnect();
    this.Mouse.Disconnect();

};



/*
 * BindKey
 * @public
 * Bind an event to a key
 * @param e: event (onkeyp, onkeydown)
 * @param k: Duedo keycode (see Duedo.Keyboard.js)
 * @param c: function event
 * #TODO
*/
Duedo.InputManager.prototype.BindKey = function (e, k, c) {

    //this.Keyboard.BindKey(e, k, c);

};

