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
  $("#scriptContainer").empty();
  $("#scriptContainer").append(script);
}







if (annyang) {
    // Add our commands to annyang


    annyang.addCommands({
        'hello': function() {
            say(hello);


        },

        "*can't wait": function() {
            say(popovaDidnITell);
            if (annyang.isRehearsing()){

              annyang.setUserLine(1);
            }

        },
        "*very important": function() {
            say(popovaAndISaid);
            if (annyang.isRehearsing()){
              annyang.setUserLine(2);
            }


        },
        "*right now": function() {
            say(popovaAllRight);
            if (annyang.isRehearsing()){
              reset();
              annyang.toggleIsRehearsing();

            }
        },
        "*lets rehearse": function() {
            rehearse();
            annyang.setUserLine(0);
            annyang.toggleIsRehearsing();

        }


    });


// Start listening.
annyang.start();


}
