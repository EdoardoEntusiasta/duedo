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
    Version: "1",
    LastUpdate: "2014/23/06"
};


/*Main configuration*/
Duedo.Conf = {
    /*The function to load when the DOM is ready*/
    MainFunc: "duedoMain",
    /*The game automatically starts the game loop -> Simulate(game, deltaT)*/
    AutoLooping: true,
    /*Shows FPS in the canvas screen*/
    DrawFPS: true
};


/*Global*/
Duedo.Global = {
    //Game instances
    Games: []
};



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







/*
  "The problem with the world is that everyone is a few drinks behind."
      -Humphrey Bogart 
*/