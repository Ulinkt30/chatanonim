document.addEventListener('DOMContentLoaded', () => {
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Fungsi untuk memuat pesan dari server
    const loadMessages = async () => {
        const response = await fetch('/messages');
        const messages = await response.json();

        messagesDiv.innerHTML = '';
        messages.forEach(msg => {
            const div = document.createElement('div');
            div.textContent = `${new Date(msg.timestamp).toLocaleString()} - ${msg.message}`;
            messagesDiv.appendChild(div);
        });
    };

    // Kirim pesan ke server
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (message) {
            await fetch('/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            messageInput.value = '';
            loadMessages();
        }
    });

    // Muat pesan pertama kali
    loadMessages();
});
