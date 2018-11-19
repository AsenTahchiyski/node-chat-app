const socket = io();
socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('H:mm');
  const li = $('<li></li>');
  li.text(`${formattedTime} ${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = $('<li></li>');
  const a = $('<a target="_blank">My current location</a>');
  li.text(`${formattedTime} ${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  const messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

const locationButton = $('#send-location');
locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Oh noes! Geolocation not supported by your browser!')
  }

  locationButton.attr('disabled', 'disabled').text('Sending...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longtitude: position.coords.longitude
    });
  }), function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  }
});