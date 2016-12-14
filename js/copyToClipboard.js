var textToClipboard = function () {
	this.copyToClipboard = function(txtSelector, btnSelector) {	
	  var copyText = document.querySelector(txtSelector);
	  window.getSelection().removeAllRanges();  	
	  var range = document.createRange();  
	  range.selectNode(copyText);  
	  window.getSelection().addRange(range);
	  try {  
		var successful = document.execCommand('copy');  
		var msg = successful ? 'successful' : 'unsuccessful';  
		if(msg === 'successful') {
			$(btnSelector).animate( { height: "hide" }, 1200, name )
          .delay( 50 )
          .animate( { height: "show" }, 1200, name );
		}
	  } catch(err) {
			var er = err;
	  }finally {
		  window.getSelection().removeAllRanges();  
	  }
	};
	 
	//});
};
 