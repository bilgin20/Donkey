const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

const DAILY_BONUS = 1000;
const lastLoginDate = localStorage.getItem('lastLoginDate');
const currentDate = new Date().toDateString();

// Günlük ödül ekleme işlemi
if (lastLoginDate !== currentDate) {
    coins = Number(coins || '0') + DAILY_BONUS;  // Coins'e günlük bonusu ekliyoruz
    localStorage.setItem('coins', coins.toString());  // coins'i güncelliyoruz
    localStorage.setItem('lastLoginDate', currentDate);  // Son giriş tarihini kaydediyoruz
}

// Eğer coins null ise, 0 olarak başlatıyoruz ve DOM'a yazdırıyoruz
if (coins == null) {
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();  // coins'i sayısal formatta gösteriyoruz
}

// Eğer total null ise, başlangıç değeri olarak 500 set ediyoruz
if (total == null) {
    total = 500;
    localStorage.setItem('total', total.toString());
    body.querySelector('#total').textContent = '/500';  // Başlangıçta 500 olarak gösteriyoruz
} else {
    body.querySelector('#total').textContent = `/${total}`;  // total'ı DOM'a ekliyoruz
}

// power'ı kontrol ediyoruz
if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

// count değerini kontrol ediyoruz
if (count == null) {
    localStorage.setItem('count', '1');
}

image.addEventListener('click', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    navigator.vibrate(5);
    
    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');
    
    if (Number(power) > 0) {
        localStorage.setItem('coins', `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;
        localStorage.setItem('power', `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    }

    if (x < 150 && y < 150) {
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x < 150 && y > 150) {
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    } else if (x > 150 && y > 150) {
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    } else if (x > 150 && y < 150) {
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }

    setTimeout(() => {
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

// power'ı her saniye artırıyoruz ve progress bar'ı güncelliyoruz
setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    if (Number(total) > power) {
        localStorage.setItem('power', `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);
