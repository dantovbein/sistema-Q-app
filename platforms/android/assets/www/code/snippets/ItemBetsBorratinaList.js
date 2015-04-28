function ItemBetsBorratinaList(config) {
	ItemBetsList.call(this,config);
}

inheritPrototype(ItemBetsBorratinaList,ItemBetsList);

ItemBetsBorratinaList.prototype.constructor = ItemBetsBorratinaList;

ItemBetsBorratinaList.prototype.initializeParameters = function(){
	ItemBetsList.prototype.initializeParameters.call(this);
	this.dataSnippet = [
							this.config.betData.ID,
							this.config.betData.bet_number,
							this.config.betData.bet_borratina_type,
							this.config.betData.bet_total_amount,
							this.getParsedDate(this.config.betData.bet_created)
						];
}