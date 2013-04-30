var InterfaceGUI = {
	setHandlers: function()
	{
		//Interface stop button
		$('#top_button_stop').mousedown(function(){
			$(this).addClass('active');
		});
		$('#top_button_stop').mouseup(function(){
			$(this).removeClass('active');
		});
		$('#top_button_stop').click(function(){
			game.shellStopButton();
		});
		//Interface sell building button
		$('#top_button_sell').click(function(){
			game.toggleActionState(ACTION_STATE_SELL);
		});
		//Interface power building button
		$('#top_button_power').click(function(){
			game.toggleActionState(ACTION_STATE_POWER);
		});
		$('#top_button_repair').click(function(){
			game.toggleActionState(ACTION_STATE_REPAIR);
		});
		$('#top_button_attack').click(function(){
			game.toggleActionState(ACTION_STATE_ATTACK);
		});

		$('.tab').click(function(){
			var $this = $(this);

			$('.tab').removeClass('active');
			$this.addClass('active');

			if ($this.attr('data-panel'))
			{
				$('.panel').addClass('hidden');
				$('#'+$this.attr('data-panel')).removeClass('hidden');
			}
		});

		$('.unit-image').click(function(){
			var cellid = $(this).parent('div').attr('data-cell');
			game.constructor.cellClick(cellid, 'left');
		});
		$('.unit-image').bind('contextmenu', function(){
			var cellid = $(this).parent('div').attr('data-cell');
			game.constructor.cellClick(cellid, 'right');
			return false;
		});
		$('.unit-image').mouseover(function(){
			var cellid = $(this).parent('div').attr('data-cell'), position = $(this).offset();
			game.constructor.cellPopupPrepere(cellid);

			position.left -= 392;
			$('#cell_popup').css(position);
			$('#cell_popup').show();
		});
		$('.unit-image').mouseout(function(e){
			$('#cell_popup').hide();
		});

		$('#upgrade_button').click(function(){
			game.buildingUpgrade();
		});
		$('#upgrade_button').mouseover(function(){
			if ($(this).hasClass('disable'))
				return;

			var position = $(this).offset();
			game.constructor.upgradePopupPrepere();

			position.left -= 398;
			$('#cell_popup').css(position);
			$('#cell_popup').show();
		});
		$('#upgrade_button').mouseout(function(){
			$('#cell_popup').hide();
		});

		$('#minimap_viewport').mousedown(function(event){
			game.minimapNavigation(true);
			game.minimapMove(event.layerX, event.layerY);
		});

		$('#minimap_viewport').mouseup(function(){
			game.minimapNavigation(false);
		});

		$('#minimap_viewport').mouseout(function(){
			game.minimapNavigation(false);
		});

		$('#minimap_viewport').mousemove(function(event){
			game.minimapMove(event.layerX, event.layerY);
		});

		$('#viewport').bind('contextmenu', function(){
			game.onClick('right');
			return false;
		});
		$('#viewport').mousedown(function(event){
			if (event.button == 0)
				MousePointer.selectionStart();
		});
		$('#viewport').mouseup(function(event){
			if (event.button == 0)
				MousePointer.selectionStop();
		});
		$('#viewport').mouseout(function(){
			MousePointer.show_cursor = false;
		});
		$('#viewport').mousemove(function(event){
			MousePointer.setPosition(event);
		});
		$('#cm_page_up').click(function(){
			game.constructor.pageUp();
		});
		$('#cm_page_down').click(function(){
			game.constructor.pageDown();
		});
		$('.scroll-box').live('mousedown', function(event){
			var $this = $(this), proc = parseInt(event.offsetX / $this.width() * 100);
			$this.children().css('width', proc + '%');
			game.changeGameParam($this.attr('data-param'), proc);
		});

		$(document).keydown(function(event) {
			var prevent = true;
			switch (event.which)
			{
				case 37: //Left
					game.viewport_move_x = -1;
					break;
				case 39: //Right
					game.viewport_move_x = 1;
					break;
				case 38: //Up
					game.viewport_move_y = -1;
					break;
				case 40: //Down
					game.viewport_move_y = 1;
					break;
				case 48: //0
				case 49: //1
				case 50: //2
				case 51: //3
				case 52: //4
				case 53: //5
				case 54: //6
				case 55: //7
				case 56: //8
				case 57: //9
					if (event.ctrlKey)
						game.createTacticalGroup(event.which - 48);
					else
						game.selectTacticalGroup(event.which - 48);
					break;

				case 65: //a - attack
					game.toggleActionState(ACTION_STATE_ATTACK);
					break;
				case 80: //p - pause/unpause game
					game.togglePause();
					break;
				case 83: //s - stop selected units
					game.shellStopButton();
					break;
				default:
					prevent = false;
			}
			if (prevent)
				event.preventDefault();
		});

		$(document).keyup(function(event) {
			var prevent = true;
			switch (event.which)
			{
				case 37: //Left
				case 39: //Right
					game.viewport_move_x = 0;
					break;
				case 38: //Up
				case 40: //Down
					game.viewport_move_y = 0;
					break;
				default:
					prevent = false;
			}
			if (prevent)
				event.preventDefault();
		});
	}
};