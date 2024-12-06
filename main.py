from fastapi import FastAPI, responses, staticfiles
from pydantic import BaseModel
from pandas import DataFrame
from ai.model_manager import ModelManager

class Request(BaseModel):
    gender: int  # 0,1 -> 남성, 여성
    age: int  # 1,2,3,4,5,6 -> 중1, 중2, 중3, 고1, 고2, 고3
    breakfast: int  # 0,1 -> 안했다, 했다
    exercise: int  # 0,1 -> 안했다, 했다
    stress: int  # 1,2,3,4,5 -> 대단히 많이 느낀다, 많이 느낀다, 조금 느낀다, 별로 느끼지 않는다, 전혀 느끼지 않는다
    loneliness: int  # 1,2,3,4,5 -> 전혀 느끼지 않는다, 거의 느끼지 않는다, 가끔 느낀다, 자주 느낀다, 항상 느낀다
    sleep: int  # 0,1 -> 충분하다, 충분하지 않다
    anxiety: int  # 0,1 -> 자주 느끼지는 않는다, 자주 느낀다
    worry: int  # 0,1 -> 자주 하지는 않는다, 자주 한다
    anger: int  # 0,1 -> 자주 들지는 않는다, 자주 든다
    depression: int  # 0,1 -> 없다, 있다
    violence: int  # 0,1 -> 없다, 있다
    grade: int  # 1,2,3,4,5 -> 상위권, 중상위권, 중위권, 중하위권, 하위권
    economy: int  # 1,2,3,4,5 -> 풍족하다, 여유롭다, 평범하다, 빠듯하다, 부족하다
    residence: int  # 1,2,3,4,5 -> 본가, 친가/외가, 하숙/자취, 기숙사, 보육시설

class Response(BaseModel):
    risk: float
    solution: str

solution = [
    "현재 큰 위험은 없어 보이지만, 감정 체크를 꾸준히 하시면 좋겠어요.",
    "경미한 위험이 감지돼요. 상담을 통해 감정을 나누어 보는 것도 도움이 될 수 있어요.",
    "위험이 존재할 수 있어요. 전문가와 상담을 고려해보세요.",
    "불안정한 상태일 수 있어요. 전문가와 상담을 받는 것이 필요해 보여요.",
    "위험이 중간 정도예요. 상담을 통해 도움을 받는 것이 중요해요.",
    "위험이 꽤 심각할 수 있어요. 빠르게 전문가와 상담을 받는 것이 좋겠어요.",
    "매우 높은 위험이 감지돼요. 즉시 심리적 지원을 받는 것이 필요해요.",
    "생명에 위험이 있을 수 있어요. 긴급히 24시간 상담 서비스에 연락하세요.",
    "즉각적인 위험 신호예요. 전문가의 도움을 빠르게 받는 것이 중요해요.",
    "생명에 위협이 될 수 있어요. 지금 바로 응급실이나 24시간 상담 서비스(1588-9191)에 연락하세요",
    "항상 당신의 안전이 우선이에요. 어려운 상황이라면 언제든 전문가에게 도움을 요청하세요."
]

app = FastAPI()
app.mount("/static", staticfiles.StaticFiles(directory="app"), name="static")

model = ModelManager()
model.load("ai/model/v1.pth")

@app.get("/", response_class=responses.HTMLResponse)
async def page():
    with open("app/index.html", "r", encoding="utf-8") as file:
        return responses.HTMLResponse(content=file.read())

@app.post("/", response_model=Response)
async def result(data: Request):
    columns = [
        'gender', 'age', 'breakfast', 'exercise', 'stress', 'loneliness', 'sleep', 'anxiety', 'worry', 'anger', 'depression', 'violence', 'grade', 'economy', 'residence'
    ]
    data = DataFrame([dict(data)]).reindex(columns=columns)
    for i in range(1, 7):
        data[f"age_{i}"] = int(i == data['age'].iloc[0])
    for i in range(1, 6):
        data[f"residence_{i}"] = int(i == data['residence'].iloc[0])
    data.drop(columns=['age', 'residence'], inplace=True)

    outputs = model.predict(data)
    return Response(risk=outputs, solution=solution[int(outputs)//10])
