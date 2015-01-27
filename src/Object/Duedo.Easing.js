/*
==============================
Duedo.Easing
Author: http://www.edoardocasella.it

Easing functions
==============================
*/


Duedo.Easing = function(){ };


/*
 * Quadratic
 * @static public
*/
Duedo.Easing.Quadratic = function (value) {
    return Math.pow(value, 2);
};


/*
 * EaseOut
 * @static public
*/
Duedo.Easing.EaseOut = function (value) {
    return 1 - Math.pow(1 - value, 2);
};


/*
 * EaseIn
 * @static public
*/
Duedo.Easing.EaseIn = function (value) {
    return this.Quadratic(value);
};


/*
 * Linear
 * @static public
*/
Duedo.Easing.Linear = function (value) {
    return value;
};


/*
 * EaseInOut
 * @static public
*/
Duedo.Easing.EaseInOut = function (value) {
    return value - (Math.sin( value * (Math.PI * 2)) / (Math.PI * 2));
};


/*
 * CircularIn
 * @static public
*/
Duedo.Easing.CircularIn = function(value) {
    return 1 - Math.sqrt( 1 - value * value );
};


/*
 * CircularOut
 * @static public
*/
Duedo.Easing.CircularOut = function(value) {
    return Math.sqrt( 1 - ( --value * value ) );
};


/*
 * CircularInOut
 * @static public
*/
Duedo.Easing.CircularInOut = function(value) {
    
    if ( ( value *= 2 ) < 1) 
    {
        return - 0.5 * ( Math.sqrt( 1 - value * value) - 1);
    }   
        
    return 0.5 * ( Math.sqrt( 1 - ( value -= 2) * value) + 1);
};


/*
 * BackIn
 * @static public
*/
Duedo.Easing.BackIn = function(value){
    var s = 1.70158;
    return value * value * ( ( s + 1 ) * value - s );
};


/*
 * BackOut
 * @static public
*/
Duedo.Easing.BackOut = function(value) {
    
    var s = 1.70158;
    
    return --value * value * ( ( s + 1 ) * value + s ) + 1;
};


/*
 * BackInOut
 * @static public
*/
Duedo.Easing.BackInOut = function(value) {
    
    var s = 1.70158 * 1.525;
    
    if ( ( value *= 2 ) < 1 )
    {
        return 0.5 * ( value * value * ( ( s + 1 ) * value - s ) );
    } 
    
    return 0.5 * ( ( value -= 2 ) * value * ( ( s + 1 ) * value + s ) + 2 );
};


/*
 * QuinticIn
 * @static public
*/
Duedo.Easing.QuinticIn = function(value) {
    return value * value * value * value * value;
};


/*
 * QunticOut
 * @static public
*/
Duedo.Easing.QuinticOut = function(value) {
    return --value * value * value * value * value + 1;
};


/*
 * QuinticInOut
 * @static public
*/
Duedo.Easing.QuinticInOut = function(value) {
    
    if ( ( value *= 2 ) < 1 ) 
    {
        return 0.5 * value * value * value * value * value;
    }
        
    return 0.5 * ( ( value -= 2 ) * value * value * value * value + 2 );
};


/*
 * ExponentialIn
 * @static public
*/
Duedo.Easing.ExponentialIn = function(value) {
    return value === 0 ? 0 : Math.pow( 1024, value - 1 );
};


/*
 * ExponentialOut
 * @static public
*/
Duedo.Easing.ExponentialOut = function(value) {
   return value === 1 ? 1 : 1 - Math.pow( 2, - 10 * value );
};


/*
 * ExponentialInOut
 * @static public
*/
Duedo.Easing.ExponentialInOut = function(value) {
    
    if ( value === 0 ) 
        return 0;

    if ( value === 1 ) 
        return 1;
    
    if ( ( value *= 2 ) < 1 ) 
        return 0.5 * Math.pow( 1024, value - 1 );

    return 0.5 * ( - Math.pow( 2, - 10 * ( value - 1 ) ) + 2 );
};


/*
 * BounceIn
 * @static public
*/
Duedo.Easing.BounceIn = function(value) {
    return 1 - Duedo.Easing.BounceOut( 1 - value );
};


/*
 * BounceOut
 * @static public
*/
Duedo.Easing.BounceOut = function(value) {

    if ( value < ( 1 / 2.75 ) ) 
    {
        return 7.5625 * value * value;
    } 
    else if ( value < ( 2 / 2.75 ) ) 
    {
        return 7.5625 * ( value -= ( 1.5 / 2.75 ) ) * value + 0.75;
    } 
    else if ( value < ( 2.5 / 2.75 ) ) 
    {
        return 7.5625 * ( value -= ( 2.25 / 2.75 ) ) * value + 0.9375;
    } 
    else 
    {
       return 7.5625 * ( value -= ( 2.625 / 2.75 ) ) * value + 0.984375;
    }

};


/*
 * BounceInOut
 * @static public
*/
Duedo.Easing.BounceInOut = function(value) {
    
    if ( value < 0.5 ) 
        return Duedo.Easing.BounceIn( value * 2 ) * 0.5;
    
    return Duedo.Easing.BounceOut( value * 2 - 1 ) * 0.5 + 0.5;
};

/*
Duedo.Easing.Harmonic = function (value) {
    return 1 - Math.sin(10 * value) / (10 * value);
};
*/
/*
Duedo.Easing.Bounce = function (value) {
    return ((1 - Math.cos(value * 3 * Math.PI)) * (1 - value)) + value;
};
*/