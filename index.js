const p_Text_Ramdom = document.getElementById('p_Text_Ramdom');
const text_Area_User = document.getElementById('text_Area_User');
const span_Timer = document.getElementById('span_Timer');
const span_Record_Current = document.getElementById('span_Record_Current');
const btn_Reset = document.getElementById('btn_Reset');

let timer = [0, 0, 0, 0];
let interval;
let timer_Running = false;

const texts = [
    'A inteligência artificial evoluiu rapidamente, impactando setores como saúde, finanças e automação. Com algoritmos avançados, máquinas agora aprendem e tomam decisões, moldando o futuro da tecnologia e do trabalho humano.',
    'Criada inicialmente para fins militares nos anos 60, a internet revolucionou a comunicação global. Com a popularização na década de 90, transformou a forma como acessamos informação, trabalhamos e interagimos digitalmente.',
    'A computação evoluiu do ábaco para processadores ultrarrápidos. Hoje, os computadores quânticos prometem resolver problemas impossíveis para máquinas tradicionais, abrindo novas possibilidades para ciência e inovação.',
    'Desde o primeiro celular até os smartphones ultramodernos, os dispositivos móveis redefiniram a conectividade. Aplicativos, inteligência artificial e redes 5G tornam a comunicação mais rápida e eficiente, moldando nosso cotidiano.',
    'De linguagens primitivas como Assembly até frameworks avançados, a programação impulsionou a tecnologia. Hoje, inteligência artificial, cloud computing e desenvolvimento ágil aceleram a inovação e criam soluções digitais revolucionárias.'
];

function leading_Zero(time) {
    return time <= 9 ? '0' + time : time;
}

function run_Timer() {
    let current_Timer = `${leading_Zero(timer[0])}:${leading_Zero(timer[1])}:${leading_Zero(timer[2])}`;
    span_Timer.innerHTML = current_Timer;

    timer[3]++; 
    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function spell_Check() {
    let text_Entered = text_Area_User.value;
    let origin_Text = p_Text_Ramdom.textContent;
    let origin_Text_Match = origin_Text.substring(0, text_Entered.length);

    if (text_Entered === origin_Text) {
        clearInterval(interval);
        text_Area_User.style.borderColor = '#429890';
        save_Status();
    } else if (text_Entered === origin_Text_Match) {
        text_Area_User.style.borderColor = '#65ccf3';
    } else {
        text_Area_User.style.borderColor = '#E95d0f';
    }
}

function start() {
    if (text_Area_User.value.length === 0 && !timer_Running) {
        timer_Running = true;
        interval = setInterval(run_Timer, 10);
    }
}

function reset() {
    clearInterval(interval);
    interval = 0;
    timer = [0, 0, 0, 0];
    timer_Running = false;

    text_Area_User.value = '';
    span_Timer.innerHTML = '00:00:00';
    text_Area_User.style.borderColor = '#9b9b9b';

    let text_Current = texts[Math.floor(Math.random() * texts.length)];
    p_Text_Ramdom.textContent = text_Current;
}

function save_Status() {
    let best_Time = localStorage.getItem('best_Time');

    let current_Time = span_Timer.textContent;

    if (!best_Time || Number(current_Time.replace(/:/g, '')) < Number(best_Time.replace(/:/g, ''))) {
        localStorage.setItem('best_Time', current_Time);
        span_Record_Current.textContent = `${current_Time} 🎉 Novo recorde!`;
    }
}

// Eventos
text_Area_User.addEventListener('keypress', start, false);
text_Area_User.addEventListener('keyup', spell_Check, false);
btn_Reset.addEventListener('click', reset, false);