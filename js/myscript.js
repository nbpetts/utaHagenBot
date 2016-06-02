// "use strict";
// caching replies
var hello = new SpeechSynthesisUtterance("hello"),
    popovaDidnITell = new SpeechSynthesisUtterance("Didn't you tell him that my husband is dead and that I see no one?"),
    popovaAndISaid = new SpeechSynthesisUtterance("And I said I see no one!"),
    popovaAllRight = new SpeechSynthesisUtterance("All right, all right, tell him all right. Really! The nerve of some people!"),
    line0 = $("#line0"),
    line1 = $("#line1"),
    line2 = $("#line2"),
    transcripTargets = $("#transcript").contents(),
    script = $("#script").clone();

function say(utterance) {
    window.speechSynthesis.speak(utterance);
};

function rehearse() {

  $(".line").detach();

}

function reset() {
  $("#error").append("Please review your lines, I will reset the script in a second.")
  setTimeout(function (){
    $("#scriptContainer").empty();
    $("#scriptContainer").append(script);

  },10000)

}

function quickReset() {

  $("#scriptContainer").empty();
  $("#scriptContainer").append(script);
}
  
function reherse() {
  rehearse();
  annyang.setUserLine(0);
  annyang.toggleIsRehearsing();

}

function respondFirstLine () {
  say(popovaDidnITell);
  if (annyang.isRehearsing()){

    annyang.setUserLine(1);
  }

}

function respondSecondLine () {
  say(popovaAndISaid);
  if (annyang.isRehearsing()){
    annyang.setUserLine(2);
  }

}

function respondThridLine () {
  say(popovaAllRight);
  if (annyang.isRehearsing()){
    reset();
    annyang.toggleIsRehearsing();

  }

}


if (annyang) {
    // Add our commands to annyang


    annyang.addCommands({
        'hello': function() {
            say(hello);


        },

        "*can't wait": function() {
            respondFirstLine();
        },

        "*can not wait": function() {
            respondFirstLine();
        },
        "*cannot wait": function() {
            respondFirstLine();
        },
        "*won't wait": function() {
            respondFirstLine();
        },
        "*very important": function() {
            respondSecondLine ();


        },
        "*real important": function() {
            respondSecondLine ();


        },
        "*right now": function() {
            respondThridLine ();
        },
        "*dining room": function() {
            respondThridLine ();
        },
        "*lets rehearse": function() {
            reherse();

        },
        "*I want to rehearse": function() {
            reherse();

        },
        "*now rehearse": function() {
            reherse();

        },
        "*start rehearsing": function() {
            reherse();

        },
        "*start rehearsal": function() {
            reherse();

        }




    });


// Start listening.
annyang.start();


}
$(function(){
  $("#toggleRhearse").click(reherse);
  $("#reset").click(quickReset);
})
