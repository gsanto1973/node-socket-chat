var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios!');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


// Escuchar información
socket.on('connect', function () {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function (resp) {
        //console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp);
    });
});


// Escuchar información
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// Si no se comentan las líneas, cada que alguien se conecte se enviará un mensaje
// Se debe controlar la manejra de enviar mensajes a todos
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
}); */


// Escuchar información
socket.on('crearMensaje', function (mensaje) {

    //console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();
});


// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function (personas) {

    console.log(personas);
    renderizarUsuarios(personas);
});


// Mensajes privados
socket.on('mensajePrivado', function (mensaje) {

    console.log('Mensaje privado:', mensaje);
})
