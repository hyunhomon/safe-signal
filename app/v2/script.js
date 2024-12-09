function createContainer(title, radioCount, rowContents, name) {
    const mainContainer = document.getElementById('main-container');

    const container = document.createElement('div');
    container.classList.add('container');

    const containerTitle = document.createElement('h3');
    containerTitle.classList.add('title');
    containerTitle.textContent = title;
    container.appendChild(containerTitle);

    const column = document.createElement('div');
    column.classList.add('column');

    // 라디오 버튼과 레이블 생성
    for (let i = 0; i < radioCount; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = name; 
        radio.value = i + 1; 
        radio.id = `${name}-option${i + 1}`;
        radio.classList.add('radio-input');

        const label = document.createElement('label');
        label.setAttribute('for', radio.id);
        label.classList.add('radio-label');
        label.textContent = rowContents[i];

        row.appendChild(radio);
        row.appendChild(label);

        column.appendChild(row);

        // 라디오 버튼을 선택하면 선택 해제 버튼을 보이기
        radio.addEventListener('change', () => {
            const deselectButton = container.querySelector('.deselect-button');
            if (deselectButton) {
                deselectButton.style.display = 'inline-block'; // 선택 시 버튼 보이기
            }
        });
    }

    // 선택 해제 버튼 클릭 시 라디오 버튼 초기화
    const deselectButton = document.createElement('button');
    deselectButton.classList.add('deselect-button');
    deselectButton.textContent = '선택 해제';

    deselectButton.addEventListener('click', () => {
        const radioButtons = container.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radio => {
            radio.checked = false; // 모든 라디오 버튼 해제
        });
        deselectButton.style.display = 'none'; // 버튼 숨기기
    });

    // 선택 해제 버튼을 새로운 row에 추가 (오른쪽 정렬)
    const rowForButton = document.createElement('div');
    rowForButton.classList.add('row', 'row-right'); // 오른쪽 정렬을 위한 클래스 추가

    rowForButton.appendChild(deselectButton);
    column.appendChild(rowForButton);

    container.appendChild(column);
    mainContainer.appendChild(container);
}

function titleContainer(mainTitle, subTitle) {
    const mainContainer = document.getElementById('main-container');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');

    const mainTitleElement = document.createElement('h1');
    mainTitleElement.classList.add('main-title');
    mainTitleElement.textContent = mainTitle;

    const subTitleElement = document.createElement('p');
    subTitleElement.classList.add('sub-title');
    subTitleElement.textContent = subTitle;

    titleContainer.appendChild(mainTitleElement);
    titleContainer.appendChild(subTitleElement);

    mainContainer.appendChild(titleContainer);
}



function titleContainer(mainTitle, subTitle) {
    const mainContainer = document.getElementById('main-container');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');

    const mainTitleElement = document.createElement('h1');
    mainTitleElement.classList.add('main-title');
    mainTitleElement.textContent = mainTitle;

    const subTitleElement = document.createElement('p');
    subTitleElement.classList.add('sub-title');
    subTitleElement.textContent = subTitle;

    titleContainer.appendChild(mainTitleElement);
    titleContainer.appendChild(subTitleElement);

    mainContainer.appendChild(titleContainer);
}

function createButton(buttonText) {
    const mainContainer = document.getElementById('main-container');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const button = document.createElement('button');
    button.classList.add('result-button');
    button.textContent = buttonText;

    buttonContainer.appendChild(button);
    mainContainer.appendChild(buttonContainer);
}

titleContainer('정신건강 자가진단', '아래 설문에 솔직하게 답해주세요.');

createContainer('당신의 성별은 무엇인가요?', 2, ['남성', '여성'], 'gender');
createContainer('당신의 학년은 어떻게 되나요?', 6, ['중1', '중2', '중3', '고1', '고2', '고3'], 'age');
createContainer('최근 7일간 아침식사를 한 적이 있나요?', 2, ['안했다', '했다'], 'breakfast');
createContainer('최근 7일간 숨이 찰 정도로 운동을 한 적이 있나요?', 2, ['안했다', '했다'], 'exercise');
createContainer('평상시 스트레스를 얼마나 느끼고 있나요?', 5, ['대단히 많이 느낀다', '많이 느낀다', '조금 느낀다', '별로 느끼지 않는다', '전혀 느끼지 않는다'], 'stress');
createContainer('평상시 외로움을 얼마나 느끼고 있나요?', 5, ['전혀 느끼지 않는다', '거의 느끼지 않는다', '가끔 느낀다', '자주 느낀다', '항상 느낀다'], 'loneliness');
createContainer('평상시 충분한 수면을 취하고 있나요?', 2, ['충분하다', '충분하지 않다'], 'sleep');
createContainer('심각한 불안감을 자주 느끼나요?', 2, ['자주 느끼지는 않는다', '자주 느낀다'], 'anxiety');
createContainer('심각한 걱정을 자주 하나요?', 2, ['자주 하지는 않는다', '자주 한다'], 'worry');
createContainer('짜증이 쉽게 나고 불편한 감정이 자주 드나요?', 2, ['자주 들지는 않는다', '자주 든다'], 'anger');
createContainer('최근 2주간 일상생활이 어려울 정도로 우울해진 경험이 있나요?', 2, ['없다', '있다'], 'depression');
createContainer('최근 1년간 물리적 폭력을 당하여 입원한 경험이 있나요?', 2, ['없다', '있다'], 'violence');
createContainer('학업 성적은 어떤가요?', 5, ['상위권', '중상위권', '중위권', '중하위권', '하위권'], 'grade');
createContainer('가정의 경제적 상황은 어떤가요?', 5, ['풍족하다', '여유롭다', '평범하다', '빠듯하다', '부족하다'], 'economy');
createContainer('현재 거주형태는 어떤가요?', 5, ['본가', '친가/외가', '하숙/자취', '기숙사', '보육시설'], 'residence');

createButton('결과 보기');

function makeResult(percent, solution) {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    const resultContainer = document.createElement('div');
    resultContainer.classList.add('container');
    resultContainer.textContent = `${percent}% ${solution}`;

    resultContainer.style.display = 'flex';
    resultContainer.style.justifyContent = 'center';
    resultContainer.style.alignItems = 'center';
    resultContainer.style.height = '100vh';

    mainContainer.appendChild(resultContainer);
}

document.querySelector('.result-button').addEventListener('click', () => {
    const answers = {};

    const radioGroups = document.querySelectorAll('.container');
    radioGroups.forEach(container => {
        const radios = container.querySelectorAll('input[type="radio"]');
        for (const radio of radios) {
            if (radio.checked) {
                answers[radio.name] = parseInt(radio.value, 10);
                break;
            }
        }
    });

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
    }).then(res => res.json()).then(data => {
        makeResult(data.risk, data.solution);
    })
});
