window.addEvent( 'domready', function () {
    var inventory = new Inventory(),
        scene = new Scene();
});

var DraggableService = new Class({
    initialize: function () {

    },

    createDragInstance: function ( idAttribute, dropEventName ) {
        var dragInstance = new Drag.Move(idAttribute, {
            droppables: '.droppable',
            onDrop: function ( draggedElement, droppable, event ) {
                if ( droppable ) {
                    droppable.fireEvent( dropEventName, draggedElement );
                    return;
                }
            },

            onEnter: function ( draggedElement, droppable ) {
                var myFx = new Fx.Tween( droppable );
                myFx.start('background-color', '#FFF', '#DDD');
            },

            onLeave: function ( draggedElement, droppable ) {
                var myFx = new Fx.Tween( droppable );
                myFx.start('background-color', '#DDD', '#FFF');
            }
        });
        return dragInstance;
    }
});
var DraggableWindow = new Class({
	initialize: function ( element ) {
		this.containerElement = $( element );
		this.makeDraggable();
	},
	
	show: function () {
		this.containerElement.show();
	},
	
	hide: function () {
		this.containerElement.hide();
	},
	
	toggle: function () {
		if ('none' !== this.containerElement.getStyle( 'display' )) {
			this.containerElement.hide();
			return;
		}

		this.containerElement.show();
	},
	
	makeDraggable: function () {
		var handleBarElement = this.containerElement.getFirst( '.handle-bar' );
		new Drag.Move(this.containerElement, { handle: handleBarElement, snap: 0}).attach();
		
	}.protect()
});
var Inventory = new Class({
    dragInstances: [],
    inventoryBoxes: [],
    draggableService: new DraggableService(),

    initialize: function () {
//        this.makeItemsDraggable();
        this.createInventoryBoxes();
    },
//    // @todo remove me
//    makeItemsDraggable: function () {
//        var index = 0,
//            dropZones = $$( '.droppable' ),
//            draggableItems = $$( '.draggable' );
//
//        for ( index = 0; index < draggableItems.length; index += 1 ) {
//            var dragInstance = this.draggableService.createDragInstance(
//                draggableItems[index].get( 'id' ),
//                InventoryBox.NEW_ITEM_DROPPED_EVENT
//            );
//            this.dragInstances.push( dragInstance );
//        }
//    },

    createInventoryBoxes: function () {
        var index = 0,
            dropZones = $$( '.droppable' );

        for ( index = 0; index < dropZones.length; index += 1 ) {
            this.inventoryBoxes.push( new InventoryBox($$( '.droppable')[index] ) );
        }

    },
    addItem: function ( element ) {
        var inventoryBox = this.getFirstAvailableInventoryBox();
        inventoryBox.addItemToContainer( element );
    },
    getFirstAvailableInventoryBox: function () {
        var index;
        for ( index = 0; index < this.inventoryBoxes.length; index += 1 ) {
            if ( !this.inventoryBoxes[index].containerHasItem() ) {
                return this.inventoryBoxes[index];
            }
        }
        throw "No slot available";
    }
});
Class.Mutators.Static = function(members) {
    this.extend ( members );
};

var InventoryBox = new Class({
    Static: {
        NEW_ITEM_DROPPED_EVENT: 'newItemDropped',
        OWNED_ITEM_DROPPED_EVENT: 'existingItemDropped',

        DROPPABLE_CSS_CLASS: 'droppable'
    },

    containerElement: {},

    draggableService: new DraggableService(),

    initialize: function ( containerElement ) {
        this.containerElement = containerElement;
        this.addEvents();
    },

    addEvents: function () {
        this.containerElement.addEvent ( InventoryBox.NEW_ITEM_DROPPED_EVENT, function ( draggedElement ) {
            this.addItemToContainer( draggedElement );
        }.bind( this ));

        this.containerElement.addEvent ( InventoryBox.OWNED_ITEM_DROPPED_EVENT, function ( draggedElement ) {
            if (this.containerHasItem()) {
                this.moveExistingItemTo( this.getItemElement(), draggedElement.getParent() );
            }

            this.addItemToContainer( draggedElement );
            this.resetEvents();
        }.bind( this ));

    }.protect(),

    resetEvents: function () {
        this.containerElement.removeEvents();
        this.addEvents();
    },

    moveExistingItemTo: function ( itemElement, destinationElement ) {
        itemElement.inject( destinationElement );
        itemElement.setStyle('top', null);
        itemElement.setStyle('left', null);
        destinationElement.setStyle('background-color', '#DDD');
    },

    addItemToContainer: function ( draggedElement ) {
        var imageUrl = draggedElement.getData('image-url');

        draggedElement.destroy();

        var ownedItem = new Element('div', {
            id: draggedElement.get('id'),
            styles: {
                width: '100px',
                height: '100px',
                backgroundImage: 'url(' + imageUrl + ')',
                backgroundRepeat: 'no-repeat'
            },
            class: 'inventory-item'
        });
        ownedItem.setData( 'image-url', imageUrl );
        ownedItem.inject(
            this.containerElement
        );
        var dragInstance = this.draggableService.createDragInstance(
            ownedItem.get( 'id' ),
            InventoryBox.OWNED_ITEM_DROPPED_EVENT
        );
    },

    containerHasItem: function () {
        var item = this.getItemElement();
        if (item !== null) {
            return true;
        }
        return false;
    },

    getItemElement: function () {
        return this.containerElement.getElement('.inventory-item');
    }
});
var Scene = new Class({
    inventory: {},

    initialize: function () {
        this.addEventsForSceneItems();
        this.inventory = new Inventory();
    },

    addEventsForSceneItems: function () {
        var sceneItems = $$('.scene-item'),
            index;
        for ( index = 0; index < sceneItems.length; index += 1 ) {
            sceneItems[index].addEvent('click', function ( event ) {
                console.log( 'ouch that hurts' );

                this.inventory.addItem( event.target );

            }. bind( this ));
        }
    }
});
var ToggleButton = new Class({
	Implements: Options,
	options: {
		offStatusText: 'Off',
		onStatusText: 'On'
	},
	isOn: false,
	
	initialize: function (element, options) {
		this.setOptions(options);
		this.element = element;
		this.setClickEvent();
	},
	
	setClickEvent: function () {
		this.element.addListener('click', function () {
			this.toggle();
		}.bind(this));
	}.protect(),
	
	toggle: function () {
		if (this.isOn) {
			this.element.set('text', this.options.offStatusText);
			this.isOn = false;
			return;
		}
		this.element.set('text', this.options.onStatusText);
		this.isOn = true;
	}
});