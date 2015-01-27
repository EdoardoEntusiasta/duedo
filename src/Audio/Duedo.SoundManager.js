/*
==============================
Duedo.SoundManager
==============================
*/


Duedo.SoundManager = function ( _gameContext ) {
    Duedo.Object.call(this);

    this.GameContext = _gameContext || Duedo.Global.Games[0];

    this._AudioContext;
    this._MasterGain;
    this._noAudio = true;

    this._Volume = 1;

    this._SoundChannels = {};
    this._MaxChannels = 32;

    this._Sounds = [];
    
    this._UsingWebAudio = false;
    this._UsingAudioTag = false;
    this._AudioAPIs = ["AudioContext", "webkitAudioContext", "Audio"];

    this._setup();

};


/*Inherit oject*/
Duedo.SoundManager.prototype = Object.create(Duedo.Object.prototype);
Duedo.SoundManager.prototype.constructor = Duedo.SoundManager;



/*
 * _setup
*/
Duedo.SoundManager.prototype._setup = function () {

    //Choice AudioAPIs
    for( var i in this._AudioAPIs )
    {
        if( !!window[this._AudioAPIs[i]] )
        {
            
            if (this._AudioAPIs[i] !== "Audio")
            {
                this._AudioContext = new window[this._AudioAPIs[i]]();
                this._UsingWebAudio = true;
            }
            else
            {
                this._UsingAudioTag = true;
            }

            this._noAudio = false;

            break;
        }
    }



    if( typeof this._AudioContext === "undefined" )
    {
        return;
    }


    //Create master gain
    if (typeof this._AudioContext.createGain === 'undefined')
    {
        this._MasterGain = this._AudioContext.createGainNode();
    }
    else
    {
        this._MasterGain = this._AudioContext.createGain();
    }

    this._MasterGain.gain.value = this.Volume;

    this._MasterGain.connect(this._AudioContext.destination);

   

    return;
};






/*
 * Update
*/
Duedo.SoundManager.prototype.Update = function (deltaT) {
    
    if(this._noAudio)
    {
        return;
    }
    
    for (var index = this._Sounds.length - 1; index >= 0; index--)
    {
        this._Sounds[index].Update(deltaT);
    }
    
};







/*
 * _AddSound
 * private
*/
Duedo.SoundManager.prototype._AddSound = function ( _bufferedSound, nameReference, volume ) {

    var DUEDOSound;

    //Instantiate a new sound
    DUEDOSound = new Duedo.Sound( _bufferedSound, nameReference, volume, this, true );

    this._Sounds.push(DUEDOSound);


    return DUEDOSound;
    
};






/*
 * Play
*/
Duedo.SoundManager.prototype.Play = function ( soundName, nameReference, volume, location ) {

    if(this._noAudio)
    {
        return;
    }

   DUEDOSound = this.NewSoundInstance(soundName, nameReference);
   if(Duedo.Utils.IsNull(DUEDOSound))
        return;

   if (typeof location !== "undefined" && location !== null)
   {
        DUEDOSound.SetLocation( location );
   }
    
   DUEDOSound.Volume = volume || this.Volume;

   DUEDOSound.Play();


   return DUEDOSound;
    
};







/*
 * NewSoundInstance
*/
Duedo.SoundManager.prototype.NewSoundInstance = function ( soundName, nameReference ) {

    var s = this.GameContext.Cache.GetSound(soundName);

    if (Duedo.Utils.IsNull(s))
    {
        console.warn("Duedo.SoundManager.Play: unrecognized sound '" + soundName + "'");
    }
    else
    {
        var DUEDOSound = this._AddSound(s, (nameReference !== undefined ? nameReference : ("TWODSound_" + this._Sounds.length)), this.Volume);

        if(!Duedo.Utils.IsNull(this.GameContext.StateManager.CurrentState()))
            DUEDOSound.ParentState = this.GameContext.StateManager.CurrentState();

        return DUEDOSound;
    }


    return null;
    
};







/*
 * StopSound
*/
Duedo.SoundManager.prototype.StopSound = function ( soundNameReference ) {
    
    var s = this.GetSoundByReferenceName(soundNameReference);
    
    if(!s)
    {
        return null;
    }

    this.RemoveSound(s, true /*stop*/);

    return this;
};






/*
 * StopAllSounds
*/
Duedo.SoundManager.prototype.StopAllSounds = function () {
    
    for( var i in this._Sounds )
    {
        if ( this._Sounds[i] )
        {
            if(!Duedo.Utils.IsNull(this.GameContext.StateManager.CurrentState()))
            {
                if(this._Sounds[i].ParentState === this.GameContext.StateManager.CurrentState())
                    this._Sounds[i].Stop();
            }
            else
            {
                this._Sounds[i].Stop();
            }
        }
    }



    return this;
};






/*
 * PauseSound
*/
Duedo.SoundManager.prototype.PauseSound = function (soundNameReference) {

    var s = this.GetSoundByReferenceName(soundNameReference);

    if(!s)
    {
        return null;
    }

    s.Pause();

    return this;
};






/*
 * PauseAllSounds
*/
Duedo.SoundManager.prototype.PauseAllSounds = function () {

    for (var i in this._Sounds)
    {
        if(!Duedo.Utils.IsNull(this.GameContext.StateManager.CurrentState()))
        {
            if(this._Sounds[i].ParentState === this.GameContext.StateManager.CurrentState())
                this._Sounds[i].Pause();
        }
        else
        {
            this._Sounds[i].Pause();
        }
    }



    return this;
};






/*
 * ResumeSound
*/
Duedo.SoundManager.prototype.ResumeSound = function (soundNameReference) {

    var s = this.GetSoundByReferenceName(soundNameReference);
    if(!s)
    {
        return null;
    }

    s.Resume();

    return this;

};






/*
 * ResumeAllSounds
*/
Duedo.SoundManager.prototype.ResumeAllSounds = function () {

    for (var i in this._Sounds)
    {
        if (this._Sounds[i])
        {
            if(!Duedo.Utils.IsNull(this.GameContext.StateManager.CurrentState()))
            {
                if(this._Sounds[i].ParentState === this.GameContext.StateManager.CurrentState())
                    this._Sounds[i].Resume();
            }
            else
            {
                this._Sounds[i].Resume();
            }
        }
    }



    return this;
};







/*
 * GetSoundByReferenceName
*/
Duedo.SoundManager.prototype.GetSoundByReferenceName = function ( soundNameReference ) {

    if( typeof soundNameReference === "undefined" )
    {
        return null;
    }

    for (var i in this._Sounds)
    {
        if (this._Sounds[i].Name === soundNameReference)
        {
            return this._Sounds[i];
        }
    }



    return null;
};

//Abbreviated version
Duedo.SoundManager.prototype.Sound = function ( nameReference ) {
    return this.GetSoundByReferenceName( nameReference );
};








/*
 * RemoveSound
*/
Duedo.SoundManager.prototype.RemoveSound = function ( reference, stop ) {
    
    if( typeof reference === "undefined" )
    {
        return false;
    }


    stop = (typeof stop === "undefined" ? true : stop);


    if( reference instanceof Object )
    {
        var index = this._Sounds.indexOf( reference );
        
        if( index !== -1 )
        {
            if ( this._Sounds[index]._IsPlaying && stop )
            {
                this._Sounds[index].Stop();
            }

            return this._Sounds.splice( index, 1);
        }
    }
    else if ( typeof reference === "string" )
    {
        var TWODSound = this.GetSoundByReferenceName(reference);

        if ( TWODSound !== null )
        {
            return this.RemoveSound(TWODSound);
        }

    }



    console.warn("Duedo.SoundManager.RemoveSound: trying to remove a not identified sound");

};





/*
 * SetVolume
 *
 * global volume
*/
Duedo.SoundManager.prototype.SetVolume = function ( volumeValue ) {

    if (volumeValue > 1)
    {
        volumeValue = 1;
    }

    if (volumeValue < 0)
    {
        volumeValue = 0;
    }

    this._Volume = volumeValue;



    if( this._UsingWebAudio )
    {
        this._MasterGain.gain.Volume = volumeValue;
    }


    for (var i in this._Sounds)
    {
        this._Sounds[i].SetVolume(volumeValue);
    }



    return this;
};



/*
 * _BufferedAudioResources
*/
Object.defineProperty(Duedo.SoundManager.prototype, "_BufferedAudioResources", {

    get: function () {

        return _BufferedAudioResources;

    },

    set: function (bufferedList) {

        return _BufferedAudioResources = bufferedList;

    }

});




/*
 * Volume
*/
Object.defineProperty(Duedo.SoundManager.prototype, "Volume", {

    get: function() {
        return this._Volume;
    },

    set:function(value) {
        this.SetVolume(value);
    }

});