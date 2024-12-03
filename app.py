from fastapi import FastAPI, responses, staticfiles
from pydantic import BaseModel
from pandas import DataFrame
from ai.model_manager import ModelManager

class Request(BaseModel):
    gender: int  # 0,1 -> 남자, 여자
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
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"
]

app = FastAPI()
app.mount("/static", staticfiles.StaticFiles(directory="app"), name="static")

@app.get("/", response_class=responses.HTMLResponse)
async def page():
    with open("app/index.html", "r") as file:
        return responses.HTMLResponse(content=file.read(), status_code=200)

@app.post("/", response_model=Response)
async def result(data: Request):
    data = DataFrame([data])
    for i in range(1, 7):
        data[f"age_{i}"] = int(i == data['age'])
        if i < 6: data[f"residence_{i}"] = int(i == data['residence'])
    data.drop(columns=['age', 'residence'], inplace=True)

    model = ModelManager()
    model.load("ai/model/v1.pth")
    outputs = model.predict(data)
    return Response(risk=outputs, solution=solution[outputs//10])
