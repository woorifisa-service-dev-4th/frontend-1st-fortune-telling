       // URL에서 파라미터 가져오기
       const urlParams = new URLSearchParams(window.location.search);
       const year = parseInt(urlParams.get('year'));
       const name = urlParams.get('name');

       // 띠 계산
       const zodiacSigns = ["원숭이", "닭", "개", "돼지", "쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양"];
       const zodiacImages = {
           "쥐": "img/mouse.png",
           "소": "img/ox.png",
           "호랑이": "img/tiger.png",
           "토끼": "img/rabbit.png",
           "용": "img/dragon.png",
           "뱀": "img/snake.png",
           "말": "img/horse.png",
           "양": "img/sheep.png",
           "원숭이": "img/monkey.png",
           "닭": "img/rooster.png",
           "개": "img/dog.png",
           "돼지": "img/pig.png"
       };
       const zodiac = zodiacSigns[year % 12];
       console.log(zodiac);
       
       if(zodiac){
            
            const xhr = new XMLHttpRequest();


            xhr.onload=()=>{
                const responseData = xhr.response;
                const parsedData = JSON.parse(responseData);

                document.getElementById('fortune-content').textContent = parsedData.response;
                document.getElementById('fortune-title').textContent = `${name}님의 띠는 ${zodiac}입니다!`;
                // document.getElementById('fortune-content').textContent = `${name}님, ${zodiac} 띠의 해운세는 매우 좋습니다! 행복한 한 해가 되시길 바랍니다.`;

            }

            const CHAT_GPT_URL = '/chat';
            
            const data= {
                message :zodiac,
                year
            }

            const stringifiedData = JSON.stringify(data);


            xhr.open('POST', CHAT_GPT_URL );

            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(stringifiedData);

       }
       
       // 이미지 업데이트
       
       const zodiacImage = document.getElementById('zodiac-image');
       zodiacImage.src = zodiacImages[zodiac];
       zodiacImage.alt = `${zodiac} 이미지`;

       // 링크 복사 기능
       function copyLink() {
           const dummy = document.createElement('textarea');
           dummy.value = window.location.href;
           document.body.appendChild(dummy);
           dummy.select();
           document.execCommand('copy');
           document.body.removeChild(dummy);
           alert('링크가 복사되었습니다!');
       }
