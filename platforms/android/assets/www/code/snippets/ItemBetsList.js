function ItemBetsList(config) {
	this.container = config.container;
	this.betData = config.betData;
	this.pathSnippet = "snippets/itemBetsList.html";
}

ItemBetsList.prototype.constructor = ItemBetsList;

ItemBetsList.prototype.initialize = function(){
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [ this.betData.ID,this.betData.bet_number,this.betData.bet_position ] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.addHandlers();
}

ItemBetsList.prototype.addHandlers = function() {
}