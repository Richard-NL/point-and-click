window.addEvent( 'domready', function () {
    var inventory = new Inventory(),
        scene = new Scene(),
        window = new DraggableWindow('inventory-grid-window'),
        toggleButton = new ToggleButton($$('#popup-open-link'));

    $$('#popup-open-link').addEvent('click', function () {
        window.toggle();
    });

    $$('#inventory-grid-window .myButton').addEvent('click', function () {
        window.hide();
        toggleButton.toggle();
    });
});
