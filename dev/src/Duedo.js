/*
  ███████ ██║   ██╗███████╗██████╗  ██████╗ 
  ██╔══██╗██║   ██║██╔════╝██╔══██╗██╔═══██╗
  ██║  ██║██║   ██║█████╗  ██║  ██║██║   ██║
  ██║  ██║██║   ██║██╔══╝  ██║  ██║██║   ██║
  ██████╔╝╚██████╔╝███████╗██████╔╝╚██████╔╝
  ╚═════╝  ╚═════╝ ╚══════╝╚═════╝  ╚═════╝          
  2D-HTML5 GAME FRAMEWORK                                                    
   
   * Duedo.js
   * Author: http://www.edoardocasella.it | cs.edoardo@gmail.com | Italy
   * Project started: 2014/01/01 
   * Info: http://projects.edoardocasella.it/duedo
   * Compatibility: tested on IE >= 9, Chrome, Firefox
   
   * Copyright (c) 2014, Sebastiano Edoardo Casella
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
   * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
   * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
   * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
   * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
   * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
   * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *                          
*/
  
/*Duedo namespace*/
var Duedo = Duedo || {};


/*Duedo Info*/
Duedo.Info = {
    Version: "0.8.5",
    LastUpdate: "2015/08/02"
};


/*Main configuration*/
Duedo.Conf = {
    // Objects pinned to the viewport will not be affected by the viewport scale / zoom and will keep the same size.
    ScaleFixedToViewportOnZoom: false, // note: if false, objects must be relocated manually
    // Minimum camera zoom/scale value
    MinimumZoom: 0.1,
    /*The function to load when the DOM is ready*/
    MainFunc: "duedoMain",
    /*The game automatically starts the game loop -> Simulate(game, deltaT)*/
    AutoLooping: true,
    /*Shows FPS in the canvas screen*/
    DrawFPS: false,
    /*Pixels in meters |don't change it! */
    PixelsInMeter: 30
};



/*Duedo logo base64*/
Duedo.Logo64 = "data:image/png;base64,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";


/*
 * Call the mainFunc when the document is loaded
 * @Duedo.Conf.MainFunc
*/
document.addEventListener("DOMContentLoaded", function() {
    //Get client info | Core/Duedo.Client.js
    Duedo.GetClientInfo(false);
    /*Start mainfunct*/
    if(Duedo.IsFunc(self[Duedo.Conf.MainFunc]))
        self[Duedo.Conf.MainFunc].call();
});
