window.addEvent('domready', function () {

	var gridWindow = new DraggableWindow('inventory-grid-window');
	new ToggleButton($$('#popup-open-link'));
	
	$$('#popup-open-link').addEvent('click', function () {
		gridWindow.toggle();
	});

});