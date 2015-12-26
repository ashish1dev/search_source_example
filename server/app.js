SearchSource.defineSource('packages', function(searchText, options) {
	var options = {sort: {isoScore: -1}, limit: 20};
   
	if(searchText.length>=1) {
		var regExp = buildRegExp(searchText);
		var selector = {$or: [
			{packageName: regExp},
			{description: regExp}
		]};

	return Packages.find(selector, options).fetch();
  } else if (searchText.length===0){ 
		return [];// return blank array when length of text searched is zero
  } 
  else {
		return Packages.find({}, options).fetch(); 
  }
});

function buildRegExp(searchText) {
	// this is a dumb implementation
	var parts = searchText.trim().split(/[ \-\:]+/);
	return new RegExp("(" + parts.join('|') + ")", "ig");
}