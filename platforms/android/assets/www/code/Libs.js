function Libs(_lib_) {
	var self = this;
	this.lib = _lib_;
	
	if(window.jQuery == undefined) {
		console.log("Jquery is not loaded. It's mandatory to load JQuery");
	}else{
		this.loadFiles(this.getFiles(this.lib));
	}
};

Libs.prototype.constructor = Libs;

Libs.prototype.getFiles = function(_lib_) {
	var self = this;
	this.libraries = new Array(
		{
			"name"	: "app",
			"libs"	: [
				"code/Monkeyman/core/oop.js",
				"code/Monkeyman/core/Snippet.js",
				"code/Monkeyman/core/Utils.js",
				"code/utils.js",
				"code/App.js",
				"code/snippets/Header.js",
				"code/snippets/Lottery.js",
				"code/views/View.js",
				"code/views/Login.js",
				"code/views/Home.js",
				"code/views/UserSettings.js",
				"code/views/Bet.js"
			]
		}
	);
	var _libs_ = new Array();
	this.libraries.forEach(function(d){
		if(d.name == _lib_)
			_libs_ = d.libs;
	});
	return _libs_;
};

Libs.prototype.loadFiles = function(files) {
	var index,extension,file;
	files.forEach(function(f){
		index = f.lastIndexOf(".",f.length);
		extension = f.slice(index + 1,f.length);
		switch(extension)
		{
			case "css":
				$.ajax({
					async : false,
					url : f,
					success : function(result) {
						$("<style></style>").appendTo("head").html(result);
					},
					error : function(error) {
						console.log("No se pudo cargar " + f);
					}
				});
			break;
			case "js":
				$.ajax({
					async : false,
					url : f,
					dataType : "script",
					success : function(result) {
						console.log("Se cargo: " + f);
					},
					error : function(error) {
						console.log("No se pudo cargar " + f);
					}
				});

			break;
		}
	});
};