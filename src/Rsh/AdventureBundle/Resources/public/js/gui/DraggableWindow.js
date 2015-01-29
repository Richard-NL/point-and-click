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