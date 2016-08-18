$(function(){
	var searchField = $('#query');
	var icon = $('#search-btn');

	$(searchField).on('focus', function(){
		$(this).animate({
			width:'100%'
		}, 400);
		$(icon).animate({
			right:'10px'
		}, 400);
	});

	$(searchField).on('blur', function(){
		if(searchField.val() == ''){
			$(searchField).animate({
				width: '45%'
			}, 400);
			$(icon).animate({
				right: '520px' 
			}, 400);
		}
	});
})