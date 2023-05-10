// const axios = require('axios');
// const Discord = require('discord.js');

// const QUIZ_API_URL = 'https://quizapi.io/api/v1/questions';
// const QUIZ_API_KEY = process.env.QUIZ_API_KEY;
// const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

// const client = new Discord.Client();

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('message', async (message) => {
//   if (message.author.bot) return;

//   if (message.content.startsWith('!quiz')) {
//     // Get 10 multiple choice questions from the QuizAPI
//     try{
//     const response = await axios.get(QUIZ_API_URL, {
//       params: {
//         apiKey: QUIZ_API_KEY,
//         limit: 10,
//         difficulty: 'Easy',
//         multiple_correct_answers: true,
//         category: 'General Knowledge',
//       },
//     });

//     // Extract the question and answer choices from each question object
//     const questions = response.data.map((question) => {
//       return {
//         question: question.question,
//         choices: question.answers,
//         answerIndex: question.correct_answers.indexOf(true),
//       };
//     });

//     // Randomize the order of the questions
//     const shuffledQuestions = shuffle(questions);

//     let score = 0;
//     let currentQuestionIndex = 0;

//     // Send the first question as a Discord message
//     const questionEmbed = new Discord.MessageEmbed()
//       .setColor('#0099ff')
//       .setTitle('Quiz Time!')
//       .setDescription(shuffledQuestions[currentQuestionIndex].question)
//       .addFields(
//         { name: 'A', value: shuffledQuestions[currentQuestionIndex].choices[0] },
//         { name: 'B', value: shuffledQuestions[currentQuestionIndex].choices[1] },
//         { name: 'C', value: shuffledQuestions[currentQuestionIndex].choices[2] },
//         { name: 'D', value: shuffledQuestions[currentQuestionIndex].choices[3] }
//       );
//     const questionMessage = await message.channel.send({ embeds: [questionEmbed] });

//     // Add reaction emojis to the message for each answer choice
//     const reactionEmojis = ['🇦', '🇧', '🇨', '🇩'];
//     for (let i = 0; i < shuffledQuestions[currentQuestionIndex].choices.length; i++) {
//       await questionMessage.react(reactionEmojis[i]);
//     }

//     // Create a collector to listen for reactions to the message
//     const collector = questionMessage.createReactionCollector({
//       filter: (reaction, user) => {
//         return reactionEmojis.includes(reaction.emoji.name) && !user.bot;
//       },
//       max: 1,
//       time: 10000,
//       errors: ['time'],
//     });

//     collector.on('collect', (reaction, user) => {
//       // Check if the user's answer is correct
//       const selectedAnswerIndex = reactionEmojis.indexOf(reaction.emoji.name);
//       if (selectedAnswerIndex === shuffledQuestions[currentQuestionIndex].answerIndex) {
//         score++;
//         questionMessage.reply('🎉 Correct!');
//       } else {
//         questionMessage.reply(`❌ Wrong! The correct answer was ${reactionEmojis[shuffledQuestions[currentQuestionIndex].answerIndex]}`);
//       }

//       // Advance to the next question or end the quiz
//       currentQuestionIndex++;
//       if (currentQuestionIndex < shuffledQuestions.length) {
//         // Send the next question as a Discord message
//         const nextQuestionEmbed = new Discord.MessageEmbed()
//                  nextQuestionEmbed.setTitle(`Question ${currentQuestionIndex + 1}`);
//         nextQuestionEmbed.setDescription(shuffledQuestions[currentQuestionIndex].question);
//         nextQuestionEmbed.addFields(
//           { name: 'A', value: shuffledQuestions[currentQuestionIndex].answers.A, inline: true },
//           { name: 'B', value: shuffledQuestions[currentQuestionIndex].answers.B, inline: true },
//           { name: 'C', value: shuffledQuestions[currentQuestionIndex].answers.C, inline: true },
//           { name: 'D', value: shuffledQuestions[currentQuestionIndex].answers.D, inline: true },
//         );
//         await questionMessage.edit({ embeds: [nextQuestionEmbed] });
//         currentQuestionIndex++;

//         // Create a message collector to listen for the user's answer
//         const filter = (m) => {
//           return m.author.id === message.author.id && ['a', 'b', 'c', 'd'].includes(m.content.toLowerCase());
//         };
//         const collector = message.channel.createMessageCollector({ filter, time: 15000 });

//         collector.on('collect', (m) => {
//           const answer = m.content.toLowerCase();
//           const correctAnswer = shuffledQuestions[currentQuestionIndex - 1].correct_answer.toLowerCase();
//           if (answer === correctAnswer) {
//             correctCount++;
//             m.reply('Correct!');
//           } else {
//             wrongCount++;
//             m.reply(`Sorry, the correct answer was ${correctAnswer}.`);
//           }
//           collector.stop();
//         });

//         collector.on('end', (collected) => {
//           if (collected.size === 0) {
//             questionMessage.delete();
//             message.reply('Time is up!');
//             return;
//           }

//           if (currentQuestionIndex < shuffledQuestions.length) {
//             askQuestion(currentQuestionIndex, shuffledQuestions, correctCount, wrongCount, message, questionMessage);
//           } else {
//             const score = Math.round((correctCount / shuffledQuestions.length) * 100);
//             const quizEmbed = new Discord.MessageEmbed()
//               .setTitle('Quiz Finished')
//               .setDescription(`You got **${correctCount}** questions correct and **${wrongCount}** questions wrong!`)
//               .addField('Score', `${score}%`)
//               .setColor('BLUE');
//             questionMessage.edit({ embeds: [quizEmbed] });
//           }
//         });
//       };
//     };

//     askQuestion(0, shuffledQuestions, 0, 0, message);
//   } catch (error) {
//     console.log(error);
//     message.reply('An error occurred while processing your command.');
//   }
// } 
// });

