/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Code modified from
// https://stackoverflow.com/questions/47253206/convert-milliseconds-to-timestamp-time-ago-59m-5d-3m-etc-in-javascript
// to create a timestamp
function formatTime(timeCreated) {
  const diff = Math.floor((Date.now() - timeCreated) / 1000);
  let interval = Math.floor(diff / 31536000);

  if (interval >= 1) {
    return interval + " years ago";
  }
  interval = Math.floor(diff / 2592000);
  if (interval >= 1) {
    return interval + " months ago";
  }
  interval = Math.floor(diff / 604800);
  if (interval >= 1) {
    return interval + " weeks ago";
  }
  interval = Math.floor(diff / 86400);
  if (interval >= 1) {
    return interval + " days ago";
  }
  interval = Math.floor(diff / 3600);
  if (interval >= 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(diff / 60);
  if (interval >= 1) {
    return interval + " minutes ago";
  }
  return "<1 minute ago";
}


const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET'})
  .then(function(data) {
    $("#tweetsContainer").empty();
    renderTweets(data);
  })
}



// Renders data into HTML
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $("#tweetsContainer").prepend(newTweet);
  } 
}

// Creates the article using given data
const createTweetElement = function(tweetObject) {
  // Initialization of each child element and it's class
  let $tweet = $("<article>");
  let $header = $("<header>").addClass("tweetHeader");
  let $tweetText = $("<section>").addClass("description");
  let $footer = $("<footer>").addClass("tweetFooter");

  //Appended data details for each child
  $header.append(`<img class="headerAvatar" src="${tweetObject.user.avatars}">
                  <p class="name">${tweetObject.user.name}</p>
                  <p class="handle">${tweetObject.user.handle}</p>`);

  $tweetText.append($("<p>").text(tweetObject.content.text));
  
  const time = formatTime(tweetObject.created_at);
  $footer.append(`<p class="timestamp">${time}</p>`);
  $footer.append(`<p class="icons">
                  <span>&#9873</span>
                  <span> &#10562 </span>
                  <span> &#10084 </span>
                  </p>`)
  
  // Appended all children to article
  $tweet.append($header).append($tweetText).append($footer);
  return $tweet;
}

$(document).ready(function () {

  loadTweets()

  const $tweetButton = $('#tweetForm');

  $tweetButton.submit(function( event ) {
    console.log(`{ ${$tweetButton.serialize()} }`)
    const formButton = ($(this).find($("span")))
    event.preventDefault();
    if ($(formButton).text() < 0) {
      let $error = $($(this).parent()).find("#errorMessage");
      $error.text("Tweet is too long.")
    } else if ($(formButton).text() == 140) {
      alert('Tweet is empty.')
    } else {
      console.log('julie')
      $.ajax({
        url: /tweets/, // url where to submit the request
        type : "POST", 
        dataType : 'text', // data type
        data : $tweetButton.serialize(), // post data
      }).done(function() {
          loadTweets()
      })
      $($(this).find($("#tweet"))).val('');  // makes input empty again
      $($(this).find($(".counter"))).text('140'); // brings counter back to 140
    }
  });

  // Slides the form up and down using arrow on top right
  const $formSlidingButton = $(document).find('#arrow');
  $formSlidingButton.click(function(event) {
    const form = $(this).parent().siblings(".container").find(".new-tweet");
    if ($(form).attr("style") === "display: none;") {
      $(form).slideDown();
    } else {
      $(form).slideUp();
    }
  })
});

