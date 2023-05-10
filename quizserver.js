const axios = require('axios');


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

let req_data = [];

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
        questions.push({'q':element.question, 'a': Object.values(element.answers).filter(answer => answer !== null), 'c': (Object.values(element.answers).filter(answer => answer !== null)).filter((val, index) => getTrueIndices(Object.values(element.correct_answers)).includes(index))});
      });

    console.log(req_data);
  })
  .catch(error => {
    console.error(error);
  });
