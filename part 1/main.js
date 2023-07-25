let correct
let seconds = 15;
let correctAnswer = 0
let incorrectAnswer = 0

function getElement(id) {
    return document.getElementById(id);
}

function getRandomLogo() {
    return Elements[Math.floor(Math.random() * (Elements.length - 1))]
}

function main() {
    let options = [];
    const maxOptions = 4;
    while (options.length < maxOptions) {
        let coun = getRandomLogo();
        if (options.indexOf(coun) === -1) {
            options.push(coun);
        }
    }
    for (let i = 0; i < options.length; i++) {
        getElement(`option${i + 1}label`).innerHTML = options[i].name;
        getElement(`option${i + 1}input`).value = options[i].name;
        getElement(`option${i + 1}input`).checked = false;
    }
    correct = options[Math.round(Math.random() * (options.length - 1))];
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
        getElement("score").innerHTML = correctAnswer;
    } else {
        incorrectAnswer++;
    }
    main();
}
function finish() {
    clearInterval(checkInterval);
    getElement("alert").style.display = "block";
    getElement("card").style.display = "none";
    getElement("alertscore").innerHTML = correctAnswer;
    let percentage = Math.round((correctAnswer / (correctAnswer + incorrectAnswer)) * 100);
    if (isNaN(percentage)) {
        resultForAnswers = 100;
    } else {
        if (percentage >= 75 && percentage < 95) {
            resultForAnswers = "դուք ցուցաբերել եք լավ արդյունք"
        } else if (percentage >= 95) {
            resultForAnswers = "դուք ցուցաբերել եք գերազանց արդյունք"
        }
        else if (percentage >= 50 && percentage < 75) {
            resultForAnswers = "դուք ցուցաբերել եք միջին արդյունք"
        }
        else if (percentage >= 25 && percentage < 50) {
            resultForAnswers = "դուք ցուցաբերել եք միջինից վատ արդյունք"
        }
        else if (percentage < 25) {
            resultForAnswers = "դուք ցուցաբերել եք վատ արդյունք"
        }
    }

    getElement("alertaccuracy").innerHTML = `${resultForAnswers}  `;
}

function refresh() {
    location = location;
}

let checkInterval = setInterval(check, 50);
main();
timer()

