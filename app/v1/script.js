function $_(selector){return document.getElementById(selector)};
function $$_(selector){return Array.from(document.querySelectorAll(selector))};

const servey = [
    {
        'gender': {
            'label': '당신의 성별은 무엇인가요?',
            'type': 'radio-vertical',
            'options': {
                0: '남성',
                1: '여성',
            },
        },
        'age': {
            'label': '당신의 학년은 어떻게 되나요?',
            'type': 'radio',
            'options': {
                1: '중1',
                2: '중2',
                3: '중3',
                4: '고1',
                5: '고2',
                6: '고3',
            },
        },
    },
    {
        'breakfast': {
            'label': '최근 7일간 아침식사를 한 적이 있나요?',
            'type': 'radio-vertical',
            'options': {
                0: '안했다',
                1: '했다',
            },
        },
        'exercise': {
            'label': '최근 7일간 숨이 찰 정도로 운동을 한 적이 있나요?',
            'type': 'radio-vertical',
            'options': {
                0: '안했다',
                1: '했다',
            },
        },
    },
    {
        'stress': {
            'label': '평상시 스트레스를 얼마나 느끼고 있나요?',
            'type': 'radio',
            'options': {
                1: '대단히 많이 느낀다',
                2: '많이 느낀다',
                3: '조금 느낀다',
                4: '별로 느끼지 않는다',
                5: '전혀 느끼지 않는다',
            },
        },
        'loneliness': {
            'label': '평상시 외로움을 얼마나 느끼고 있나요?',
            'type': 'radio',
            'options': {
                5: '항상 느낀다',
                4: '자주 느낀다',
                3: '가끔 느낀다',
                2: '거의 느끼지 않는다',
                1: '전혀 느끼지 않는다',
            },
        },
        'sleep': {
            'label': '평상시 충분한 수면을 취하고 있나요?',
            'type': 'radio-vertical',
            'options': {
                0: '충분하다',
                1: '충분하지 않다',
            },
        },
    },
    {
        'anxiety': {
            'label': '심각한 불안감을 자주 느끼나요?',
            'type': 'radio-vertical',
            'options': {
                0: '자주 느끼지는 않는다',
                1: '자주 느낀다',
            },
        },
        'worry': {
            'label': '심각한 걱정을 자주 하나요?',
            'type': 'radio-vertical',
            'options': {
                0: '자주 하지는 않는다',
                1: '자주 한다',
            },
        },
        'anger': {
            'label': '짜증이 쉽게 나고 불편한 감정이 자주 드나요?',
            'type': 'radio-vertical',
            'options': {
                0: '자주 들지는 않는다',
                1: '자주 든다',
            },
        },
    },
    {
        'depression': {
            'label': '최근 2주간 일상생활이 어려울 정도로 우울해진 경험이 있나요?',
            'type': 'radio-vertical',
            'options': {
                0: '없다',
                1: '있다',
            },
        },
        'violence': {
            'label': '최근 1년간 물리적 폭력을 당하여 입원한 경험이 있나요?',
            'type': 'radio-vertical',
            'options': {
                0: '없다',
                1: '있다',
            },
        },
    },
    {
        'grade': {
            'label': '학업 성적은 어떤가요?',
            'type': 'radio',
            'options': {
                1: '상위권',
                2: '중상위권',
                3: '중위권',
                4: '중하위권',
                5: '하위권',
            },
        },
        'economy': {
            'label': '가정의 경제적 상황은 어떤가요?',
            'type': 'radio',
            'options': {
                1: '풍족하다',
                2: '여유롭다',
                3: '평범하다',
                4: '빠듯하다',
                5: '부족하다',
            },
        },
        'residence': {
            'label': '현재 거주형태는 어떤가요?',
            'type': 'radio',
            'options': {
                1: '본가',
                2: '친가/외가',
                3: '하숙/자취',
                4: '기숙사',
                5: '보육시설',
            },
        }
    }
]

let cache = {};

const form = $_('form');
const prev = $_('prev');
const next = $_('next');
const submit = $_('submit');

let current = 0;

function render(){
    form.innerHTML = '';
    const questions = servey[current];
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');
    for(let key in questions){
        const question = questions[key];
        // form option
        const formOption = document.createElement('div');
        formOption.classList.add('form-option');
        // label
        const label = document.createElement('label');
        label.setAttribute('for', key);
        // text
        const text = document.createElement('div');
        text.textContent = question.label;
        label.appendChild(text);
        // error
        const error = document.createElement('p');
        error.classList.add('error');
        error.textContent = '!';
        error.classList.add('hidden');
        error.id = `${key}-error`;
        // append
        label.appendChild(error);
        formOption.appendChild(label);
        // input
        if(question.type === 'radio' || question.type === 'radio-vertical'){
            const radioGroup = document.createElement('div');
            radioGroup.classList.add('radio-group');
            if(question.type === 'radio-vertical') radioGroup.classList.add('vertical');
            for(let optionKey in question.options){
                const radioLabel = document.createElement('div');
                radioLabel.classList.add('radio-label');
                const option = question.options[optionKey];
                const radio = document.createElement('input');
                radio.setAttribute('type', 'radio');
                radio.setAttribute('name', key);
                radio.setAttribute('value', optionKey);
                radio.setAttribute('id', `${key}-${optionKey}`);
                radio.onchange = () => {
                    cache[key] = optionKey;
                    error.classList.add('hidden');
                }
                if(cache[key] === optionKey) radio.checked = true;
                const _label = document.createElement('label');
                _label.setAttribute('for', `${key}-${optionKey}`);
                _label.textContent = option;
                radioLabel.appendChild(radio);
                radioLabel.appendChild(_label);
                radioGroup.appendChild(radioLabel);
            }
            formOption.appendChild(radioGroup);
        } else {
            const select = document.createElement('select');
            select.setAttribute('name', key);
            for(let optionKey in question.options){
                const option = question.options[optionKey];
                const selectOption = document.createElement('option');
                selectOption.setAttribute('value', optionKey);
                selectOption.textContent = option;
                select.appendChild(selectOption);
            }
            select.onchange = () => {
                cache[key] = select.value;
                error.classList.add('hidden');
            }
            if(cache[key]) select.value = cache[key];
            formOption.appendChild(select);
        }
        formGroup.appendChild(formOption);
    }
    form.appendChild(formGroup);
    if(current === 0){
        prev.disabled = true;
    }else{
        prev.disabled = false;
    }
    if(current === servey.length - 1){
        next.classList.add('hidden');
        submit.classList.remove('hidden');
    }else{
        next.classList.remove('hidden');
        submit.classList.add('hidden');
    }
}

render();

prev.addEventListener('click', () => {
    current--;
    render();
});

function checkAll(){
    const every = Object.keys(servey[current]).every(key => cache[key]);
    Object.keys(servey[current]).forEach(key => {
        if(!cache[key]){
            $_(`${key}-error`).classList.remove('hidden');
        }
    });
    return every;
}

next.addEventListener('click', () => {
    const every = checkAll();
    if(every){
        current++;
        render();
    }
});

submit.addEventListener('click', () => {
    const every = checkAll();
    if(every){
        console.log(cache);
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cache),
        }).then(res => res.json()).then(data => {
            makeResult(data.risk, data.solution);
        })
    }
});

function makeResult(percent, solution){
    $_('survey').classList.add('hidden');
    $_('result').classList.remove('hidden');
    $_('percent').textContent = percent + "%";
    $_('solution').textContent = solution;
    $_('circle').style.setProperty('--multiplier', `calc(var(--percent) * ${percent} / 100)`);
    $_('circle').style.animation = `fill-circle 1s ease forwards`;
}

$_('restart').addEventListener('click', () => {
    $_('circle').style.animation = '';
    current = 0;
    cache = {};
    render();
    $_('result').classList.add('hidden');
    $_('survey').classList.remove('hidden');
});