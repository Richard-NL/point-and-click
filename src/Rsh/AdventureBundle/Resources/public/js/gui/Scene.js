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