// GET: gets chats from api
function getChats() {
    fetch('http://34.210.35.174:7000')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            // render data
            var chat = document.getElementById("chat-area");
            
            while (chat.firstChild) {
                chat.removeChild(chat.firstChild);
            }

            for (var i = 0; i < data.length; i++) {
                var div = document.createElement("div");
                div.style.width = "50%";
                div.style.height = "auto";
                div.style.background = "#043644";
                div.style.color = "#fff";
                div.style.padding = "10px";
                div.style.borderRadius = "5px";
                div.style.marginBottom = "10px";
                div.style.fontFamily = "Arial";
                div.style.fontSize = "15px";

                var node = document.createTextNode(data[i].nick + ": " + data[i].text);

                div.appendChild(node);
                chat.appendChild(div);
            }
        })
}

// submits message
function submitMessage() {
    var student_id = parseInt(document.getElementById("id-box").value);
    var text = document.getElementById("text-box").value;
    var nick = document.getElementById("nick-box").value;

    // verify fields

    if (student_id === "" || nick === "" || text === "") {
        // empty fields
        alert("One or more fields are emtpy. Please fill all fields.");
    } else {
        // non empty fields
        // check for text < 140 chars
        if (text.length <= 140) {
            // continue
            console.log('preparing to send message');
            postMessage('http://34.210.35.174:7000', {student_id, text, nick});
        } else {
            // more than 140 chars
            alert("Text field with more than 140 characters.")
        }
    }
    
}

function postMessage(url, data) {
    console.log(JSON.stringify(data));
    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {}       
    })
    .then(function(response) {
        console.log('before return');
        return response.json();
        getChats();      
    })
    .catch(function(error) {
        console.log(error);
    })
}