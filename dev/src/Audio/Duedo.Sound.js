/*
==============================
Duedo.Sound
==============================
*/


Duedo.Sound = function ( source, name, volume, soundManager, connect ) {
    Duedo.Object.call(this);
    this.Type = Duedo.SOUND;
    
    this._SoundManager;
    this._AudioContext;
    this._UsingWebAudio = false;
    this._UsingAudioTag = false;
    this._MasterGainNode;
    this._GainNode;

    this._Source;
    this._BufferSource;

    this.Name; // Internal reference name
    this.OriginalName; // Original name of audiofile
    this.Location;
    this.PlaybackRate = 1;
    this._IsPlaying = false;

    this.Volume = 1;

    this._TotalDuration;
    this._TotalDurationMS;
    this._StartTime;

    this.ElapsedTime = 0;

    this.Paused = false;
    this._PausePosition = 0;
    this._PausedTime;

    this.DynamicSound = false;
    this.MaxDistance = 800;

    this.Repeat = 0;
    this._Repeated = 0;

    //Triggers
    this.Complete;
    this.Progress;
    this.End;

    this.RemoveAfterPlayback = true;

    this._setup( source, name, volume, soundManager, connect );
};



Duedo.Sound.prototype = Object.create(Duedo.Object.prototype);
Duedo.Sound.prototype.constructor = Duedo.Sound;


/*
Sound bindable events:
- ended
- volume
- stop
- pause
- resume
- play
*/



/*
 * _setup
*/
Duedo.Sound.prototype._setup = function ( source, name, volume, soundManager, connect ) {
    
    if(typeof source === "undefined" || typeof soundManager === "undefined")
    {
        throw "Duedo.Sound._setup: undefined source or parent Duedo.SoundManager";
    }
    

    if(1)
    {

        this._Source       = source;
        this.Name          = name;
        this._SoundManager = soundManager;


        if( soundManager._UsingWebAudio )
        {
            this._UsingWebAudio = true;

            //Setup new Sound object
            
            this._AudioContext        = this._SoundManager._AudioContext;
            this._MasterGainNode      = this._AudioContext._MasterGain;


            if (typeof this._AudioContext.createGain === 'undefined')
            {
                this._GainNode = this._AudioContext.createGainNode();
            }
            else
            {
                //Chrome
                this._GainNode = this._AudioContext.createGain();
            }

            this.Volume = (typeof volume === "undefined" ? 1 : volume);

            this._GainNode.gain.value = this.Volume * soundManager.Volume;

            if ( connect )
            {
                this._GainNode.connect(this._AudioContext.destination);
            }


        }
        else
        {
            if( soundManager._UsingAudioTag )
            {
                this._UsingAudioTag = true;

                if (typeof this._Source.duration === "undefined")
                {
                    this.TotalDuration = this._Source.duration;
                }
            }
        }
        
    }
    


    return this;

};







/*
 * SetLocation
 * Sets a spatial position to the sound,
 * its volume will vary according to the distance of the viewport
 * public
*/
Duedo.Sound.prototype.SetLocation = function ( x, y ) {

    if( x instanceof Duedo.Vector2 )
    {
        this.Location = x;
    }
    else
    {
        this.Location = new Duedo.Vector2(x, y);
    }
    
    this.DynamicSound = true;

    //[!] Now this.volume is AUTO
    //Depending on the distance from the viewport centre

    return this;
};






/*
 * SetMaxDistance
 * (when sound has a specific location in space)
*/
Duedo.Sound.prototype.SetMaxDistance = function (n) {
    this.MaxDistance = n;
    return this;
};






/*
 * Update
 * TODO: Don't update if sound is dynamic and too much distant from viewport
*/
Duedo.Sound.prototype.Update = function (deltaT) {
    

    if( this._IsPlaying )
    {

        this.ElapsedTime += deltaT;

        if (this.ElapsedTime >= this._TotalDuration)
        {
            if( this._Repeated < this.Repeat )
            {
                this.Stop().Play();
                this._Repeated++;
            }
            else
            {

                if (this.RemoveAfterPlayback)
                {
                    this._SoundManager.RemoveSound(this, true);
                }
                else
                {
                    this.Stop();
                }

            }
            
            this._CallTriggers("ended");
            return;
        }
        
        /*Sound volume based on distance*/
        if( this.DynamicSound === true )
        {
            
            var distanceFromViewportCenter = this.Location.Clone().Subtract(this._SoundManager.GameContext.Viewport.Center).Magnitude();
            // If you don't hear the audio, try setting a higher value for MaxDistance
            if( distanceFromViewportCenter > 0 )
            {
                this.SetVolume( (Math.max(0, 1 - (1 / this.MaxDistance) * distanceFromViewportCenter)) );
            }
            else 
            {
                this.SetVolume( 1 );
            }

        }
    }
    

};







/*
 * SetVolume
*/
Duedo.Sound.prototype.SetVolume = function ( volumeValue ) {

    if (volumeValue > 1)
    {
        volumeValue = 1;
    }

    if( volumeValue < 0 )
    {
        volumeValue = 0;
    }

    this.Volume = (volumeValue * this._SoundManager.Volume);

    if( this._UsingWebAudio )
    {
        this._GainNode.gain.value = this.Volume;
    }
    else
    {
        this._Source.volume = this.Volume;
    }
    
    this._CallTriggers("volume");



    return this;
};









/*
 * Stop
*/
Duedo.Sound.prototype.Stop = function () {

    if (!this._IsPlaying || !this._Source)
    {
        return;
    }
    

    if (this._UsingWebAudio)
    {

        if ( typeof this._Source.noteOff === "function" )
        {
            this._BufferSource.noteOff(0); 
        }
        else
        {
            this._BufferSource.stop(0);
        }

        this._PausedTime = this.ElapsedTime;

    }
    else if (this._UsingAudioTag)
    {
        this._Source.pause();
        /*Audio tag use source.currentTime...*/
        this._PausedTime = this._Source.currentTime;
        this._Source.currentTime = 0;
    }


    this._IsPlaying = false;
    
    
    this._CallTriggers("stop");



    return this;

};










/*
 * Pause
*/
Duedo.Sound.prototype.Pause = function () {

    if( this._IsPlaying )
    {
        this.Stop();
        this._IsPlaying = false;
        this.Paused = true;

        this._CallTriggers("pause");
    }



    return this;
};








/*
 * Resume
*/
Duedo.Sound.prototype.Resume = function () {

    if( this.Paused && !this._IsPlaying )
    {
        this.Play( this._PausedTime );
        this.Paused = false;
        this._CallTriggers("resume");
    }


    return this;
};







/*
 * Loop
*/
Duedo.Sound.prototype.Loop = function (loop) {
    if(!loop) loop = Infinity;
    this.Repeat = Math.floor(loop);
    return this;
};







/*
 * Play
 * If startFrom is !== null we are calling a resume operation
 * If startFrom == -1 audio will start from a random point
*/
Duedo.Sound.prototype.Play = function ( startFrom ) {

    if( this._IsPlaying === true )
    {
        return this;
    }

    startFrom = (Duedo.Utils.IsNull(startFrom) ? 0 : startFrom);


    if( this._UsingWebAudio )
    {

        this._BufferSource        = this._AudioContext.createBufferSource();
        this._BufferSource.buffer = this._Source;

        this._BufferSource.connect( this._GainNode );

        this.PlaybackRate = parseFloat(this.PlaybackRate);

        if (isFinite(this.PlaybackRate)) {
            this._BufferSource.playbackRate.value = this.PlaybackRate;
        }

        //Total duration
        this._TotalDuration = this._BufferSource.buffer.duration;

        if(startFrom == -1) {
            startFrom = Math.random() * (this._TotalDuration - 0 + 1) + 0;
        }

        if ( typeof this._BufferSource.noteGrainOn != "undefined" )
        {
            this._BufferSource.noteGrainOn(0, /*sec-start*/startFrom, /*sec-end*/ this._TotalDuration);
            this.ElapsedTime = startFrom;
        }
        else
        {
            this._BufferSource.start(0, startFrom, this._TotalDuration);
            this.ElapsedTime = startFrom;
        }
    }
    else
    {
        this._TotalDuration = this._Source.duration;

        if(startFrom == -1) {
            startFrom = Math.random() * (this._TotalDuration - 0 + 1) + 0;
        }

        this._Source.currentTime = startFrom;
        this._Source.play();
    }


    this._IsPlaying = true;
    
    //micro
    this._StartTime = this._SoundManager.GameContext.ElapsedTime;

    if( this._Repeated === 0 )
    {
        this._Repeated = 1;
    }

    this._CallTriggers("play");


    return this;

};


/*
 * Playing
*/
Object.defineProperty(Duedo.Sound.prototype, "Playing", {
    get: function () {
        return this._IsPlaying;
    },
});