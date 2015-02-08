/*
==============================
Duedo.Stage
Author: http://www.edoardocasella.it
==============================
*/

Duedo.Stage = function (gameContext) {
    Duedo.Object.call(this);
    this.Game = gameContext || Duedo.Global.Games[0];

    /*Initialize*/
};



/*Inherit generic Object*/
Duedo.Stage.prototype = Object.create(Duedo.Object.prototype);
Duedo.Stage.prototype.constructor = Duedo.Stage;





/*
 * _init
 * @private
*/
Duedo.Stage.prototype._init = function () {

};


/*
 * EntsPreUpdate
*/
Duedo.Stage.prototype.PreUpdate = function(deltaT) {

     /*Update entities*/
        for(var i = this.Game.Entities.length - 1; i >= 0; i--)
        {
            var ent = this.Game.Entities[i];

            if(!Duedo.Utils.IsNull(ent["InUse"]))
            {
                if (ent.MustBeDead(this.Game))
                    ent.InUse = false;

                if(!ent.InUse)
                {   
                    /*Remove entity*/
                    if(!Duedo.Utils.IsNull(ent["_CallTriggers"]))
                        ent._CallTriggers("destroy");

                    this.Game.Entities.splice(i, 1);
                    continue;
                }
            }

            if(!Duedo.Utils.IsNull(ent["PreUpdate"]))
            {
                ent.PreUpdate(deltaT);
                if (ent["SuperPreUpdate"])
                    ent.SuperPreUpdate(deltaT);
            }
        }
};



/*
 * EntsPostUpdate
*/
Duedo.Stage.prototype.PostUpdate = function(deltaT) {

        var curState = this.Game.StateManager.CurrentState();

        for(var i = this.Game.Entities.length - 1; i >= 0; i-- )
        {
            var ent = this.Game.Entities[i];

            if(!Duedo.Utils.IsNull(ent["InUse"]))
            {
                if(!ent.InUse)
                {   
                    /*Remove entity*/
                    if(!Duedo.Utils.IsNull(ent["_CallTriggers"]))
                        ent._CallTriggers("destroy");

                    this.Game.Entities.splice(i, 1);
                    continue;
                }
            }
            if(!Duedo.Utils.IsNull(ent["PostUpdate"]))
            {
                ent.PostUpdate(deltaT);
                if (ent["SuperPostUpdate"])
                    ent.SuperPostUpdate(deltaT);
            }
        }
    




};



/*
 * Update
 * @public
*/
Duedo.Stage.prototype.Update = function( deltaT ) {

    /*Update entities*/
        var curState = this.Game.StateManager.CurrentState();

        for(var i = this.Game.Entities.length - 1; i >= 0; i-- )
        {
            var ent = this.Game.Entities[i];

            if(!Duedo.Utils.IsNull(ent["InUse"]))
            {
                if(!ent.InUse)
                {   
                    /*Remove entity*/
                    if(!Duedo.Utils.IsNull(ent["_CallTriggers"]))
                        ent._CallTriggers("destroy");

                    this.Game.Entities.splice(i, 1);
                    continue;
                }
            }

            if(!Duedo.Utils.IsNull(ent["Update"]))
            {
                ent.Update(deltaT);
                if (ent["SuperUpdate"])
                    ent.SuperUpdate(deltaT);
            }
        }

    
    return this;

};