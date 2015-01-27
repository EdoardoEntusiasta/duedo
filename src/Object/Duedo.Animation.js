/*
==============================
Duedo.Animation
Author: http://www.edoardocasella.it

 Animation bindable triggers
- complete
- progress
- start

==============================
*/



Duedo.Animation = function ( game, targetObject ) {
    Duedo.Object.call(this);
    this.Game = game || Duedo.Global.Games[0];

    this.AffectedObject = targetObject || null;
    this.Name;
    /*Time*/
    this.StartTime;
    this.Duration;
    this.ElapsedTime;
    this.TimeInterval;
    this.ActualTime;

    /*Tweening*/
    this.Tweening;
    this._Yoyo;
    this.YoyoRepeat = Infinity;
    this._YoyoRepeated = 0;

    /*Value progress*/
    this.LastValue;

    this._Data;
    this.Length = 0;
    /*Keep trace of the current animation status*/
    this._AnimStatus;
    this._Paused;
    this._PendingStop;
    this._CompleteOnStop;

    this._init();
};


/*Inherit generic object*/
Duedo.Animation.prototype = Object.create(Duedo.Object.prototype);
Duedo.Animation.prototype.constructor = Duedo.Animation;


/*
 * _init
*/
Duedo.Animation.prototype._init = function() {
    
    this.StartTime     = 0;
    this.Duration      = 0;
    this.ElapsedTime   = 0;
    this.TimeInterval  = 0;
    this.ActualTime    = 0;
    this.Tweening      = "Linear";
    this._PendingStop  = false;
    this._AnimStatus   = null;
    this._Paused       = false;
    this._Yoyo         = false;
    this._YoyoRepeated = 0;

    this._Data         = {};

    return this;
};


/*
Animation macros
*/
Duedo.Animation._ENDED_    = -1;
Duedo.Animation._PAUSED_   = 0;
Duedo.Animation._PROGRESS_ = 1;


/*
 * Main update
 * @public
*/
Duedo.Animation.prototype.Update = function (deltaT) {

    /*Paused*/
    if(this._Paused)
    {
        return this._AnimStatus = Duedo.Animation._PAUSED_;
    }

    /*Pending stop*/
    if(this._PendingStop)
    {
        if(this._CompleteOnStop)
        {
            this._CompleteAnimation();
        }
        else
        {
            return Duedo.Animation._ENDED_;
        }
    }

    /*Step animation*/
    if (Duedo.Utils.IsNull(deltaT) || deltaT <= 0)
    {
        return;
    }
    else
    {        
        return this._AnimStatus = this._Step(deltaT);
    }


};



/*
 * YoyoRepeat
 * @public
 * repeat the animation
*/
Duedo.Animation.prototype.Yoyo = function(times) {
    this._Yoyo = true;
    this.YoyoRepeat = times || Infinity;
};



/*
 * _Step
 * private
 * Advance animation
*/
Duedo.Animation.prototype._Step = function(deltaT) {

    var Progress;

    this.ActualTime += deltaT;
    
    /*Get ElapsedTime*/
    if(this.ElapsedTime < this.Duration) 
    {
        this.ElapsedTime = this.ActualTime - this.StartTime;
    }
    
    Progress = this.ElapsedTime / this.Duration;

    if(Progress > 1)
    {
        Progress = 1;
    }


    /*Duedo native easing function*/
    if(typeof this.Tweening === "string")
    {
        if(!Duedo.Utils.IsNull(Duedo.Easing[this.Tweening]))
        {
             Progress = Duedo.Easing[this.Tweening](Progress);
        }
        else
        {
            throw "Duedo.Animation._step: unrecognized easing algorithm " + this.Tweening;
        }
           
    }   
    /*Personalized easing function*/
    else if(typeof this.Tweening === "function")
    {
        Progress = this.Tweening(Progress);
    }
    

    var propCompleted = 0;

    /*Cycle through properties*/
    for(var prop in this._Data)
    {   
        if(Duedo.Utils.IsNull(this._Data[prop]["StartValue"]))
        {   
            for(var o in this._Data[prop])
            {
                this.AffectedObject[prop][o] = this._Data[prop][o].StartValue - (Progress * (this._Data[prop][o].StartValue - this._Data[prop][o].EndValue));
                if(this.AffectedObject[prop][o] === this._Data[prop][o].EndValue)
                    ++propCompleted;
            }
        }
        else
        {   
            this.AffectedObject[prop] = this._Data[prop].StartValue - (Progress * (this._Data[prop].StartValue - this._Data[prop].EndValue));
            if(this.AffectedObject[prop] === this._Data[prop].EndValue)
                ++propCompleted;
        }
    }


    if(this.ElapsedTime >= this.Duration || propCompleted === this.Length)
    {
        if(this._Yoyo)
        {
            
            if(this._YoyoRepeated >= this.YoyoRepeat)
                return Duedo.Animation._ENDED_;

            this._InvertAnimation();
            
            this._YoyoRepeated++;

            return Duedo.Animation._PROGRESS_;
        }
        else
        {
            return Duedo.Animation._ENDED_;
        }

    }
    else
    {
        return Duedo.Animation._PROGRESS_;
    }

};




/*
 * _InvertAnimation
 * Private
*/
Duedo.Animation.prototype._InvertAnimation = function() {

    for(var prop in this._Data)
    {
        if(Duedo.Utils.IsNull(this._Data[prop]["StartValue"]))
        {   
            for(var o in this._Data[prop])
            {
                var end = this._Data[prop][o].StartValue;
                this._Data[prop][o].StartValue = this._Data[prop][o].EndValue;
                this._Data[prop][o].EndValue = end;
            }
        }
        else
        {   
            var end = this._Data[prop].StartValue;
            this._Data[prop].StartValue = this._Data[prop].EndValue;
            this._Data[prop].EndValue = end;
        }
    }

    this.ElapsedTime = 0;
    this.ActualTime = this.Game.ElapsedTime;
    this.StartTime  = this.Game.ElapsedTime;

};



/*
 * _CompleteAnimation
 * Private
*/
Duedo.Animation.prototype._CompleteAnimation = function() {
    this.ElapsedTime = this.Duration;
};




/*
 * Stop
 * @public
*/
Duedo.Animation.prototype.Stop = function ( complete ) {
    this._PendingStop = true;
    this._CompleteOnStop = complete || false;
};




/*
 * Pause and resume controls
 * @public
*/
Object.defineProperty(Duedo.Animation.prototype, "Pause", {

    get: function() {
        return this._Paused;
    },

    set: function (value) {
        this._Paused = value;
    }


});




