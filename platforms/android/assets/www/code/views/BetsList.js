function BetsList(config) {
	View.call(this,config);
	this.container = config.container;
	
	this.pathSnippet = "views/betsList.html";
}

inheritPrototype(BetsList, View);

BetsList.prototype.constructor = BetsList;

BetsList.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.getAllBets();

	$(document).bind("removeBet", { context:this },this.removeBet);
	$(document).bind("sincronizeBet", { context:this },this.sincronizeBet);
}

BetsList.prototype.getAllBets = function() {
	var bets = utils.getMainInstance().lotteryDataBase.query("bets");
	for(var i=0;i<bets.length;i++) {
		var itemBetsList = new ItemBetsList( { container : $(this.node).find(".bets-list-data"), betData : bets[i] } );
		itemBetsList.initialize();
		$(itemBetsList.node).bind( "showItemOptions", { context:this }, this.showItemOptions );
	}
}

BetsList.prototype.showItemOptions = function(e) {
	utils.getOverlay();
	var betOptions = new PopupBetOptions( { container:$("body"), data:e.item.betData } );
	betOptions.initialize();
}

BetsList.prototype.removeBet = function(e) {
	utils.getMainInstance().lotteryDataBase.deleteRows("bets", {ID: e.betData.ID});
	utils.getMainInstance().lotteryDataBase.commit();
	$(e.data.context.node).find(".bets-list-data .item-bets-list[data-bet='" + e.betData.ID + "']").remove();
}

BetsList.prototype.sincronizeBet = function(e){
	debugger;
	$.ajax({
		context : e.data.context,
		async : false,
		type : "POST",
		data : { betNumber:e.betData.bet_number,
				 betData:e.betData.bet_data,
				 betPosition:e.betData.bet_position,
				 betAmount:e.betData.bet_amount,
				 betTotalAmount:e.betData.bet_total_amount,
				 idDevice:utils.getUserData().idDevice,
				 idVendor:utils.getUserData().idVendor,
				 betCreated:e.betData.date },
		url : "service/manager/uploadBet.php",
		success : function(r){
			debugger;
		},
		error : function(error) {
			debugger;
		}
	})
}