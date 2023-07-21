let correct
let seconds = 20;
let correctAnswer = 0
let incorrectAnswer = 0
function getElement(id) {
    return document.getElementById(id);
}
function getRandomLogo() {
    return Elements[Math.floor(Math.random()*( Elements.length - 1))]
}
function main() {
    let options = []
    const maxOptions = 3
    while (options.length < maxOptions) {
        let logo = getRandomLogo()
        if (options.indexOf(logo) === -1) {
            options.push(logo)
        }
    }

    for (let i = 0; i < options.length; i++) {
        getElement(`option${i + 1}label`).innerHTML = options[i].name;
        getElement(`option${i + 1}input`).value = options[i].name;
        getElement(`option${i + 1}input`).checked = false;
    }

    correct = options[Math.round(Math.random() * (options.length-1))]
    getElement("logo").src = correct.logo;
}
function timer() {
    setTimeout(finish, seconds * 1000)
    getElement("time").innerHTML = seconds;
    let countdown = setInterval(function () {

        seconds--;
        getElement("time").textContent = seconds;
        if (seconds <= 0) {
            clearInterval(countdown);
        }
        if (seconds === 5) {
            getElement("time").style.color = "#ff0000";
        }
    }, 1000)
}
function check() {
    let input;
    try {
        input = document.querySelector('input[name = "option"]:checked').value;
    } catch {
        return;
    }
    if (input === correct.name) {
        correctAnswer++;
        getElement("score").innerHTML = correctAnswer
    } else {
        incorrectAnswer++;
    }
    main();
}
function finish() {
    
    clearInterval(checkInterval);
    let percentage = Math.round(correctAnswer / (correctAnswer + incorrectAnswer)) * 100;
    if (isNaN(percentage)) {
        resultForAnswers = 100
    } else {
        if (percentage >= 75 && percentage < 95) {
            resultForAnswers = "դուք ցուցաբերել եք լավ արդյունք"
        } else if (percentage >= 95) {
            resultForAnswers = "դուք ցուցաբերել եք գերազանց արդյունք"

        }
        function refresh() {
            location = location;
        }
    }
    getElement("alertaccuracy").innerHTML = ` քո արդյունքն է ${percentage}%`;
}
let checkInterval = setInterval(check, 50);
main();
timer()

