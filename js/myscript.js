// "use strict";
// caching replies
var hello = new SpeechSynthesisUtterance("hello"),
    popovaDidnITell = new SpeechSynthesisUtterance("Didn't you tell him that my husband is dead and that I see no one?"),
    popovaAndISaid = new SpeechSynthesisUtterance("And I said I see no one!"),
    popovaAllRight = new SpeechSynthesisUtterance("All right, all right, tell him all right. Really! The nerve of some people!");

function say (utterance) {
  window.speechSynthesis.speak(utterance);
};

function startDictation() {
    annyang.abort();
    if (window.hasOwnProperty('webkitSpeechRecognition')) {

        var recognition = new webkitSpeechRecognition();
        var final_transcript = "";

        recognition.continuous = true;
        recognition.maxAlternatives = 5;
        recognition.interimResults = true;




        recognition.lang = "en-US";

        recognition.start();

        recognition.onstart= function(e){
          $("#listening").removeClass("sr-only")
        };
        recognition.onend= function(e){
          $("#listening").addClass("sr-only")
        };


        recognition.onresult = function(e) {
            var interim_transcript = '';
            if (typeof(e.results) == 'undefined') {
                reset();
                return;
            }
            for (var i = e.resultIndex; i < e.results.length; ++i) {
                var val = e.results[i][0].transcript;
                if (e.results[i].isFinal) {
                    final_transcript += " " + val;
                } else {
                    interim_transcript += " " + val;
                }
            }
            document.getElementById("final").innerHTML = final_transcript;
            document.getElementById("notFinal").innerHTML = interim_transcript;

        };

        recognition.onerror = function(e) {
            var msg = e.error + " error";
            if (e.error === 'no-speech') {
                msg =
                    "No speech was detected. Please turn on the microphone and try again.";

            } else if (e.error === 'audio-capture') {
                msg =
                    "Please ensure that your microphone is connected to the computer and turned on.";
            } else if (e.error === 'not-allowed') {
                msg =
                    "Dication.io cannot access your microphone. Please go to chrome://settings/contentExceptions#media-stream and allow Microphone access to this website.";
            }
            document.getElementById("error").innerHTML = "<p>" + msg + "</p>";
            setTimeout(function() {
                document.getElementById("error").innerHTML = "";
            }, 5000);
        };

    } // end hasOwnProperty
 return true;
};// end start dictiation

if (annyang) {
    // Add our commands to annyang


    annyang.addCommands({
        'hello': function() {
            say(hello);
            annyang.start({ autoRestart: true, continuous: false });

        },

        "*can't wait": function() {
            say(popovaDidnITell);
            annyang.start({ autoRestart: true, continuous: false });
        },
        "*very important": function() {
            say(popovaAndISaid);
            annyang.start({ autoRestart: true, continuous: false });
        },
        "*right now": function() {
            say(popovaAllRight);
            annyang.start({ autoRestart: true, continuous: false });
        },
        "*rehearse": function() {
          // startDictation();
          // annyang.start();


        }


    });

    annyang.addCallback('resultMatch', function(userSaid, commandText, phrases){
      if (commandText == "*rehearse") {
        $.when(startDictation()).then(annyang.start({ autoRestart: true, continuous: false }));
      }



    });
    // Start listening.
    annyang.start({ autoRestart: true, continuous: false });



    // Tell KITT to use annyang
    // SpeechKITT.annyang();
    //
    // // Define a stylesheet for KITT to use
    // SpeechKITT.setStylesheet('css/speachKitFlat.css');
    //
    // // Render KITT's interface
    // SpeechKITT.vroom();
}
