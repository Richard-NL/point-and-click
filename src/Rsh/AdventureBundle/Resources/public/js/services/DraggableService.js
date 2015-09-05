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

                draggedElement.setStyles({
                    left: null,
                    top: null
                });
                return;
            },

            onEnter: function ( draggedElement, droppable ) {
//                var myFx = new Fx.Tween( droppable );
//                myFx.start('background-color', '#FFF', '#DDD');
            },

            onLeave: function ( draggedElement, droppable ) {
//                var myFx = new Fx.Tween( droppable );
//                myFx.start('background-color', '#DDD', '#FFF');
            }
        });
        return dragInstance;
    }
});