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