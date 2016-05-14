$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

    /*--- Reset game ---*/
    $(".new").on('click', function() {
        $('#guessList').children.remove();
        $('#userGuess').val('');
        rand();
    });

    /*--- Add 1 to Guess # ---*/
    var count = 0;
    function addOne() {
        count++;
        $('#count').html(count);
    }

    /*--- Write over #feedback ---*/
    function res(phrase) {
        $('body').find('#feedback').html(phrase);
    }


    /*--- Get Random ---*/
    var rand = Math.floor(Math.random() * 100) + 1;


    /*--- Variables ---*/
    var fieldValue;
    var diff;

    /*--- Game start ---*/
    $("form").submit(function(e) {
        e.preventDefault();
        fieldValue = $("#userGuess").val();
        diff = Math.abs(fieldValue - rand);
        addOne();
        $('#guessList').append("<li>" + fieldValue + "</li>");
        if (fieldValue == rand) {
           res("You Got It!");
        } else if (diff <= 5) {
            res("Very Hot!");
        } else if (diff <= 20) {
            res("Hot!");
        } else if (diff <= 30) {
            res("Warm!");
        } else if (diff <= 40) {
            res("Cold!");
        } else {
            res("Very Cold!");
        }
        $('#userGuess').val('');
    });
});

