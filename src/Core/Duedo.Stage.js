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
    this._init();
};



/*Inherit generic Object*/
Duedo.Stage.prototype = Object.create(Duedo.Object.prototype);
Duedo.Stage.prototype.constructor = Duedo.Stage;





/*
 * _init
 * @private
*/
Duedo.Stage.prototype._init = function () {

    this.Children   = new Array();

    return this;

};





Duedo.Stage.prototype.Add = function ( DUEDOObj ) {
  
    if(Duedo.Utils.IsNull(DUEDOObj))
    {
        return null;
    }


    if( this.HasEntity(DUEDOObj) )
    {
        return;
    }


    
    DUEDOObj.Parent = this;


  
    this.Children.push(DUEDOObj);


    
    if (!Duedo.Utils.IsNull(DUEDOObj["_CallTriggers"]))
    {
        DUEDOObj._CallTriggers("stageadd");
    }


    return this;

};





/*
 * HasEntity
 * @public
*/
Duedo.Stage.prototype.HasEntity = function ( childEntity ) {
    

    if (this.Children.indexOf(childEntity) !== -1)
    {
        return true;
    }


    return false;

};






/*
 * RemoveEntity
 * @public
*/
Duedo.Stage.prototype.RemoveEntity = function ( childEntity, index ) {

    if (typeof childEntity === "undefined" || childEntity === null && index)
    {
        this.Children.splice(index, 1);
    }
    else
    {
        var _index = this.Children.indexOf(childEntity);

        if (_index !== -1)
        {
            this.Children.splice(_index, 1);
        }
    }


    return this;

};



/*
 * EntsPreUpdate
*/
Duedo.Stage.prototype.PreUpdate = function(deltaT) {

     /*Update entities*/
    if(!Duedo.Utils.IsNull(this.Game.Entities[this.Game.StateManager.CurrentState()]))
    {
        var curState = this.Game.StateManager.CurrentState();

        for(var i = this.Game.Entities[curState].length - 1; i >= 0; i--)
        {
            var ent = this.Game.Entities[curState][i];

            if(!Duedo.Utils.IsNull(ent["InUse"]))
            {
                if (ent.MustBeDead(this.Game))
                    ent.InUse = false;

                if(!ent.InUse)
                {   
                    /*Remove entity*/
                    if(!Duedo.Utils.IsNull(ent["_CallTriggers"]))
                        ent._CallTriggers("destroy");

                    this.Game.Entities[curState].splice(i, 1);
                    continue;
                }
            }

            if(!Duedo.Utils.IsNull(ent["PreUpdate"]))
            {
                ent.PreUpdate(deltaT);
            }
        }
    }



    for (var x = this.Children.length - 1; x >= 0; x--) 
    {

        child = this.Children[x];

        if (!Duedo.Utils.IsNull(child["PreUpdate"]))
        {

            if (!child.InUse)
            {
                this.Children.splice(x, 1);
                continue;
            }
            else
            {
                child.PreUpdate(deltaT);

                if(child.Children.length)
                {
                    for(var v = child.Children.length -1; v >= 0; v--)
                    {
                        if(child.Children[v]["PreUpdate"])
                        {
                            child.Children[v].PreUpdate(deltaT);
                        }
                    }
                }
            }

        }

    }


};



/*
 * EntsPostUpdate
*/
Duedo.Stage.prototype.PostUpdate = function(deltaT) {

     /*Update entities*/
    if(!Duedo.Utils.IsNull(this.Game.Entities[this.Game.StateManager.CurrentState()]))
    {
        var curState = this.Game.StateManager.CurrentState();

        for(var i = this.Game.Entities[curState].length - 1; i >= 0; i-- )
        {
            var ent = this.Game.Entities[curState][i];

            if(!Duedo.Utils.IsNull(ent["InUse"]))
            {
                if(!ent.InUse)
                {   
                    /*Remove entity*/
                    if(!Duedo.Utils.IsNull(ent["_CallTriggers"]))
                        ent._CallTriggers("destroy");

                    this.Game.Entities[curState].splice(i, 1);
                    continue;
                }
            }
            if(!Duedo.Utils.IsNull(ent["PostUpdate"]))
            {
                ent.PostUpdate(deltaT);
            }
        }
    }


    for (var x = this.Children.length - 1; x >= 0; x--) 
    {

        child = this.Children[x];

        if (!Duedo.Utils.IsNull(child["PostUpdate"]))
        {

            if (!child.InUse)
            {
                this.Children.splice(x, 1);
                continue;
            }
            else
            {
                child.PostUpdate(deltaT);

                if(child.Children.length)
                {
                    for(var v = child.Children.length -1; v >= 0; v--)
                    {
                        if(child.Children[v]["PostUpdate"])
                        {
                            child.Children[v].PostUpdate(deltaT);
                        }
                    }
                }
            }

        }

    }




};



/*
 * Update
 * @public
*/
Duedo.Stage.prototype.Update = function( deltaT ) {

    /*Update entities*/
    if(!Duedo.Utils.IsNull(this.Game.Entities[this.Game.StateManager.CurrentState()]))
    {
        var curState = this.Game.StateManager.CurrentState();

        for(var i = this.Game.Entities[curState].length - 1; i >= 0; i-- )
        {
            var ent = this.Game.Entities[curState][i];

            if(!Duedo.Utils.IsNull(ent["InUse"]))
            {
                if(!ent.InUse)
                {   
                    /*Remove entity*/
                    if(!Duedo.Utils.IsNull(ent["_CallTriggers"]))
                        ent._CallTriggers("destroy");

                    this.Game.Entities[curState].splice(i, 1);
                    continue;
                }
            }

            if(!Duedo.Utils.IsNull(ent["Update"]))
            {
                ent.Update(deltaT);
            }
        }
    }


    
    for (var x = this.Children.length - 1; x >= 0; x--) 
    {

        child = this.Children[x];

        if (!Duedo.Utils.IsNull(child["Update"]))
        {

            if (!child.InUse)
            {
                this.Children.splice(x, 1);
                continue;
            }
            else
            {
                child.Update(deltaT);

                if(child.Children.length)
                {
                    for(var v = child.Children.length -1; v >= 0; v--)
                    {
                        if(child.Children[v]["Update"])
                        {
                            child.Children[v].Update(deltaT);
                        }
                    }
                }
            }

        }

    }

    
    return this;

};