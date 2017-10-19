
var socket = io.connect('/czs');
socket.on('connect', function(data) {
  //socket.emit('join',{'zona':'DG'} );
  socket.emit('reqZonas');
});

socket.on('messages', function(data) {
  console.log(data);
});
socket.on('logSync', function (data) {
  console.log('dataaa!');
  console.log(data);
});
socket.on('online', function(data) {
  clients = ''
  console.log(data)
  Object.keys(data.coordinaciones).forEach(function(zona) {
    id = data.coordinaciones[zona]
    clients +=
      `
      <tr>
        <td>${zona}</td>
        <td><button class="btn btn-success" id=${id} onClick="syncClient()">Sincronizar eventos</button></td>
      </tr>
      `;
  });
  lista = document.getElementById('online');
  lista.innerHTML = clients;
});

function syncClient() {
    id=event.target.id;
    socket.emit('reqSync',id);
}
