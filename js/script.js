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
				right: '57%' 
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

				$.each(data.items, function(i, item){
					var output = getOutput(item);
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons)
			}
	);
}

function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var date = item.snippet.publishedAt;

	var output = '<li>' +
	'<div class="list-left"><img src="'+thumb+'"></div>' +
	'<div class="list-right">' +
	'<h3>'+title+'</h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+date+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	'';

	return output
}

function nextPage(){

	var token = $('#next-button').data('token')
	var q = $('next-button').data('q')
	$('#results').html('');
	$('#buttons').html('');
	q = $('#query').val();
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: mykey },
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);

				$.each(data.items, function(i, item){
					var output = getOutput(item);
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons)
			}
	);
}

function prevPage(){

	var token = $('#prev-button').data('token')
	var q = $('prev-button').data('q')
	$('#results').html('');
	$('#buttons').html('');
	q = $('#query').val();
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			pageToken: token,
			type: 'video',
			key: mykey },
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;
				console.log(data);

				$.each(data.items, function(i, item){
					var output = getOutput(item);
					$('#results').append(output);
				});

				var buttons = getButtons(prevPageToken, nextPageToken);

				$('#buttons').append(buttons)
			}
	);
}

function getButtons(prevPageToken, nextPageToken){
	if(!prevPageToken){
		var btnoutput = '<div class="button-container">' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
		'onclick="nextPage();">Next Page</button></div>';
	}
	else {
		var btnoutput = '<div class="button-container">' +
		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"'+
		'onclick="prevPage();">Prev Page</button>' +
		'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"'+
		'onclick="nextPage();">Next Page</button></div>';
	}
	return btnoutput

}