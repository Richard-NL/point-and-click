window.addEvent('domready', function () {

	var gridWindow = new DraggableWindow('inventory-grid-window');
	new ToggleButton($$('#popup-open-link'));
	
	$$('#popup-open-link').addEvent('click', function () {
		gridWindow.toggle();
		
	});

});
var DraggableWindow = new Class({
	initialize: function (element) {
		this.containerElement = $(element);
		this.makeDraggable();
	},
	
	show: function () {
		this.containerElement.show();
	},
	
	hide: function () {
		this.containerElement.hide();
	},
	
	toggle: function () {
		if ('none' !== this.containerElement.getStyle('display')) {
			this.containerElement.hide();
			return;
		}

		this.containerElement.show();
	},
	
	makeDraggable: function () {
		var handleBarElement = this.containerElement.getFirst('.handle-bar');
		new Drag.Move(this.containerElement, { handle: handleBarElement, snap: 0}).attach();
		
	}.protect()
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