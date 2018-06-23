// YOUR CODE HERE:
var app = {
    messages: null,
    server: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',

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
            data: {"order": "-createdAt"},
            success: function (data) {
              app.messages = data;
              app.cleanData();
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
        $('#chats').prepend(`<div class="username" data-user=${message.username}>
        ${message.username}:  ${message.text} </div>`);
    },
    renderRoom: function(room) {
        $('#roomSelect').append(`<option id="#room"> ${room} </option>`);

    },
    handleUsernameClick: function(name) {
        console.log(`You just befriended ${name}`);
    },
    handleSubmit: function(data) {
      let message = $('#message').val();
      let ourMessage = {
        username: 'Current User',
        text: message
    };
      app.renderMessage(ourMessage);
      app.send(ourMessage);

    },
    init: function() {
        $('.username').on('click', function() {
            let name = $(this).data("user")
            app.handleUsernameClick(name)
        });
        $('#room').on('click', function(){
            let roomName = $(this).val();
            app.filterRooms(roomName);
        })

        $('#roomButton').on('click', function(){
            let roomName = $("#roomAdd").val();
            app.renderRoom(roomName);
            $('#roomAdd').val('');
        });
        $('.submit').on('click', function(){
          app.handleSubmit();
          $('#message').val('');
        });
        app.fetch();
    },
    cleanData: function() {
     //loop through messages 
       //loop through each object
       //if object value matches our regexp, skip
       //else we call renderMessage
      let rooms = {};
      let dataToParse = app.messages.results;
      let ourRegex = /[&<>`,!@$%()=+{}[\]]/g;
     _.each(dataToParse, function(message, i){
         let safeMessage = true;
         _.each(message, function(value, key, object){
             if (value) {
                if (value.match(ourRegex)){
                    console.log(value);
                    safeMessage = false;
                    // dataToParse.splice(i, 1);
                  }
             }
         })
         if (safeMessage){
           app.renderMessage(message);
           rooms[message.roomname] = message.roomname;
         }
     })
     _.each(rooms, function(room) {
         app.renderRoom(room)
     })  
      
    },
    // filterRooms: function(roomName) {
    //   let ourData = app.messages.results;
    //   app.clearMessages();
    //   _.each(ourData, function(message){
    //     if (message.roomname === roomName){
    //         app.renderMessage(our)
    //     }
    //   })
    // }




};