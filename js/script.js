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
				right: '600px' 
			}, 400);
		}
	});

	$('#search-form').submit(function(e){
		e.preventDefault()
	});	
})

var mykey = config.MY_KEY;

function search(){
	$('#results').html('');
	$('#buttons').html('');
	q = $('#query').val();
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: mykey },
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);
			}
	);
}