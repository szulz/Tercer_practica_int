const socket = io();
let productForm = document.getElementById("chat_form");

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let chatBox = document.getElementById('mensaje').value
    socket.emit("msgFront", {
        msg: chatBox
    })
})


socket.on('msgBack', (data) => {
    console.log(JSON.stringify(data));
})