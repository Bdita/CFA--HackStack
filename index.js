const axios = require('axios');
const prompt = require('prompt');
var Table = require('cli-table');

function getUnansweredQuestion () {
  axios.get('https://api.stackexchange.com/2.2/questions/no-answers?order=desc&sort=votes&site=stackoverflow')
    .then(function (response) {
      // create an empty array
      // use loops to push title, views and tags of each Json objects returned from axios get method into the array
      // push the array objects in the format required by cli-table cross table
      // cli-table require the row to be in this format => { 'Left Header 1': ['Value Row 1 Col 1', 'Value Row 1 Col 2'] }
      var array = [];
      for (var i = 0; i < response.data.items.length; i++) {
        var questionTitle = `${response.data.items[i]['title']}`;
        var questionViews = `${response.data.items[i]['view_count']}`;
        var tags = `${response.data.items[i]['tags']}`;
        array.push({'Question': [questionTitle, questionViews, tags]});
      }
      // create table object and push the first 10 array items created above into the table row
      // cli-table's cross table require a head setting when instantiated that has an empty string as the first header
      var table = new Table({ head: ["", "Title", "Views", "Tags"], colWidths: [10, 85, 7 , 50 ]});
      table.push(
        array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9]
      );

      console.log(table.toString());
    })
    .catch(function (error) {
      console.log(error);
    });
}

function welcomePrompt () {
  console.log('Welcome to HackStack: A cli application that displays the top 10 unanswered stack overflow questions sorted based on the votes. Do you want to continue?')
  prompt.start();
  // Get one property from the user: yes or no
  prompt.get(['yesOrno'], function (err, result) {
  // Log the results based on users input
  if (result.yesOrno == 'yes') {
    console.log ('You said YES! Here is the list. Thank you for using HackStack.');
    getUnansweredQuestion();
  } else if (result.yesOrno === 'no') {
    console.log('Too bad! Have a good day.');
  } else {
      console.log('Opps! You typed incorrectly. Try Again!');
  }
  });
}
welcomePrompt ();
