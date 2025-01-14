// Elementleri seçme
const openModalBtn = document.getElementById('openModalBtn');
const walletModal = document.getElementById('walletModal');
const closeBtn = document.querySelector('.close-btn');
const connectWalletBtn = document.getElementById('connectWallet');
const cancelWalletBtn = document.getElementById('cancelWallet');
const statusMessage = document.getElementById('statusMessage');

// Modal açma
openModalBtn.addEventListener('click', () => {
    walletModal.style.display = 'flex';
    statusMessage.textContent = ''; // Önceki mesajları temizle
});

// Modal kapama butonuyla kapama
closeBtn.addEventListener('click', () => {
    walletModal.style.display = 'none';
    statusMessage.textContent = ''; // Mesajı temizle
});

// Modal dışına tıklama ile kapama
window.addEventListener('click', (event) => {
    if (event.target === walletModal) {
        walletModal.style.display = 'none';
        statusMessage.textContent = ''; // Mesajı temizle
    }
});

// Cüzdan bağlama simülasyonu
connectWalletBtn.addEventListener('click', () => {
    statusMessage.textContent = 'Connecting to your TON wallet...';

    setTimeout(() => {
        // Simülasyon: Gerçek bağlantı yerine başarı/başarısızlık örneği
        const isConnected = Math.random() > 0.5; // Rastgele başarı/başarısızlık
        if (isConnected) {
            statusMessage.textContent = 'Wallet connected successfully!';
            setTimeout(() => {
                walletModal.style.display = 'none'; // Başarılı bağlantıda modalı kapat
            }, 1000);
        } else {
            statusMessage.textContent = 'Oops, try again. Something went wrong!';
        }
    }, 2000);
});

// İptal butonuna tıklama
cancelWalletBtn.addEventListener('click', () => {
    walletModal.style.display = 'none';
    statusMessage.textContent = ''; // Mesajı temizle
});
