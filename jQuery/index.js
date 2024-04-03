$(document).ready(function () {
    let data = [
        {
            question: "In what children's game are participants chased by someone designated \"It\"?",
            content: [
                "Tag",
                "Simon Says",
                "Charades",
                "Hopscotch"
            ],
            correct: 0
        },
        {
            question: "On a radio, stations are changed by using what control?",
            content: [
                "Tuning",
                "Volume",
                "Bass",
                "Treble"
            ],
            correct: 0
        },
        {
            question: "Which material is most dense?",
            content: [
                "Silver",
                "Styrofoam",
                "Butter",
                "Gold"
            ],
            correct: 3
        },
        {
            question: "Which state in the United States is largest by area?",
            content: [
                "Alaska",
                "California",
                "Texas",
                "Hawaii"
            ],
            correct: 0
        },
        {
            question: "What is Aurora Borealis commonly known as?",
            content: [
                "Fairy Dust",
                "Northern Lights",
                "Book of ages",
                "a Game of Thrones main character"
            ],
            correct: 1
        },
        {
            correct: 3,
            content: [
                "developed the telescope",
                "discovered four satellites of Jupiter",
                "discovered that the movement of pendulum produces a regular time measurement",
                "All of the above"
            ],
            question: "Galileo was an Italian astronomer who"
        },
        {
            correct: 3,
            content: [
                "the infrared light kills bacteria in the body",
                "resistance power increases",
                "the pigment cells in the skin get stimulated and produce a healthy tan",
                "the ultraviolet rays convert skin oil into Vitamin D"
            ],
            question: "Exposure to sunlight helps a person improve his health because"
        },
        {
            correct: 0,
            content: [
                "a club or a local sport association for remarkable achievements",
                "amateur athlete, not necessarily an Olympian",
                "National Olympic Committee for outstanding work",
                "None of the above"
            ],
            question: "Sir Thomas Fearnley Cup is awarded to"
        },
        {
            correct: 1,
            content: [
                "1968",
                "1929",
                "1901",
                "1965"
            ],
            question: "Oscar Awards were instituted in"
        },
        {
            correct: 2,
            content: [
                "1998",
                "1989",
                "1979",
                "1800"
            ],
            question: "When did Margaret Thatcher became the first female Prime Minister of Britain?"
        },
        {
            correct: 2,
            content: [
                "15th April",
                "12th December",
                "1st May",
                "1st August"
            ],
            question: "When is the International Workers' Day?"
        },
        {
            correct: 2,
            content: [
                "1962",
                "1963",
                "1964",
                "1965"
            ],
            question: "When did China test their first atomic device?"
        },
        {
            correct: 3,
            content: [
                "1904",
                "1905",
                "1908",
                "1909"
            ],
            question: "When did Commander Robert Peary discover the North Pole?"
        },
        {
            correct: 0,
            content: [
                "819/sq. km",
                "602/sq. km",
                "415/sq. km",
                "500/sq. km"
            ],
            question: "What is the population density of Kerala?"
        },
        {
            correct: 1,
            content: [
                "4 km",
                "25 km",
                "500 m to 9 km",
                "150 km"
            ],
            question: "What is the range of missile 'Akash'?"
     }
    ];

    let currentQuestionIndex = 0;
    let countOfCorrectAnswers = 0;
    let maxUse = 1;

    $('#startAgainButton').hide()

    function displayQuestion(index) {
        let question = data[index];
        $('#question').text(question.question);
        $('#opinions').empty();

        $.each(question.content, function (index, option) {
            let btn = $('<input type="button" class="op" style="text-align: center" value="' + option + '">');
            btn.click(function () {
                $('#startAgainButton').show()
                if (index === question.correct) {
                    alert('Correct!');
                    currentQuestionIndex++;
                    countOfCorrectAnswers++
                    if (currentQuestionIndex < data.length) {
                        displayQuestion(currentQuestionIndex);
                    } else {
                        $('#question').text('Correct answer !!! ' + countOfCorrectAnswers + ' / 15');
                        $('#opinions').hide()
                        $('#startAgainButton').show();
                        $('#fiftyFifty').hide();
                        $('#showCorrect').hide();
                    }
                } else {
                    alert('Incorrect!');
                    currentQuestionIndex++;
                    if (currentQuestionIndex < data.length) {
                        displayQuestion(currentQuestionIndex);
                    } else {
                        $('#question').text('Correct answer !!! ' + countOfCorrectAnswers + ' / 15');
                        $('#opinions').hide()
                        $('#startAgainButton').show();
                        $('#fiftyFifty').hide();
                        $('#showCorrect').hide();
                    }
                }
            });
            $('#opinions').append(btn);
            if (maxUse <= 3) {
                console.log(maxUse , 'Count')
                $('#fiftyFifty').show()
            }
        });
    }

    $('#fiftyFifty').click(function () {
        alert(`You're taking a 50/50 chance ${maxUse} time`)
        maxUse++
        console.log(maxUse, "Max Use 50 / 50")
        let question = data[currentQuestionIndex];
        let incorrectIndexes = [];
        for (let i = 0; i < question.content.length; i++) {
            if (i !== question.correct) {
                incorrectIndexes.push(i);
            }
        }
        let indexesToRemove = getRandomIndexes(incorrectIndexes.length, 2);
        for (let i = 0; i < indexesToRemove.length; i++) {
            $('#opinions').children('.op').eq(incorrectIndexes[indexesToRemove[i]]).hide();
        }
        $('#fiftyFifty').hide()
    });

    function getRandomIndexes(maxRange, count) {
        let indexes = [];
        while (indexes.length < count) {
            let randomIndex = Math.floor(Math.random() * maxRange);
            console.log(maxRange, 'Max range')
            console.log(Math.random() * maxRange, 'random * maxRange ')
            console.log(Math.floor(Math.random() * maxRange), 'random ')
            if (!indexes.includes(randomIndex)) {
                indexes.push(randomIndex);
            }
        }
        return indexes;
    }

    $('#showCorrect').click(function () {
        alert("Show Correct answer")
        let question = data[currentQuestionIndex]
        let incorrect = []
        for (let i = 0; i < question.content.length; i++) {
            if (i !== question.correct) {
                incorrect.push(i)
            }
        }
        for (let i = 0; i < incorrect.length; i++) {
            $('#opinions').children('.op').eq(incorrect[i]).hide();
        }
        $('#fiftyFifty').hide()
        $('#showCorrect').hide()
    })

    displayQuestion(currentQuestionIndex);
    $('#startAgainButton').click(function () {
        alert('You start the game again')
        $('#startAgainButton').hide()
        $('#showCorrect').show()
        $('#fiftyFifty').show()
        $('#opinions').show()
        maxUse = 1
        currentQuestionIndex = 0
        countOfCorrectAnswers = 0
        displayQuestion(currentQuestionIndex);
    });
});