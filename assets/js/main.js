const body = document.body;
const clanButton = document.querySelector('#clan');  // Clan butonunu seçiyoruz
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

const DAILY_BONUS = 1000;

clanButton.addEventListener('click', () => {
    power = Number(localStorage.getItem('power') || '0') + DAILY_BONUS;
    localStorage.setItem('power', power.toString());
    body.querySelector('#power').textContent = power.toString();
    alert(`Günlük bonus eklendi: ${DAILY_BONUS} puan!`);
});

if(coins == null){
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();
}

if(total == null){
    total = 500;
    localStorage.setItem('total', total.toString());
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if(power == null){
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

if(count == null){
    localStorage.setItem('count', '1');
}
