//initialize variables
'use strict';
var secretNumber,
    userGuess,
    pastGuesses = [],
    count,
    guessHtml,
    userFeedback,
    alreadyGuessed,
    newButton,
    form ,
    input,
    feedback,
    countElement,
    guessList;

var $ = require('jquery');



var pageLoad = function (){

    /*--- Display information modal box ---*/
    $('.what').click(function(){
        $('.overlay').fadeIn(1000);
    });
    /*--- Hide information modal box ---*/
    $('a.close').click(function(){
        $('.overlay').fadeOut(1000);
    });

    //fetch dom objects
    newButton = $('a.new');
    form = $('form');
    input = form.find('#userGuess');
    feedback = $('#feedback');
    countElement = $('#count');
    guessList = $('#guessList');

    //page load
    newGame();
    //event handlers
    form.submit(function(event){
        event.preventDefault();
        getUserGuess();
    });
    newButton.click(newGame);
}

module.exports.pageLoad = pageLoad;

//new game function
var newGame = function() {
    form.find('input[type=submit]').css('opacity','1');
    resetVariables();
    render();
    generateNumber();
};
module.exports.newGame = newGame;

//get the user guess
var getUserGuess = function() {
    //get the user guess
    userGuess = input.val();
    //reset input value
    input.val('');
    //focus on input for next guess
    input.focus();
    //ensure valid input
    if(checkGuess()){return ;}
    //generate feedback
    generateFeedback();
    //track the past user guesses
    trackGuess();
    //increment the count
    guessCount();
    //render changes to the page
    render();
};

module.exports.getUserGuess = getUserGuess;

//check for valid input
var checkGuess = function (){
    if(userGuess % 1 !== 0){
        alert('please input a number');
        return true;
    }
    if(userGuess < 0 || userGuess > 101){
        alert('please choose a number between zero and 100');
        return true;
    }
    if(pastGuesses.length > 0){
        $.each(pastGuesses,function(guess,value){
            if(userGuess == value){
                alreadyGuessed = true;
            }
        });
    }
    if(alreadyGuessed){
        alreadyGuessed = false;
        alert('You guessed this number already');
        return true;
    }
    return false;
}

module.exports.checkGuess = checkGuess;

//generate user feedback
var generateFeedback = function(){
    if(secretNumber == userGuess){
        winner();
    } else if(Math.abs(secretNumber - userGuess) < 10){
        userFeedback = 'hot';
    } else if(Math.abs(secretNumber - userGuess) < 20 && Math.abs(secretNumber - userGuess) > 9){
        userFeedback = ' Kinda hot';
    } else if(Math.abs(secretNumber - userGuess) < 30 && Math.abs(secretNumber - userGuess) > 19){
        userFeedback = 'less than warm';
    } else {
        userFeedback = 'cold';
    }
}

module.exports.generateFeedback = generateFeedback;

//keep track of the users past guesses
var trackGuess = function() {
    pastGuesses.push(userGuess);
    guessHtml = '';
    if(pastGuesses[0].length) {
        $.each(pastGuesses,function(guess,value){
            guessHtml += '<li>' + value + '</li>';
        });
    }
};

module.exports.trackGuess = trackGuess;

//keep track of guess count
var guessCount = function (){
    count++;
};

module.exports.guessCount = guessCount;

//page render function
var render = function(){
    guessList.html(guessHtml);
    countElement.html(count);
    feedback.html(userFeedback);
}

module.exports.render = render;


var winner = function(){
    userFeedback = 'You Won. Click new game to play again';
    form.find('input[type=submit]').css('opacity','0');
};

module.exports.winner = winner;

//generate secret number
var generateNumber = function(){
    secretNumber = Math.floor(Math.random()*100)+1;
};

module.exports.generateNumber = generateNumber;

//reset variable
var resetVariables = function(){
    count = 0;
    pastGuesses = [];
    guessHtml='';
    userGuess = '';
    userFeedback = 'Make your Guess!';
};

module.exports.resetVariables = resetVariables;