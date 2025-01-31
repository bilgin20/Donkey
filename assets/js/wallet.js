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
// toonkeper wallet orjinal çalışan kod
    <script>
      
    let isWalletConnected = false;
    let tonConnectUI = null;
//Initialize TON Connect UI  
    document.addEventListener("DOMContentLoaded", async function() {
        tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: 'https://bilgin20.github.io/Donkey/tonconnect-manifest.json',
            buttonRootId: 'ton-connect'
        });
//check if wallet is already connected
        const connectWallet = await tonConnectUI.getWallets();
        if (connectWallet) {
            isWalletConnected = true;
            console.log("Wallet is already connected", connectedWallet);
        }
    });
    // Connet Wallet
    async function connectWallet() {
        if (isWalletConnected) {
            console.log("Wallet already connected.");
            return;
        }
        try {
            const connectWallet = await tonConnectUI.connectWallet();
            if (connectWallet) {
                isWalletConnected = true;
                console.log("Wallet connected:", connectedWallet);
            }
        } catch (error) {
            console.error("Error connecting to wallet", error);
        }
    }
   // Send Transaction
    async function sentTonTransaction() {
        if (!isWalletConnected) {
            console.error("Please connect your wallet first.");
            return;
        }
        const transaction = {
            messages: [
                {
                    address: "UQBWIRtBw_keNmzkzecRm9TY8GkUU4IajzA482SV8YCIMxrn", // destination address
                    amount: "20000000" //Toncoin in nanotons (0,02 TON)
                }
            ]
        };

        try {
            const result = await tonConnectUI.sendTransaction(transaction);
            console.log("Transaction successful:", result);
        } catch (error) {
            console.error("Transaction failed", error);
        }
    }

    document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
    document.getElementById("sentTransactionBtn").addEventListener("click", sentTonTransaction);
    </script>
