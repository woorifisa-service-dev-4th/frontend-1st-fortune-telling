import express from "express";
import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();


// OpenAI API 초기화
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Express 애플리케이션 초기화
const app = express();
const port = 3000;
app.use(express.static('public')); 
// JSON 요청 본문을 처리하기 위한 미들웨어
app.use(express.json());

app.get('/', (_, response) => {
    response.sendFile('index.html');
  })


// 메시지 처리 엔드포인트
app.post("/chat", async (req, res) => {
    const { message , year} = req.body; // 요청에서 메시지 추출

    if (!message) {
        return res.status(400).send({ error: "Message is required" });
    }

    try {
        // OpenAI API 호출
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system","content": " 너는 띠별 운세 전문가야 년도에 맞는 띠를 말해주면 그 띠에따른 오늘의 운세를 말해줘 운세 지금부터 입력받으면 그에따른 운세를 말하는거야"},
                {"role": "user", "content": `나는 ${year}년생 ${message}띠야 이것을 바탕으로 2025년 신년 운세를 말해줘 `}
            ],
            stream: true,
            temperature: 0,
            top_p: 0.1
        });
        
        // 응답을 스트리밍 방식으로 처리
        let responseText = "";
        for await (const chunk of stream) {
            responseText += chunk.choices[0]?.delta?.content || "";
            
        }
        // console.log(`내띠는 ${message}야`);
        console.log(`${year}년 ${message}띠`);
        // OpenAI 응답 반환
      res.status(200).send({ response: responseText });
    } catch (error) {
        console.error("오류 발생:", error.message);
        res.status(500).send({ error: error.message });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`Express 서버가 http://localhost:${port}에서 실행 중입니다.`);
});
