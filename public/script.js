document.getElementById('zodiac-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const year = parseInt(document.getElementById('birth-year').value);
    const zodiacs = [
        { name: "쥐", image: "rat.jpg" },
        { name: "소", image: "ox.jpg" },
        { name: "호랑이", image: "tiger.jpg" },
        { name: "토끼", image: "rabbit.jpg" },
        { name: "용", image: "dragon.jpg" },
        { name: "뱀", image: "snake.jpg" },
        { name: "말", image: "horse.jpg" },
        { name: "양", image: "goat.jpg" },
        { name: "원숭이", image: "monkey.jpg" },
        { name: "닭", image: "rooster.jpg" },
        { name: "개", image: "dog.jpg" },
        { name: "돼지", image: "pig.jpg" }
    ];

    const zodiacIndex = (year - 4) % 12;
    const zodiac = zodiacs[zodiacIndex];

    document.getElementById('zodiac-image').src = zodiac.image;
    document.getElementById('zodiac-image').alt = zodiac.name;
    document.getElementById('result').textContent = `당신의 십이지간은 ${zodiac.name}입니다!`;
});
