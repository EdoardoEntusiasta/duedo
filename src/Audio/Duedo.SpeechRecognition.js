


/*
 * Duedo.SpeechCommand
*/
Duedo.SpeechCommand = function ( text, operation ) {
    
    /*Data*/
    this.Text = text || null;
    this.Operation = operation || null;

    /*Private*/
    this._Called = false;
    this._CommandPhrase;
    this.DestroyAfterExecute = false;

};




/*
 * Duedo.SpeechRecognition
 * BETA - Uses Google speech recognition API
 * Bind vocal triggers
*/
Duedo.SpeechRecognition = function ( autostart ) {
    Duedo.Object.call(this);


    this.SpeechAPI;
    this.Recognizer;

    this.Started = false;
    this._Autostart = autostart || false;
    this.AutoRestart = true;
    /*Conf*/
    this.Async = false;

    this._ActivationKey = null;

    this._Initialized = false;

    /*Commands*/
    this.Commands;


    this._init();

};



/*Inherit object*/
Duedo.SpeechRecognition.prototype = Object.create(Duedo.Object.prototype);
Duedo.SpeechRecognition.prototype.constructor = Duedo.SpeechRecognition;


/*
Triggerable
- start
- stop
*/




/*
 * _init
 * @private
*/
Duedo.SpeechRecognition.prototype._init = function () {

    /*Check compatibility*/
    this.SpeechAPI = window.SpeechRecognition       ||
                     window.webkitSpeechRecognition ||
                     window.mozSpeechRecognition    ||
                     window.msSpeechRecognition     ||
                     window.oSpeechRecognition;


    if( !this.SpeechAPI )
    {
        return false;
    }
    else
    {

        this.Commands = [];
        this._ActivationKey = null;

        /*Setup recognition system*/
        this.Recognizer = new this.SpeechAPI();

        /*Initial configuration*/
        this.Recognizer.maxAlternatives = 1;
        this.Recognizer.continuous      = true;
        this.Recognizer.lang            = "it-IT";
        this.Recognizer.interimResults  = false;


        var self = this;


        /*Onstart*/
        this.Recognizer.onstart = function (ev) {

        };


        /*Onend*/
        this.Recognizer.onend = function () {

            self.Listening = false;

            if( self.AutoRestart )
            {
                self.Start(); 
            }

        };


        /*Onresult*/
        this.Recognizer.onresult = function (revent) {
            self._DispatchResults( revent );
        };


        /*Onerror*/
        this.Recognizer.onerror = function (event) {
            switch( event.error ) {
                case "network":
                    break;
                case "service-not-allowed":
                    break;
                case "not-allowed":
                    break;
            }
        };


        this._Initialized = true;

        if(this._Autostart)
            this.Start();

        return this;
    }

};





/*
 * Start
 * @public
 * Start recognizer
*/
Duedo.SpeechRecognition.prototype.Start = function () {

    if( !this._Initialized )
    {
        this._init();
    }

    if (!this.Listening)
    {
        this.Recognizer.start();
        this.Listening = true;
        this._CallTriggers("start");
    }
        
};




/*
 * _DispatchResults
 * @public
*/
Duedo.SpeechRecognition.prototype._DispatchResults = function ( rev ) {
    
    var results, text;

    results = rev.results[rev.resultIndex];

    for( var i = 0; i <= results.length; i++ )
    {

        if(Duedo.Utils.IsNull(results[i]))
        {
            continue;
        }

        text = results[i].transcript.trim();

        for( var i in this.Commands )
        {
            var cmd = this.Commands[i];
            
            if( text.indexOf(cmd.Text) !== -1 )
            {
                if (this.Async)
                {
                    cmd.Operation();
                    if(cmd.DestroyAfterExecute)
                        this.RemoveCommand(cmd.Text);
                }
                else
                {
                    /*Will be executed in the next update loop*/
                    cmd._Called = true;
                }
                
            }

        }
        

    }
};





/*
 * Stop
 * @public
*/
Duedo.SpeechRecognition.prototype.Stop = function () {
    this.Recognizer.stop();
    this.Listening = false;
    this._CallTriggers("stop");
};






/*
 * AddCommand
 * TWODSC: {Text: null, Operation: null}
 * @public
*/
Duedo.SpeechRecognition.prototype.AddCommand = function ( text, operation ) {

    var Command = new Duedo.SpeechCommand();

    Command.Text = text;
    
    Command.Operation = operation;

    this.Commands.push(Command);


    return Command;

};






/*
 * RemoveCommand
 * @public
*/
Duedo.SpeechRecognition.prototype.RemoveCommand = function ( command ) {

    var i = this.Commands.length;
    
    while(i--)
    {
        if( this.Commands[i].Text === command )
        {
            this.Commands.splice(i, 1);
        }
    }


    return this;

};






/*
 * CommandToRegExt
 * @private
*/
Duedo.SpeechRecognition.prototype._CommandToRegExt = function ( command ) {

    // The command matching code is a modified version of Backbone.Router by Jeremy Ashkenas, under the MIT license.
    var optionalParam = /\s*\((.*?)\)\s*/g;
    var optionalRegex = /(\(\?:[^)]+\))\?/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*\w+/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#]/g;

    command = command.replace(escapeRegExp, '\\$&')
                     .replace(optionalParam, '(?:$1)?')
                     .replace(namedParam, function (match, optional) {
                          return optional ? match : '([^\\s]+)';
                      })
                      .replace(splatParam, '(.*?)')
                      .replace(optionalRegex, '\\s*$1?\\s*');



    return new RegExp('^' + command + '$', 'i');

};





/*
 * Main update
 * @public
*/
Duedo.SpeechRecognition.prototype.Update = function () {
    

    /*Check activation key*/
    if( this._ActivationKey && !this.AutoRestart )
    {
        
        if( Duedo.Global.Game.Input.KeyState(this._ActivationKey) )
        {
            if( this.Listening )
            {
                //return;
            }
            else
            {
                this.Start();
            }
        }
        else
        {
            if( this.Listening )
            {
                this.Stop();
            }
        }
    }


    /*Execute called commands*/
    if( !this.Async )
    {
        for (var i = this.Commands.length - 1; i >= 0; i--)
        {
            if( this.Commands[i]._Called )
            {
                this.Commands[i].Operation();
                this.Commands[i]._Called = false;
                
                if(this.Commands[i].DestroyAfterExecute)
                    this.RemoveCommand(this.Commands[i].Text);
            }
        }
    }

};





/*
 * SetActivationKey
 * @public
 * 
*/
Object.defineProperty(Duedo.SpeechRecognition.prototype, "ActivationKey", {

    get: function () {
        return this._ActivationKey;
    },

    set: function ( value ) {
        return this._ActivationKey = value;
    }

});





/*
 * Autostart
 * @public
 * 
*/
Object.defineProperty(Duedo.SpeechRecognition.prototype, "Autostart", {

    get: function () {
        return this._Autostart;
    },

    set: function ( val ) {
        this._Autostart = val;
        this.Start(); 
    }

})