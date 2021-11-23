/*
==============================
Duedo.AnimationManager
Author: http://www.edoardocasella.it

Notes:
--
 * Bindable triggers
 * start
 * complete
 * progress
--

==============================
*/


Duedo.AnimationManager = function (gameContext, parent) {
    Duedo.Object.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];
    this.Type = Duedo.ANIMATIONMANAGER;
    /*Owner object*/
    this.Parent = parent || null;

    this.Animations = [];
};


/*Inherit generic object*/
Duedo.AnimationManager.prototype = Object.create(Duedo.Object.prototype);
Duedo.AnimationManager.prototype.constructor = Duedo.AnimationManager;



/*
 * Animate
 * @public
 * @AffectProperties: Property name (es: Location: {X:10, Y:20} or Radius: 50)
 * @Duration: animation duration 1 = 1 second || 0.005.... || 0.000006....
 * @Tweening: animation type: EaseIn, EaseOut....
*/
Duedo.AnimationManager.prototype.Animate = function ( AffectedProperties, Duration, Tweening, name ) {
    
    if(Duedo.Utils.IsNull(AffectedProperties))
    {
        return null;
    }

    var Animation;
    var pValue;
    var self = this; 
    var ID = this.Animations.length;

    Duration  = Duration != null ? Duration : 1 /*second*/;
    Animation = new Duedo.Animation(this.Game, this.Parent);
    
    for (var PropertyName in AffectedProperties) {
        
        Animation.StartTime           = this.Game.ElapsedTime;
        Animation.ActualTime          = this.Game.ElapsedTime;
        Animation.Name                = name || "animation" + this.Animations.length;
        Animation.Duration            = Duration;
        Animation.Tweening            = Tweening || "Linear";
        Animation._Data[PropertyName] = {};
        Animation.Length++;
        Animation.ID                  = ID;
        

        pValue = AffectedProperties[PropertyName];
            
        /*Destination values as object es: Location {X:10, Y:10}*/
        if(pValue instanceof Object)
        {
            for(var valN in pValue )
            {
                Animation._Data[PropertyName][valN] = 
                { 
                    StartValue: self.Parent[PropertyName][valN],
                    EndValue: AffectedProperties[PropertyName][valN]
                }; 
            }
            
        }
        /*Destination value as single number es: Radius: 50*/
        else
        {
            Animation._Data[PropertyName] =
            { 
                StartValue: self.Parent[PropertyName],
                EndValue: AffectedProperties[PropertyName]
            }; 
        }

        
        /*Push animation in stack*/
        this.Animations.push(Animation);
    }


    return Animation;


};




/*
 * Update
 * @deltaT: main loop
 */
Duedo.AnimationManager.prototype.Update = function (deltaT) {

    var /*int*/ aStatus;

    for (var i = this.Animations.length -1; i >=0; i--)
    {
        /*Animation has started*/
        if (this.Animations[i]._AnimStatus === null)
        {
            this.Animations[i]._CallTriggers("start", this.Parent);
        }

        switch (this.Animations[i].Update(deltaT)) 
        {
            case Duedo.Animation._ENDED_:
                /*Remove animation*/
                /*FIX: the triggers are repeat for every affected properties of the same instance*/
                this.Animations[i]._CallTriggers("complete", this.Parent);
                this.Animations.splice(i, 1); 
                continue;
                break;
            case Duedo.Animation._PROGRESS_:
                /*Animation in progress*/
                this.Animations[i]._CallTriggers("progress", this.Parent);
                break;
            case Duedo.Animation._PAUSED_:
                /*Animation paused*/
                this.Animations[i]._CallTriggers("paused", this.Parent);
                break;
            default:
                continue;
                break;
        } 

    }


    return this;

};





/*
 * StopAll
 * bool@complete: stop and complete the animation
 */
Duedo.AnimationManager.prototype.StopAll = function (complete) {

    for ( var i in this.Animations )
    {
        this.Animations[i].Stop( complete );
    }

};




/*
 * PauseAll
 */
Duedo.AnimationManager.prototype.PauseAll = function () {

    for( var i in this.Animations )
    {
        this.Animations[i].Pause = true;
    }
};




/*
 * ResumeAll
 */
Duedo.AnimationManager.prototype.ResumeAll = function() {

    for( var i in this.Animations )
    {
        this.Animations[i].Pause = false;
    }

};




/*
 * GetAnimation
*/
Duedo.AnimationManager.prototype.GetAnimation = function(sname) {

    if(Duedo.Utils.IsNull(sname))
    {
        return null;
    }


    for(var i in this.Animations)
    {
        if(this.Animations[i].Name === sname)
        {
            return this.Animations[i];
        }
    }


    return null;
        
};