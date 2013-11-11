var myDataRef = new Firebase('https://getlightning.firebaseio.com/');
var postsRef = myDataRef.child('posts');
var siteDataRef = myDataRef.child('data'); 
var postCount = 0;

var postCountRef = siteDataRef.child('count');

postCountRef.on('value', function(countSnapshot) {
	console.log(countSnapshot.val());
  	postCount = countSnapshot.val();
});

postsRef.child(1).once('value', function(nameSnapshot) {
});

if(get('post') != null){
	postsRef.child(get('post')).once('value', function(nameSnapshot) {
		var blogInfo = nameSnapshot.val();
		$('.postTitle').text(blogInfo.title);
		$('.postBody').text(blogInfo.body);
		$('.save').attr('class', 'update').text('Update');
	});
}

$('.save').click(function () {
	var theTitle = $('.postTitle').text();
	var theBody = $('.postBody').text();
	var count = $('.article').length + 1;
	//postsRef.push({'title' : theTitle, 'body' : theBody, 'count' : count});
	postCountRef.set(postCount + 1);
	postsRef.child(postCount+1).update({'title' : theTitle, 'body' : theBody});
	
});

$('.update').click(function () {
	var theTitle = $('.postTitle').text();
	var theBody = $('.postBody').text();
	postsRef.child(get('post')).update({'title' : theTitle, 'body' : theBody});
});

$('.article h3').click(function () {
	$('.article').append('<button class="editPost"> Edit Post </button>');
});

$('.editPost').click(function () {
	console.log($('this .h3'));
});


var usersQuery = postsRef.startAt();
usersQuery.on('child_added', function(childSnapshot) {
	var postDetails = childSnapshot.val();
 
	var title = postDetails.title;
	var body = postDetails.body;
	var count = $('.article').length + 1;
	addPost(title, body, count);
});

function addPost(title, body, count){
	$('#posts').append('<div class="article"><h3><a href="editor.html?post=' + count +'">' + title + '</a></h3><p>' + body + '</p></div>');
}

function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}