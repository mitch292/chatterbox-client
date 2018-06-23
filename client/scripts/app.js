// YOUR CODE HERE:
var app = {
    messages: [],
    server: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
    init: function() {
        $('.username').on('click', function() {
            let name = $(this).data("user")
            app.handleUsernameClick(name)
        });

        $('#messageSubmit').on('click', function() {
          let message = $('#message').value;
          handleSubmit(message);
        });
    },

    send:  function(message) {
        $.ajax({
            // This is the url you should use to communicate with the parse API server.
            url: this.server,
            type: 'POST',
            data: JSON.stringify(message),
            contentType: 'application/json',
            success: function (data) {
              console.log('chatterbox: Message sent');
            },
            error: function (data) {
              // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
              console.error('chatterbox: Failed to send message', data);
            }
          });
    },
    fetch: function() {
        $.ajax({
            // This is the url you should use to communicate with the parse API server.
            url: this.server,
            type: 'GET',
            success: function (data) {
            //   this.messages.push(data);
              renderMessage(data)
              console.log('chatterbox: Messages received');
            },
            error: function (data) {
              // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
              console.error('chatterbox: Failed to receive messages');
            }
          });
    },
    clearMessages: function() {
      //create a clear messages button on the html

      //click handler funciton that would remove all html elements with id of chats
      $('#chats').empty();
    },
    renderMessage: function(message) {

        // if ($('#chats').children().length)
        //our site will have an input field with a submit button
        //upon click of submit, grab the text and post and fetch message 
        $('#chats').append(`<div class="username" data-user=${message.username}>
        ${message.username}:  ${message.text} </div>`);
    },
    renderRoom: function(message) {
        $('#roomSelect').append(`<div id="#roomSelect"> ${message} </div>`);

    },
    handleUsernameClick: function(name) {
        console.log(`You just befriended ${name}`);
    },
    submit: function(message) {
      renderMessage({
          username: 'Current User',
          message: message
      });
    }




};