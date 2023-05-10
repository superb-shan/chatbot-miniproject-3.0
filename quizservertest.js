const axios = require('axios');
const readline = require('readline');

const url = 'https://quizapi.io/api/v1/questions';
const category = 'code';
const difficulty = 'medium';
const limit = 10;
const headers = {
  'X-Api-Key': 'BNZ9NlCVSt8Xe2vbZJlBPtRlBn9x1v7eWMmKPQJd'
};

const params = {
  category,
  difficulty,
  limit,
};

let questions = [];

// To get the correct answers

function getTrueIndices(c) {
  return c.reduce((acc, val, index) => {
    if (val === 'true') acc.push(index);
    return acc;
  }, []);
}

axios.get(url, {
  headers,
  params
})
  .then(response => {
    const data = response.data;

    data.forEach(element => {
      questions.push({
        'q': element.question,
        'a': Object.values(element.answers).filter(answer => answer !== null),
        'c': (Object.values(element.answers).filter(answer => answer !== null)).filter((val, index) => getTrueIndices(Object.values(element.correct_answers)).includes(index))
      });
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let score = 0;

    function startQuiz() {
      if (questions.length === 0) {
        console.log('No questions available.');
        rl.close();
        return;
      }

      const currentQuestion = questions.shift();
      console.log(currentQuestion.q);

      for (let i = 0; i < currentQuestion.a.length; i++) {
        console.log(`${i + 1}. ${currentQuestion.a[i]}`);
      }

      rl.question('Enter the correct answer number: ', answer => {
        const selectedAnswer = currentQuestion.a[answer - 1];
        if (currentQuestion.c.includes(selectedAnswer)) {
          score++;
          console.log('Correct!');
        } else {
          console.log('Incorrect!');
        }

        console.log(`Current score: ${score}\n`);

        if (questions.length === 0) {
          console.log(`Quiz finished! Your final score is ${score}`);
          rl.close();
        } else {
          startQuiz();
        }
      });
    }

    rl.question('Press enter to start the quiz.', () => {
      startQuiz();
    });
  })
  .catch(error => {
    console.error(error);
  });
