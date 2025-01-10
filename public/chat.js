// URL에서 파라미터 가져오기
const urlParams = new URLSearchParams(window.location.search);
const year = parseInt(urlParams.get('year'), 10);
const name = urlParams.get('name');
const luck = urlParams.get('luck');
const month = urlParams.get('month');
const day = urlParams.get('day');

// 띠 계산
const zodiacSigns = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양'];
const zodiacImages = {
  쥐: 'img/mouse.png',
  소: 'img/ox.png',
  호랑이: 'img/tiger.png',
  토끼: 'img/rabbit.png',
  용: 'img/dragon.png',
  뱀: 'img/snake.png',
  말: 'img/horse.png',
  양: 'img/sheep.png',
  원숭이: 'img/monkey.png',
  닭: 'img/rooster.png',
  개: 'img/dog.png',
  돼지: 'img/pig.png',
};

const zodiac = zodiacSigns[year % 12];
console.log(zodiac);

if (zodiac) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const responseData = xhr.response;
    const parsedData = JSON.parse(responseData);
    document.getElementById('fortune-title').textContent = `${name}님의 띠는 ${zodiac}입니다!`;
    document.getElementById('fortune-content').textContent = parsedData.response;
  };

  const CHAT_GPT_URL = '/chat';

  const data = {
    zodiac,
    year,
    luck,
    month,
    day,
  };

  const stringifiedData = JSON.stringify(data);

  xhr.open('POST', CHAT_GPT_URL);

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(stringifiedData);
}

const zodiacImage = document.getElementById('zodiac-image');
zodiacImage.src = zodiacImages[zodiac];
zodiacImage.alt = `${zodiac} 이미지`;
