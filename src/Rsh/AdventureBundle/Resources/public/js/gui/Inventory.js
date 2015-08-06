var Inventory = new Class({
    dragInstances: [],
    inventoryBoxes: [],
    draggableService: new DraggableService(),

    initialize: function () {
        this.createInventoryBoxes();
    },

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