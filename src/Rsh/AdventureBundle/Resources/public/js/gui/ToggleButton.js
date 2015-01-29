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