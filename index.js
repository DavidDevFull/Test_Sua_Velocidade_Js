const span_Text_Ramdom = document.getElementById('span_Text_Ramdom');
const text_Area_User = document.getElementById('text_Area_User');
const span_Timer = document.getElementById('span_Timer');
const btn_Reset = document.getElementById('btn_Reset');

let timer = [0,0,0,0];
let interval;
let timer_Running = false;

// Adiciona zero inicial aos números menores que 10
function leading_Zero(time){
    return time <= 9 ? '0' + time : time;
}

// Executa um timer padrão de Minuto / Segundo / Centésimos
function run_Timer(){
    let current_Timer = `${leading_Zero(timer[0])}:${leading_Zero(timer[1])}:${leading_Zero(timer[2])}`;
    span_Timer.innerHTML = current_Timer;
    
    timer[3]++; // Incrementa centésimos

    timer[0] = Math.floor((timer[3] / 100) / 60); // Minutos
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60)); // Segundos
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000)); // Centésimos
}

// Verifica se o texto digitado está correto
function spell_Check() { 
    let text_Entered = text_Area_User.value;
    let origin_Text = span_Text_Ramdom.textContent; // Obtém o texto original
    let origin_Text_Match = origin_Text.substring(0, text_Entered.length); // Ajusta para comparação parcial

    if (text_Entered === origin_Text) { 
        clearInterval(interval);
        text_Area_User.style.borderColor = '#429890'; // Verde (correto)
    } else if (text_Entered === origin_Text_Match) { 
        text_Area_User.style.borderColor = '#65ccf3'; // Azul (correto até agora)
    } else { 
        text_Area_User.style.borderColor = '#E95d0f'; // Vermelho (incorreto)
    }
    
    console.log(text_Entered);
}

// Inicia o cronômetro quando o usuário começa a digitar
function start(){
    let text_Entered_Length = text_Area_User.value.length;
    if (text_Entered_Length === 0 && !timer_Running) {
        timer_Running = true;
        interval = setInterval(run_Timer, 10);
    }
}

// Reseta o jogo
function reset(){
    clearInterval(interval);
    interval = 0;
    timer = [0,0,0,0];
    timer_Running = false;

    text_Area_User.value = '';  // Limpa a área de texto
    span_Timer.innerHTML = '00:00:00';  // Reseta o timer
    text_Area_User.style.borderColor = '#9b9b9b'; // Ajusta a cor
}

// Adiciona eventos
text_Area_User.addEventListener('keypress', start, false);
text_Area_User.addEventListener('keyup', spell_Check, false);
btn_Reset.addEventListener('click', reset, false);
