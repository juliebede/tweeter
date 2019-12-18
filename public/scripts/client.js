/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // Code from https://stackoverflow.com/questions/47253206/convert-milliseconds-to-timestamp-time-ago-59m-5d-3m-etc-in-javascript to create a timestamp
  function formatTime(timeCreated) {

    var diff = Math.floor((Date.now() - timeCreated) / 1000);
    var interval = Math.floor(diff / 31536000);
  
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
 // Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $("#tweetsContainer").append(newTweet);
  }
}

const createTweetElement = function(tweetObject) {
  let $tweet = $("<article>");
  let $header = $("<header>").addClass("tweetHeader");
  let $tweetText = $("<section>").addClass("description");
  let $footer = $("<footer>").addClass("tweetFooter");
  $header.append(`<img class="headerAvatar" src="${tweetObject.user.avatars}">
  <p class="name">${tweetObject.user.name}</p>
  <p class="handle">${tweetObject.user.handle}</p>`);
  $tweetText.append(`<p>${tweetObject.content.text}</p>`);
  const time = formatTime(tweetObject.created_at);
  $footer.append(`<p class="timestamp">${time}</p>`);
  $footer.append(`<p class="icons">
  <span>&#9873</span>
  <span> &#10562 </span>
  <span> &#10084 </span>
  </p>`)
  $tweet.append($header).append($tweetText).append($footer);
  return $tweet;
}

renderTweets(data);

})
