const openModalBtn = document.getElementById('openModalBtn');
const walletModal = document.getElementById('walletModal');
const closeBtn = document.querySelector('.close-btn');
const connectWalletBtn = document.getElementById('connectWallet');
const cancelWalletBtn = document.getElementById('cancelWallet');
const statusMessage = document.getElementById('statusMessage');

openModalBtn.addEventListener('click', () => {
    walletModal.style.display = 'flex';
    statusMessage.textContent = ''; // Clear any previous message on modal open
});

closeBtn.addEventListener('click', () => {
    walletModal.style.display = 'none';
    statusMessage.textContent = ''; // Clear message on modal close
});

window.addEventListener('click', (event) => {
    if (event.target === walletModal) {
        walletModal.style.display = 'none';
        statusMessage.textContent = ''; // Clear message when clicking outside modal
    }
});

connectWalletBtn.addEventListener('click', () => {
    statusMessage.textContent = 'Connecting to your TON wallet...';

    setTimeout(() => {
        statusMessage.textContent = 'Oops, try again. Something went wrong!'; // Correct spelling
    }, 2000);
});

cancelWalletBtn.addEventListener('click', () => {
    walletModal.style.display = 'none';
    statusMessage.textContent = ''; // Clear message on cancel
});
