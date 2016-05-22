"use strict";

if (annyang) {
    // Add our commands to annyang
    annyang.addCommands({
        'hello': function() {
            // window.speechSynthesis.speak(new SpeechSynthesisUtterance("hello"));
            console.log('Hello world!');
        },

        'or in rain': function() {
            // window.speechSynthesis.speak(new SpeechSynthesisUtterance("When the hurlyburlys done"));
        }


    });


    // Start listening.
    // annyang.start();



    // Tell KITT to use annyang
    // SpeechKITT.annyang();
    //
    // // Define a stylesheet for KITT to use
    // SpeechKITT.setStylesheet('css/speachKitFlat.css');
    //
    // // Render KITT's interface
    // SpeechKITT.vroom();
}

$(function() {

    $("#toggleRecord").click(startDictation);

    function startDictation() {

        if (window.hasOwnProperty('webkitSpeechRecognition')) {

            var recognition = new webkitSpeechRecognition();
            var final_transcript = "";

            recognition.continuous = true;
            recognition.maxAlternatives = 5;
            recognition.interimResults = true;




            recognition.lang = "en-US";
            recognition.start();

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
    };

}); // end shorhand doc. ready
