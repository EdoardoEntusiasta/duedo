/*
==============================
Duedo.Time
Author: http://www.edoardocasella.it
==============================
*/




Duedo.Time = function ( autostart ) {
    this.Autostart   = (autostart !== undefined ? true : false);
    this.StartTime   = 0;
    this.LastTime    = 0;
    this.ElapsedTime = 0;
    this.Counting    = false;
    this.HResTime    = false;
};






Duedo.Time.prototype.Start = function () {

    if(!Duedo.Utils.IsNull(self.performance["now"]) && !Duedo.Utils.IsNull(self["performance"]))
    {
        this.StartTime = self.performance.now();
        this.HResTime = true;
    }
    else
    {
        this.StartTime = Date.now();
    }

    this.LastTime = this.StartTime;

    this.Counting = true;
};








Duedo.Time.prototype.GetElapsed = function () {
    this.Delta();
    return this.ElapsedTime;
};







Duedo.Time.prototype.Delta = function () {

    if (this.Autostart && !this.Counting) {

        this.Start();

    } 


    if (this.Counting)
    {
        var now, diff;

        if (this.HResTime === true)
        {
            now = self.performance.now();
        }
        else
        {
            now = Date.now();
        }


        /*microseconds*/
        diff = 0.001 * (now - this.LastTime);

        this.LastTime = now;

        this.ElapsedTime += diff;

    }
    else
    {
        return 'Duedo.Time: No counting';
    }
        


    return diff;
};
