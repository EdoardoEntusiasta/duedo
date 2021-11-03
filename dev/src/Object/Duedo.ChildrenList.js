/*
==============================
Duedo.ChildrenList
Author: http://www.edoardocasella.it

Represents the collection of child objects or related in some way to another.
==============================
*/

Duedo.ChildrenList = function () {
 
  this._Id = 0;
  this._Items = []; 

};


Duedo.ChildrenList.prototype.constructor = Duedo.ChildrenList;



/*
 * Add
 * Add an object to the list
*/
Duedo.ChildrenList.prototype.Add = function (object, name = null) {
  if(!name) {
    name = `item_${++this._Id}`;
  }
  this._Items.push({object, name, id: this._Id});
  return this;
};


/*
 * Empty
 * Remove all objects
*/
Duedo.ChildrenList.prototype.Empty = function () {
  this._Items.forEach(item => {
    if(item.Destroy) {
      item.Destroy();
    }
  })
  this._Items = [];
  return this;
};



/*
 * HasChildren
 * Check if the list contains something
*/
Duedo.ChildrenList.prototype.HasChildren = function () {
  return this._Items.length > 0;
};



/*
 * Get
 * Get an object by index or name
*/
Duedo.ChildrenList.prototype.Get = function (index = null) {
  if(isNaN(index)) {
    return this._Items.find(item => item.name === index);
  } else {
    return this._Items[index];
  }
};


/*
 * RemoveObject
 * Remove an object by reference or index: integer
*/
Duedo.ChildrenList.prototype.RemoveObject = function (object) {
  let index = null;
  if(isNaN(object)) { 
    index = this._Items.indexOf(object);
  } else {
    index = object
  }
  if (index != -1)
    return this._Items.splice(i, 1)[0];

  return null;
};



/*
* List
* Return a list of only entities
*/
Object.defineProperty(Duedo.ChildrenList.prototype, "List", {

  get: function () {
      return this._Items.map(child => child.object);
  }

});


/*
* Length
* Return the length of the list
*/
Object.defineProperty(Duedo.ChildrenList.prototype, "Length", {

  get: function () {
      return this._Items.length;
  }

});


