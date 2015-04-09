
/*
 * GameState
*/
function ADD_GAMESTATE() {

    var gameState = {

        p_cannon: null,
        player: null,
        ps: null,
        px: null,
        heroface: null,
        pausedAudio:null,
        light:null,
        light1:null,
        light2:null,
        light3:null,
        light4:null,


        Load: function() {
             
        },

        Create: function() {
            LOADGAME();

            game.Viewport.View.X = 0;
            game.Viewport.Animate({
                View: {X: 0}
            }, 5, "EaseOut").Bind("complete", function() {
                game.Viewport.Follow(player);
            });


            
            
            //game.SoundManager.Play("voice3");
        },

        Enter: function() {

            this.Game.Viewport.ResumeAnimations();

            heroface.ViewportOffset.X = -150;
            heroface.Animate({
                ViewportOffset: {X: 10}
            }, 1, "EaseOut");

            hud.Alpha = 0;
            hud.Animate({
                Alpha:1
            }, 0.3, "EaseIn");
            game.SoundManager.ResumeAllSounds();

            light.Animate({
                Location: {Y:-50}
            }, 1, "Linear");
             light2.Animate({
                Location: {Y:-50}
            }, 1, "Linear");
              light3.Animate({
                Location: {Y:-50}
            }, 1, "Linear");
               light4.Animate({
                Location: {Y:-50}
            }, 1, "Linear");

            
        },

        Exit: function() {
            game.SoundManager.PauseAllSounds();
            heroface.AnimationManager.StopAll();
            this.Game.Viewport.PauseAnimations();
        },

        Update: function() {
            
            ps.ViewportOffset.X = Duedo.Utils.RandInRange(0, this.Game.Viewport.View.Width);
            ps.ViewportOffset.Y = 530;

            if(keyb.KeyState(Duedo.Keyboard.RIGHT)) 
            {
                player.Location.X+=5;
                //player.Location.X += 5;
                player.PlaySequence("runright");
                player.Body.Mass = 40;
                player.Body.ApplyForce(player.Location, new Duedo.Vector2(0.1, 0));
            }
            else if(keyb.KeyState(Duedo.Keyboard.LEFT))
            {
                player.Location.X-=5;
                
                //player.Location.X -= 5;
                player.PlaySequence("runleft");
                player.Body.ApplyForce(player.Location, new Duedo.Vector2(-0.1, 0));
            }
            else
            {
                player.PlaySequence("standright");
            }

            if(keyb.KeyState(Duedo.Keyboard.UP))
                player.Body.ApplyForce(player.Body.Location, new Duedo.Vector2(0, -0.2));


            if(keyb.KeyState(Duedo.Keyboard.UP))
            {
                player.Location.Y -=2 ;

            }
            if(keyb.KeyState(Duedo.Keyboard.DOWN)) {
                player.Location.Y += 2;
            }



            if( keyb.KeyState(Duedo.Keyboard.SPACEBAR))
            {
                if( 1 )
                {
                    
                    if( game.StateManager.CurrentState() == "mainmenu")
                        game.StateManager.StartState("gamestate");
                    else 
                    {
                        game.StateManager.StartState("mainmenu");
                    }
                    

                    keyb.Null(Duedo.Keyboard.SPACEBAR);
                    
                }
                else
                {
                    anim.Pause = false;
                }
            }



        }



        



    }


    game.StateManager.AddState("gamestate", gameState);

};




function LOADGAME() { 
            
            p_cannon = new Duedo.Image(game, game.Cache.GetImage("cannon"));
            p_cannon.Scale.SetBoth(0.2);
            p_cannon.Location.X = 400;
            p_cannon.Location.Y = 100;
            p_cannon.EnablePhysics = true;
            p_cannon.Body.Shape = game.PhysicsEngine.RectangleBody(p_cannon.Location, p_cannon.Width, p_cannon.Height, { isStatic: false, restitution:5 });
            
            var floor = new Duedo.Body(null);
            floor.Shape = game.PhysicsEngine.RectangleBody(0 + 400, 400, 3600, 30, {isStatic: true, friction:1});
            game.PhysicsEngine.AddBody(floor);

            /*Importante*/
            p_cannon.Body.GroupID = 10;
            p_cannon.Body.Restitution = 0;
            game.PhysicsEngine.AddBody(p_cannon.Body);

            p_cannon.Rotation = Duedo.Utils.Deg2Rad(-25);
            p_cannon.Z = 10;
            p_cannon.Name = "cannon";
            //p_cannon.Draggable = true;
            p_cannon.Anchor.SetBoth(0.5);
            //p_cannon.InteractionHandler.DragBringToTop = true;
            game.Add(p_cannon);
            

            player = new Duedo.SpriteSheet(game, game.Cache.GetImage("metroidSS"));
            player.Load(game.Cache.GetJSON("metroidAnim"));
            player.PlaySequence("runright");
            player.Name = "metroid";
            player.Z = 9;
            player.Scale.SetBoth(1.8);
            player.Location.X = 30;
            player.Location.Y = 20;
            
            player.EnablePhysics = true;

            player.Body.Shape = game.PhysicsEngine.RectangleBody(player.Location, player.Width, player.Height, {isStatic:false, restitution:0, friction:30});
            player.Body.GroupID = 1;
            player.Body.Draggable = true;
            //player.Body.Scale = new Duedo.Vector2(0.5, 0.5);
            player.Body.Mass = 10;
            //player.Body.Scale(new Duedo.Vector2(0.5, 0.5), player.Body.Centre);
            player.Body.PreventRotation = true;
            game.PhysicsEngine.AddBody(player.Body);
            
            px.AddBody(px.RectangleBody(100, 320, 1000, 40, { isStatic: true }));

            canImg = new Duedo.Image(game, game.Cache.GetImage("cannon"));
            canImg.Location.X = 30;
            canImg.Location.Y = 50;
            canImg.EnablePhysics = true;
            canImg.Body.Shape = game.PhysicsEngine.CircleBody(p_cannon.Location, 30, {isStatic:false, restitution:0.1});
            canImg.Body.PreventRotation = true;
            game.PhysicsEngine.AddBody(canImg.Body);
            canImg.Body.Restitution = 0.5;
            canImg.Body.GroupID = 10;
            canImg.Z = 100;
            //canImg.Draggable = true;
            canImg.Scale.SetBoth(0.5);
            game.Add(canImg);
            game.Add(player);
            player.Animate({
                Location: {X: 70}
            }, 2, "Linear");
            



            /*Background*/
            pausedAudio = false;
            bg = new Duedo.Image(game, game.Cache.GetImage("bg_menu"));
            bg.Scale.SetBoth(0.98);
            bg.Z = -1;
            bgnight = new Duedo.Image(game, game.Cache.GetImage("bg_menunight"));
            bgnight.Scale.SetBoth(0.98);
            bgnight.Z = -1;
            //this.Add(bg);
            
            ps = new Duedo.ParticleSystem(game, "ps");
            ps.Load(game.Cache.GetJSON("smokePS"));
            ps.FixedToViewport = true;
            ps.Z = 6;
            //game.Add(ps);
            
            
            parallax = new Duedo.Parallax(game);
            parallax.Z = 4;
        
            l1 = new Duedo.Layer(game, bg);
            l1.Location.Set(-100, 0);
            parallax.AddLayer(l1);

            l5 = new Duedo.Layer(game, bgnight);
            l5.Location.Set(-100, 0);
            parallax.AddLayer(l5);

            var gcloud = new Duedo.Image(game, game.Cache.GetImage("grey_cloud"));
            gcloud.Z = 70;
            gcloud.Alpha = 0.7;
            gcloud.Location.Set(200, -100);
            var l2 = new Duedo.Layer(game, gcloud);
            parallax.AddLayer(l2);

            var rubble = new Duedo.Image(game, game.Cache.GetImage("rubble"));
            rubble.Location.Set(0, 360);
            rubble.Z = 40;
            var l3 = new Duedo.Layer(game, rubble);
            parallax.AddLayer(l3);

            var rubble2 = new Duedo.Image(game, game.Cache.GetImage("rubbles"));
            rubble2.Location.Set(900, 360);
            rubble2.Z = 60;
            var l4 = new Duedo.Layer(game, rubble2);
            parallax.AddLayer(l4);
            game.Add(parallax);

            hud = new Duedo.Image(game, game.Cache.GetImage("hud"));
            hud.FixedToViewport = true;
            hud.ViewportOffset.X = 0;
            hud.ViewportOffset.Y = 0;
            hud.Z = 100;
            hud.Scale.SetBoth(1);
            hud.Scale.Y = 1.05;
            game.Add(hud);

            audio = new Duedo.Button(game);
            audio.Width = 50;
            audio.Height = 50;
            audio.Texture = game.Cache.GetImage("audio_icon");
            audio.TextureHover = game.Cache.GetImage("audio_iconhover");
            audio.HoverSound = "menu_mouseover";
            audio.ClickSound = "menu_click";
            audio.Text = "";
            audio.FixedToViewport = true;
            audio.ViewportOffset.X = game.Viewport.View.Width - 100;
            audio.ViewportOffset.Y = 440;
            audio.Z = 110;
            audio.OnClickCallback = function() {
                if(!pausedAudio) {
                    game.SoundManager.Volume = 0;
                    pausedAudio = true;
                }
                else
                {
                    game.SoundManager.Volume = 1;
                    pausedAudio = false;
                }
                
            }
            game.Add(audio);

            heroface = new Duedo.SpriteSheet(game, game.Cache.GetImage("heroface"), "hero");
            heroface.Load(game.Cache.GetJSON("herofaceAnim"));
            heroface.FixedToViewport = true;
            heroface.ViewportOffset.X = 5;
            heroface.ViewportOffset.Y = 5;
            heroface.Z = 110;
            heroface.Draggable = true;
            //heroface.InteractionHandler.DragBringToTop = true;
            heroface.Name = "heroface";
            heroface.Rate = 0.3;
            heroface.PlaySequence("normal").Bind("ended", function() {  });
            game.Add(heroface);
            
            healthicon = new Duedo.Image(game, game.Cache.GetImage("healthicon"));
            healthicon.Z = 110;
            healthicon.Scale.SetBoth(0.2);
            healthicon.FixedToViewport = true;
            healthicon.ViewportOffset.X = 350;
            healthicon.ViewportOffset.Y = 10;
            game.Add(healthicon);

            ammoBall = new Duedo.Image(game, game.Cache.GetImage("cannon_ball"));
            ammoBall.Z = 110;
            ammoBall.Scale.SetBoth(0.5);
            ammoBall.FixedToViewport = true;
            ammoBall.ViewportOffset.X = 790;
            ammoBall.ViewportOffset.Y = 10;
            game.Add(ammoBall);

            light = new Duedo.Image(game, game.Cache.GetImage("light"));
            light.BlendMode = Duedo.BlendModes.LIGHTER;
            light.Alpha = 0.3;
            light.Z = 13;
            light.Location.X = 300;
            light.Location.Y = -200;
            game.Add(light);

            light2 = new Duedo.Image(game, game.Cache.GetImage("light"));
            light2.BlendMode = Duedo.BlendModes.LIGHTER;
            light2.Alpha = 0.3;
            light2.Z = 13;
            light2.Location.X = 800;
            light2.Location.Y = -200;
            game.Add(light2);

            light3 = new Duedo.Image(game, game.Cache.GetImage("light"));
            light3.BlendMode = Duedo.BlendModes.LIGHTER;
            light3.Alpha = 0.3;
            light3.Z = 13;
            light3.Location.X = 900;
            light3.Location.Y = -200;
            game.Add(light3);

            light4 = new Duedo.Image(game, game.Cache.GetImage("light"));
            light4.BlendMode = Duedo.BlendModes.LIGHTER;
            light4.Alpha = 0.3;
            light4.Z = 13;
            light4.Location.X = 100;
            light4.Location.Y = -200;
            game.Add(light4);

           
            
            /*Start soundtrack*/
            //game.SoundManager.Play("q2", "gost1").SetVolume(0.5).Repeat = Infinity;
            //game.SoundManager.Play("fire_loop_01", "floop").Repeat = Infinity;

            /*Evento esplosione 1*/
            game.Events.AddEvent("sound", function() {
                game.SoundManager.Play("expl1");
            }, Infinity, function() {
                return Duedo.Utils.RandInRange(5, 30);
            });
            
            /*Evento esplosione 2*/
            game.Events.AddEvent("sound", function() {
                game.SoundManager.Play("expl2");
            }, Infinity, function() {
                return Duedo.Utils.RandInRange(5, 30);
            });

            /*
            bg.Animate({
                Alpha: 0
            }, 60 * 2, "EaseIn").Yoyo = true;
            */

            

};