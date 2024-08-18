// Menambahkan event listener pada tombol dengan ID 'send-button'
// Fungsi ini akan dipanggil ketika tombol diklik
document.getElementById('send-button').addEventListener('click', async function () {

    // Mengambil nilai input dari elemen dengan ID 'user-input'
    const userInput = document.getElementById('user-input').value;

    // Validasi: Jika input kosong atau hanya berisi spasi, maka tidak melakukan apapun
    if (userInput.trim() === "") return;

    // Menambahkan pesan pengguna ke dalam chat
    // Parameter pertama adalah label pengirim ('Kamu'), dan parameter kedua adalah pesan pengguna
    addMessageToChat('Kamu', userInput);

    // Memanggil fungsi getAIResponse secara asinkron untuk mendapatkan respons dari AI
    const response = await getAIResponse(userInput);

    // Menambahkan respons AI ke dalam chat
    // Parameter pertama adalah label pengirim ('AI'), dan parameter kedua adalah pesan dari AI
    addMessageToChat('AI', response);

    // Mengosongkan input pengguna setelah pesan dikirim
    document.getElementById('user-input').value = '';
});


// Fungsi untuk menambahkan pesan ke dalam chat
// Parameter 'sender' adalah pengirim pesan ('Kamu' atau 'AI')
// Parameter 'message' adalah teks pesan yang akan ditampilkan
function appendChatMessage(sender, message) {

    // Mengambil elemen dengan ID 'chat-messages' sebagai wadah untuk menampilkan pesan
    const chatContainer = document.getElementById('chat-messages');

    // Membuat elemen div baru untuk pesan chat
    const chatMessage = document.createElement('div');

    // Menambahkan class 'chat-message' ke elemen div baru untuk styling
    chatMessage.classList.add('chat-message');

    // Mengisi elemen div dengan pesan format: "<strong>Sender:</strong> Message"
    chatMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;

    // Menambahkan elemen pesan ke dalam wadah chat
    chatContainer.appendChild(chatMessage);

    // Mengatur scroll wadah chat ke bagian paling bawah untuk menampilkan pesan terbaru
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Fungsi untuk menambahkan pesan ke dalam elemen chat
// Parameter 'sender' adalah pengirim pesan ('Kamu' atau 'AI')
// Parameter 'message' adalah teks pesan yang akan ditampilkan
function addMessageToChat(sender, message) {

    // Mengambil elemen dengan ID 'chat-messages' yang berfungsi sebagai wadah untuk menampilkan pesan
    const chatMessages = document.getElementById('chat-messages');

    // Membuat elemen div baru untuk menampung pesan chat
    const messageElement = document.createElement('div');

    // Menambahkan class 'chat-message' ke elemen div baru untuk styling
    messageElement.className = 'chat-message';

    // Mengisi elemen div dengan konten: "<strong>Sender:</strong> Message"
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;

    // Menambahkan elemen pesan ke dalam elemen 'chat-messages'
    chatMessages.appendChild(messageElement);

    // Mengatur scroll elemen 'chat-messages' ke bagian paling bawah
    // untuk memastikan pesan terbaru selalu terlihat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// Fungsi asinkron untuk mendapatkan respons dari AI berdasarkan input pengguna
// Parameter 'userInput' adalah teks yang dimasukkan oleh pengguna
async function getAIResponse(userInput) {

    // API key yang dibutuhkan untuk mengakses layanan AI (harus diisi)
    const apikey = "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"; // Masukkan API key Anda di sini

    // Melakukan permintaan POST ke API Groq untuk mendapatkan respons AI
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST', // Metode HTTP yang digunakan adalah POST
        headers: {
            'Content-Type': 'application/json', // Menentukan tipe konten yang dikirimkan sebagai JSON
            Authorization: `Bearer ${apikey}`, // Otorisasi menggunakan API key yang diberikan
        },
        body: JSON.stringify({ // Mengirimkan data dalam format JSON
            messages: [
                {
                    role: "user", // Menetapkan peran sebagai pengguna (user)
                    content: userInput, // Mengisi konten dengan input dari pengguna
                },
            ],
            model: "llama3-8b-8192", // Model AI yang digunakan untuk menghasilkan respons
        }),
    });

    // Mengurai respons JSON yang diterima dari API
    const { choices } = await response.json();

    // Mengembalikan pesan respons dari AI setelah memotong spasi di awal/akhir teks
    return choices[0].message.content.trim();
}

