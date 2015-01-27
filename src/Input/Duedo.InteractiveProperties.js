/*
==============================
Duedo.InteractiveProperties
Author: http://www.edoardocasella.it

Notes:
Handle user interaction with the graphic object
==============================
*/


Duedo.InteractiveProperties = {

    InteractionEnabled: true,


	/*=====================
	 DRAG PROPERTIES   
	 ======================*/
	Draggable:false,

	/*
	* Enable horizontal drag {drag on Y axis}
	*/
	DragHorizontal:true,

	/*
	* Enable vertical drag {drag on X axis}
	*/
	DragVertical:true,

	/*
	* We wish to bring to top our dragged object?
	*/
	DragBringToTop:false,

	/*
	* Drag scale
	*/
	DragScale: 1,

	/*
	 * DragMinAlpha
     * Minimum opacity needed by drag event
	*/
	DragMinAlpha: 0.5,

	/*
	* The mouse button to be used to drag
	*/
	DragMouseButton: Duedo.Mouse.LEFT_BUTTON,





    /*=====================
    CLICK PROPERTIES, EVENTS   
    ======================*/

    OnPointerDown: null,
    OnPointerUp: null,
    OnPointerOut: null,
    OnPointerOn: null,
    OnPointerMove: null,
    OnDragging: null,


    /*
	 * Private
	*/
    _LastClick: null,
    _WasOver: false,
    _PointerWasOver: false,  //new
    _PointerIsOver: false,
    _OnPointerOnCalled: false,
	_isMouseOver: false,
	_Clicked: false,
    /*
    * @private
    * Are we dragging this object?
    * Use Duedo.GraphicObject.Dragging to know about
    */
	_Dragging: false,
    /*
    * Store mouse delta 
    */
	_DragMouseLastLocation: null,
    /*
    * Internal cache
    */
	_Cache: {}

};


