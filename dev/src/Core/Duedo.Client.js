/*
==============================
Duedo.StaticCommon
Author: http://www.edoardocasella.it
Retrieve client info
==============================
*/

/*Client info "struct"*/
Duedo.ClientInfo = {
	/*Bool*/
	Initialized: false,
    /*Browser name*/
    Browser: null,
    /*Browser version*/
    BrowserVersion: null,
    /*Client device*/
    Device: null,
    /*Os bit-version*/
    BitVersion: null,
    /*Device is touch enabled*/
    IsTouch: false,
    /*Endianness*/
    Endianness: null,
    /*Window dimension*/
    Window: { Width: null, Height: null },

    WebGL: false,
    WebAudio: false,
    Ogg:  false,
    Opus: false,
    Mp3:  false,
    Wav:  false,
    M4a:  false,
    Webm: false

};



/*
 * GetClientInfo
 * @public
 * Mem the client info (ex. is mobile? browser, os version, screen size...)
*/
Duedo.GetClientInfo = function(print_log) {

	/*Get browser info*/
    Browser                         = Duedo.BrowserInfo();
    Duedo.ClientInfo.Browser        = Browser[0];
    Duedo.ClientInfo.BrowserVersion = Browser[1];

    //Bit version
    Duedo.ClientInfo.BitVersion = window.navigator.platform;

    //Endianness
    if(!Duedo.ClientInfo.Endianness)
        Duedo.ClientInfo.Endianness = Duedo.Utils.Endianness();

    if ("ontouchstart" in document.documentElement || (window.navigator.maxTouchPoints && window.navigator.maxTouchPoints > 1)) {
        Duedo.ClientInfo.IsTouch = true;
    }

    //Audio
    Duedo._CheckAudioSupport();
  

    Duedo.ClientInfo.Initialized = true;

    if (print_log)
        console.log(Duedo.ClientInfo);

};





Duedo._CheckAudioSupport = function () {
    
    var audioElement = document.createElement('audio');
    var result = false;

    try {

        if (result = !!audioElement.canPlayType) {

            if (audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '')) {
                Duedo.ClientInfo.Ogg = true;
            }

            if (audioElement.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, '') || audioElement.canPlayType('audio/opus;').replace(/^no$/, '')) {
                Duedo.ClientInfo.Opus = true;
            }

            if (audioElement.canPlayType('audio/mpeg;').replace(/^no$/, '')) {
                Duedo.ClientInfo.Mp3 = true;
            }

            // Mimetypes accepted:
            //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
            //   bit.ly/iphoneoscodecs
            if (audioElement.canPlayType('audio/wav; codecs="1"').replace(/^no$/, '')) {
                Duedo.ClientInfo.Wav = true;
            }

            if (audioElement.canPlayType('audio/x-m4a;') || audioElement.canPlayType('audio/aac;').replace(/^no$/, '')) {
                Duedo.ClientInfo.M4a = true;
            }

            if (audioElement.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')) {
                Duedo.ClientInfo.Webm = true;
            }
        }
    }
    catch (e) {
    }


    /*WebAudio*/
    Duedo.ClientInfo.WebAudio = Duedo.Utils.Can.WebAudio();

};