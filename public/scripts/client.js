$(document).ready(()=>{
  //ajax request for getting data
  const loadtweets = function(){
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType:"json",
      success:(tweets)=>{
        renderTweets(tweets)
     },
     error:(err)=>{
       console.log(`there was an error:${err}`);
     }
   })
  }
//fetche the data and append to  html
const renderTweets = function(tweets) {
  for(const elment in tweets){
    const tweetData=tweets[elment]
    const $tweet=createTweetElement(tweetData);
    $('.tweets-container').append($tweet)
  }
}
//manipulate the dom with jquery
const createTweetElement = function(tweet) {
  let $tweet = ` <article class="tweet">
  <header>
    <div class="tweeter-header">
      <div>
       <img id= 'image-src' src="${tweet.user.avatars}">
        <p id='name-id'>${tweet.user.name}</p>
      </div>
      <span>${tweet.user.handle}</span>
    </div>
  </header>
    <p id="tweet-para">${tweet.content.text}</p>
    <hr>
    <footer class="tweeet-footer">
      <div>
        <span>${timeago.format(tweet.created_at)}</span>
      </div>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
</article>`
  // ...
  return $tweet;
}
// enderTweets(data)

$("#new-tweet-form").on("submit",function(event){
  event.preventDefault();
  //validation
  if($('#word-box').val() === '') {
   $('#tweet-empty-error').slideDown();
   $('#tweet-long-error').slideUp();
  } else if($('#word-box').val().length >140) {
    $('#tweet-empty-error').slideUp();
    $('#tweet-long-error').slideDown();
  } else{
    $('#tweet-empty-error').slideUp();
    $('#tweet-long-error').slideUp();
   
  //shows all tweets
  const serializedData=$(this).serialize();
  $.post('/tweets',serializedData,(response)=>{
    console.log('line 60',serializedData)
    loadtweets();
    $('#word-box').val('');
    $('#text-counter').text('140')
  })
}
})
})