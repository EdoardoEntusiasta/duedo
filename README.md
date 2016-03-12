![Alt text](http://projects.edoardocasella.it/duedo/img/logo.png?raw=true "Duedo")

2D HTML5 game engine
Duedo is currently under heavy development and actually does not have a physics engine and a mobile support

Seeking collaborators

#Version info
1. Project started: 01/2014  
2. Actual version: 0.8.5
3. Renderer: canvas2d context

#Compile
Using 'gulp' the build folder will contains duedo.js and duedo.minified.js

#Engine and functionality
1. Sound manager
  1. Can preload and play: mp3, wav, ogg, mp4
  2. Dynamic sounds: you can give a world location to the sound: smanager.Play("soundname").SetLocation(x, y);
  3. Callbacks for every sound playing
  4. Google speech recognition to trigger vocal commands inside your game
2. Events
  1. Set customized events based on time (like a spaceship that appear every 10 seconds or by a random value)
  2. Give to each element a customizable lifetime
  3. Handle objects temporary modifications 
3. StateManager
  1. Create your own game states (menu, menu2, gameplay, menu3)
4. Animations
  1. Animate the properties of a graphic object (mysprite.Animate( { prop:val }, time, "Linear"))
  2. Bind customized callbacks to the animations
5. Input and interactions manager
  1. Keyboard
  2. Mouse
  4. Customizable input properties
  5. Handle pointer events: like dragging or click or pointerover, pointerup ...
6. QuadTree support
7. Particle System
  1. Useful to create some graphical effects like fire, smoke, magic etc.. (not collidable)
  2. Includes a json presets ready to use and customize
8. Spritesheets and image rendering
9. Geometry and math support
10. Parallax
11. *Physics engine: box2d, to be connected*
12. *Tilemap: to develop*


#Physics engine
![Alt text](http://enigma-dev.org/docs/wiki/images/a/ab/Box2d.png "Box2d")

Box2d official page
http://box2d.org/


#Todo
Tilemaps, physics engine, improve the parallax, video rendering

#Toimprove & bugs
Toimprove: Geometry rotations and rendering

