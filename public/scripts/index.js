const socket = io("/", {
    query: {
        "username": userName,
    }
});

socket.on("new user", (username) => {
    const item = document.createElement("li");
    item.textContent = username + " joined the chat!";
    item.classList.add("list-group-item", "google-blue-bg-color");
    const list = document.querySelector(".messages ul");
    list.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("chat message", (data) => {
    var listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    // Create div element
    var divElement = document.createElement('div');
    divElement.style.display = 'flex';
    divElement.style.flexDirection = 'column';
    if(userName === data.username) {
        divElement.style.alignItems = 'end';
    }
    else {
        divElement.style.alignItems = 'start';
    }
    

    // Create b element
    var boldElement = document.createElement('b');
    boldElement.textContent = data.username;

    // Create p element
    var paragraphElement = document.createElement('p');
    paragraphElement.textContent = data.message;

    // Append b and p elements to the div
    divElement.appendChild(boldElement);
    divElement.appendChild(paragraphElement);

    // Append div element to the li
    listItem.appendChild(divElement);
    const list = document.querySelector(".messages ul");
    list.appendChild(listItem);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("gone user", (username) => {
    const item = document.createElement("li");
    item.textContent = username + " left the chat!";
    item.classList.add("list-group-item", "grey-bg-color");
    const list = document.querySelector(".messages ul");
    list.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

const form = document.querySelector("#form");
const input = document.querySelector("#input");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(input.value) {
        socket.emit("chat message", {
            message: input.value,
            username: userName,
        });
        input.value = "";
    }
});