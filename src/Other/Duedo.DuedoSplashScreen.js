/*
 * =================================
 * SplashScreen
 * DUEDO splash screen state
 * Feel free to customize it
 * To turn off splash screen set Duedo.Conf.DUEDOSplashScreen = false before instatiating a new Duedo.GameContext();
 * =================================
 */

if(!DuedoSplashScreen)
var DuedoSplashScreen = {
     
  

    /*
      ============ State preload function
    */
    Load: function() {
        /*Preload the DuedoSplashScreen png*/
        this.Game.Loader.AddResource("media/DuedoSplashScreen.png");
    },





    /*
      ============ State enter function
    */
    Enter: function() {
        
        /*
         * We're animating the logo
        */
        Logo.Animate({
            Alpha:1
        }, 1.5, "EaseIn");       
        
    },





    /*
      ============ State create function
    */
    Create: function() {
        
        /*
         * Force delay state change
         * This function requires the manager to wait before switching to the next state
        */
        this.DelayStateChange(Duedo.Conf.DuedoSplashScreenDuration);

        /*
         * Add the DUEDO logo to the screen
        */
        Logo = new Duedo.Image(this.Game, this.Game.Cache.GetImage("DuedoSplashScreen"));
        Logo.Alpha = 0;
        Logo.FixedToViewport = true;
        Logo.ViewportOffset.X = this.Game.Renderer.ViewCenter.X  - (Logo.Width / 2);
        Logo.ViewportOffset.Y = this.Game.Renderer.ViewCenter.Y  - (Logo.Height / 2);
        //Add this object to the gameContext
        this.Add(Logo);

    },






    /*
      ============ State exit function
    */
    Exit: function() {
        
        /*
         * Remove this state
         * We don't want to use it anymore
        */
        this.RemoveState("DuedoSplashScreen");
        Duedo.Conf.DuedoSplashScreen = false;
    }
};

