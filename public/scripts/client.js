$(document).ready(()=>{
  const loadtweets=function(){
   $.ajax({
     url: "/tweets",
     method: "GET",
     dataType:"json",
     success:(tweets)=>{
       console.log("data line 9",tweets)
       renderTweets(tweets)
     },
     error:(err)=>{
       console.log(`line 39 there was an error:${err}`)
     }
   })
  }

const renderTweets = function(tweets) {
  for(const elment in tweets){
    const tweetData=tweets[elment]
    const $tweet=createTweetElement(tweetData);
    $('.tweets-container').append($tweet)
  }
}

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
  if($('#word-box').val() === '') {
   $('#tweet-empty-error').slideDown();
   $('#tweet-long-error').slideUp();
  } else if($('#word-box').val().length >140) {
    $('#tweet-empty-error').slideUp();
    $('#tweet-long-error').slideDown();
  } else{
    $('#tweet-empty-error').slideUp();
    $('#tweet-long-error').slideUp();
   

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