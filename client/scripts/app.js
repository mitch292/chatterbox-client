// YOUR CODE HERE:
class App {
    constructor() {
        this.messages = [];
        this.server = 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages'

    }
    init() {
        
    }
    send(message) {
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
    }
    fetch() {
        $.ajax({
            // This is the url you should use to communicate with the parse API server.
            url: this.server,
            type: 'GET',
            success: function (data) {
            //   this.messages.push(data);
              console.log('chatterbox: Messages received');
            },
            error: function (data) {
              // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
              console.error('chatterbox: Failed to receive messages');
            }
          });
    }
    clearMessages() {
      //create a clear messages button on the html

      //click handler funciton that would remove all html elements with id of chats
      $('#chats').remove();
    }
    renderMessage(message) {
        debugger;
        //our site will have an input field with a submit button
        //upon click of submit, grab the text and post and fetch message 
        $('#chats').prepend("<p>"+ message.text + "</p>");
    }




}

let app = new App()

// $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message', data);
//     }
//   });
  var message = {
    username: 'shawndrost',
    text: 'TEST',
    roomname: 'TEST'
  };
  app.fetch();