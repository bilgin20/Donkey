
//sonradan eklenen mainjs
const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

// Firebase integration setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA5x-Diw48LKjSJgsnp1IxsVLnqn5D4BTE",
    authDomain: "donkey-75269.firebaseapp.com",
    databaseURL: "https://donkey-75269-default-rtdb.firebaseio.com",
    projectId: "donkey-75269",
    storageBucket: "donkey-75269.appspot.com",
    messagingSenderId: "946981381400",
    appId: "1:946981381400:web:c23b2dafdb07f1a9a8ea6d",
    measurementId: "G-Q3EG10TMGD"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let userId = null; // Kullanıcı ID'sini burada tanımlıyoruz

const userRef = (userId) ? ref(database, `users/${userId}`) : null;

function saveToFirebase() {
    if (userId) {
        set(userRef, {
            coins: localStorage.getItem('coins'),
            total: localStorage.getItem('total'),
            power: localStorage.getItem('power'),
            count: localStorage.getItem('count'),
            lastRewardDay: localStorage.getItem('lastRewardDay'),
            currentStreak: localStorage.getItem('currentStreak')
        });
    }
}

onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        localStorage.setItem('coins', data.coins || '0');
        localStorage.setItem('total', data.total || '500');
        localStorage.setItem('power', data.power || '500');
        localStorage.setItem('count', data.count || '1');
        localStorage.setItem('lastRewardDay', data.lastRewardDay || '0');
        localStorage.setItem('currentStreak', data.currentStreak || '0');
        updateDisplay();
    }
});

function updateDisplay() {
    h1.textContent = Number(localStorage.getItem('coins')).toLocaleString();
    document.querySelector('#total').textContent = `/${localStorage.getItem('total')}`;
    document.querySelector('#power').textContent = localStorage.getItem('power');
}

// Telegram'dan gelen kullanıcı verisini işleme
function handleTelegramLogin(data) {
    userId = data.user_id; // Telegram'dan gelen user_id
    const userRef = ref(database, `users/${userId}`);

    // Kullanıcıyı Firebase'e kaydet
    set(userRef, {
        coins: 0,
        total: 500,
        power: 500,
        count: 1,
        lastRewardDay: 0,
        currentStreak: 0
    }).then(() => {
        console.log('Kullanıcı başarıyla kaydedildi:', userId);
    }).catch((error) => {
        console.error('Kullanıcı kaydetme hatası:', error);
    });
}

// Örneğin, Telegram'dan gelen veriyi almak için bir endpoint oluşturabilirsiniz
// Bu endpoint, Telegram'dan gelen callback verilerini alacak
// app.post('/telegram-login', (req, res) => {
//     const data = req.body; // Telegram'dan gelen veriyi alın
//     handleTelegramLogin(data);
//     res.sendStatus(200);
// });

// Orijinal kod burada başlıyor
let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count');

if (coins == null) {
    localStorage.setItem('coins', '0');
    h1.textContent = '0';
} else {
    h1.textContent = Number(coins).toLocaleString();
}

if (total == null) {
    localStorage.setItem('total', '500');
    body.querySelector('#total').textContent = '/500';
} else {
    body.querySelector('#total').textContent = `/${total}`;
}

if (power == null) {
    localStorage.setItem('power', '500');
    body.querySelector('#power').textContent = '500';
} else {
    body.querySelector('#power').textContent = power;
}

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
        saveToFirebase();
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

setInterval(() => {
    count = localStorage.getItem('count');
    power = localStorage.getItem('power');
    if (Number(total) > power) {
        localStorage.setItem('power', `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        saveToFirebase();
    }
}, 1000);

const rewardBtn = document.createElement('button');
const rewardInfo = document.createElement('p');
rewardBtn.textContent = 'Günlük Ödül Al';
rewardInfo.textContent = '';
body.appendChild(rewardInfo);
body.appendChild(rewardBtn);

let lastRewardDay = Number(localStorage.getItem('lastRewardDay')) || 0;
let currentStreak = Number(localStorage.getItem('currentStreak')) || 0;

function updateCoinsDisplay() {
    h1.textContent = Number(localStorage.getItem('coins')).toLocaleString();
}

function getDailyReward() {
    const today = new Date().getDate();
    if (today !== lastRewardDay) {
        currentStreak = today - lastRewardDay === 1 ? currentStreak + 1 : 1;

        let reward = 0;
        if (currentStreak === 1) reward = 500;
        else if (currentStreak === 2) reward = 1000;
        else if (currentStreak === 3) reward = 2000;
        else if (currentStreak === 4) reward = 3000;
        else if (currentStreak === 5) reward = 4000;
        else if (currentStreak === 6) reward = 5000;
        else if (currentStreak >= 7) reward = 6000;

        coins = Number(localStorage.getItem('coins')) + reward;
        lastRewardDay = today;
        localStorage.setItem('coins', coins.toString());
        localStorage.setItem('lastRewardDay', today.toString());
        localStorage.setItem('currentStreak', currentStreak.toString());

        updateCoinsDisplay();
        rewardInfo.textContent = `Günlük ödül alındı: ${reward.toLocaleString()}! Toplam coin: ${coins.toLocaleString()}`;
        saveToFirebase();
    } else {
        rewardInfo.textContent = 'Bugünün ödülünü zaten aldınız!';
    }
}

rewardBtn.addEventListener('click', getDailyReward);

const powerDisplay = body.querySelector('#power');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [
    { id: 1, name: "Görev 1", points: 5, image: "task1.png", link: "https://example.com/task1" },
    { id: 2, name: "Görev 2", points: 10, image: "task2.png", link: "https://example.com/task2" },
    { id: 3, name: "Görev 3", points: 15, image: "task3.png", link: "https://example.com/task3" }
];

if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `
        <a href="${task.link}" class="task-link" target="_blank">
            <img src="${task.image}" alt="${task.name}">
            <span>${task.name} (${task.points} puan)</span>
            <span class="checkmark">✔️</span>
        </a>
    `;
    taskDiv.dataset.points = task.points;
    document.querySelector('#tasks').appendChild(taskDiv);

    taskDiv.addEventListener('click', (e) => {
        if (!taskDiv.classList.contains('completed')) {
            e.preventDefault();
            coins = Number(localStorage.getItem('coins')) + task.points;
            localStorage.setItem('coins', `${coins}`);
            h1.textContent = `${coins.toLocaleString()}`;
            taskDiv.classList.add('completed');
            taskDiv.querySelector('.checkmark').style.display = 'block';
            saveToFirebase();
        }
    });
});
