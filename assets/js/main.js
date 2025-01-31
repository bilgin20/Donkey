token = '7150415313:AAFJPMMUqZjxcquV_-IFCHVcySTWNs5T1ZQ'
const body = document.body;
const image = body.querySelector('#coin');
const h1 = body.querySelector('h1');

let coins = localStorage.getItem('coins');
let total = localStorage.getItem('total');
let power = localStorage.getItem('power');
let count = localStorage.getItem('count')

if(coins == null){
    localStorage.setItem('coins' , '0');
    h1.textContent = '0';
}else{
    h1.textContent = Number(coins).toLocaleString();
}

if(total == null){
    localStorage.setItem('total' , '500')
    body.querySelector('#total').textContent = '/500';
}else {
    body.querySelector('#total').textContent = `/${total}`;
}


if(power == null){
    localStorage.setItem('power' , '500');
    body.querySelector('#power').textContent = '500';
}else{
    body.querySelector('#power').textContent = power;
}


if(count == null){
    localStorage.setItem('count' , '1')
}

image.addEventListener('click' , (e)=> {

    let x = e.offsetX;
    let y = e.offsetY;


    navigator.vibrate(5);

    coins = localStorage.getItem('coins');
    power = localStorage.getItem('power');
    
    if(Number(power) > 0){
        localStorage.setItem('coins' , `${Number(coins) + 1}`);
        h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;
    
        localStorage.setItem('power' , `${Number(power) - 1}`);
        body.querySelector('#power').textContent = `${Number(power) - 1}`;
    } 

    if(x < 150 & y < 150){
        image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x < 150 & y > 150){
        image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
    }
    else if (x > 150 & y > 150){
        image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
    }
    else if (x > 150 & y < 150){
        image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
    }


    setTimeout(()=>{
        image.style.transform = 'translate(0px, 0px)';
    }, 100);

    body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
});

setInterval(()=> {
    count = localStorage.getItem('count')
    power = localStorage.getItem('power');
    if(Number(total) > power){
        localStorage.setItem('power' , `${Number(power) + Number(count)}`);
        body.querySelector('#power').textContent = `${Number(power) + Number(count)}`;
        body.querySelector('.progress').style.width = `${(100 * power) / total}%`;
    }
}, 1000);

// Günlük ödül sistemi ekleme
const rewardBtn = document.createElement('button');
const rewardInfo = document.createElement('p');

rewardBtn.textContent = 'Claim Daily Reward';
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
    rewardInfo.textContent = `Daily reward claimed: ${reward.toLocaleString()}! Total coins: ${coins.toLocaleString()}`;
  } else {
    rewardInfo.textContent = 'You have already claimed today\'s reward!';
  }
}

rewardBtn.addEventListener('click', getDailyReward);
