document.addEventListener('DOMContentLoaded', function () {
    getChatMessages();
});

function getChatMessages() {
    fetch('/get_chat_messages/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ message: '' })
    })
    .then(response => response.json())
    .then(data => {
        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = '';
        data.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.innerHTML = `<strong>${message.sender}:</strong> ${message.message} <span class="timestamp">${message.timestamp}</span>`;
            messageContainer.appendChild(messageElement);
        });
    })
    .catch(error => console.error('Error fetching chat messages:', error));
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message !== '') {
        fetch('/get_chat_messages/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ message })
        })
        .then(() => {
            messageInput.value = '';
            getChatMessages();
        })
        .catch(error => console.error('Error sending message:', error));
    }
}

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
