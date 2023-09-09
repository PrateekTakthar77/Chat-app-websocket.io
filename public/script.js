const socket = io();

const message = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

const userName = prompt("Enter Your Name PLease!");

socket.emit("user:join", userName);
socket.on("global:message", (message) => {
    message.innerHTML += `<p class="Join_message">${message}</p>`;
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    message.innerHTML += `<div class="sent_message_container>
    <p class="your_name">you</p>
    <p class = "sent_message">${input.value}</p>
    </div>`
    socket.emit("message:send", { name: userName, message: input.value });
    input.value = "";
})

socket.on("message:recieve", (payload) => {
    message.innerHTML += `
    <div class = "receive_message_conatiner>
    <p class="reciever_name">${payload.name}</p>
    <p class = "sent_message">${payload.message}</p>"`
})