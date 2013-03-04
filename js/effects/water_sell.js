function WaterSellEffect(building_position)
{
	this._proto = WaterSellEffect;
	
	this.initCustom = function() 
	{
		this._position_now = {
			x: building_position.x * CELL_SIZE + 31,
			y: building_position.y * CELL_SIZE - 22
		};
		game.resources.play(this._proto.resource_key + '_sound');
	};
	
	this.init();
}

AbstractSimpleEffect.setCommonOptions(WaterSellEffect);

WaterSellEffect.resource_key = 'water_sell';
WaterSellEffect.image_size = {width: 43, height: 96};
WaterSellEffect.frames = 7;

WaterSellEffect.loadResources = function()
{
	game.resources.addImage(this.resource_key, 'images/effects/' + this.resource_key + '/sprite.png');
	game.resources.addSound(this.resource_key + '_sound', 'sounds/water_sell.' + AUDIO_TYPE);
};