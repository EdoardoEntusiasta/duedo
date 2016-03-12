/*
==============================
Duedo.Consts
Author: http://www.edoardocasella.it

Duedo constants and "macros"
==============================
*/

/*Duedo types*/
Duedo.SPRITESHEET      = 1;
Duedo.SSEQUENCE        = 2;
Duedo.PARTICLE_SYSTEM  = 3;
Duedo.PARTICLE         = 4;
Duedo.BUTTON           = 5;
Duedo.PARALLAX         = 6;
Duedo.LAYER            = 7;
Duedo.IMAGE            = 8;
Duedo.TEXT             = 9;
Duedo.SOUND            = 10;
Duedo.VIEWPORT         = 11;
Duedo.STATE 		   = 12;
Duedo.CIRCLE 		   = 13;
Duedo.DIMENSION 	   = 14;
Duedo.LINE 			   = 15;
Duedo.POINT 		   = 16;
Duedo.POLYGON 		   = 17;
Duedo.RECTANGLE 	   = 18;
Duedo.EVENT 		   = 19;
Duedo.BODY             = 20;
Duedo.WORLD            = 21;
Duedo.QUADTREE         = 22;
Duedo.ANIMATIONMANAGER = 23;


//2DContext.MeasureText
Duedo.MeasureText = function (str, font) {
    var cv = document.createElement("canvas");
    var ctx = cv.getContext("2d");
    ctx.font = font;
    return ctx.measureText(str).width;
};


/*Consts*/
Duedo.PI2         = Math.PI * 2;
Duedo.SPACE_WIDTH = Duedo.MeasureText(' ');
Duedo.HEX_MAX_32BIT_UNSIGNEDINT = 0x70000000;


/*PRIVATE: Auto unique ID for each object*/
Duedo.__ObjectIDs = 0;
Duedo.__GenNextObjID = function() {
    return Duedo.__ObjectIDs++;
};