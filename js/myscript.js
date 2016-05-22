if (annyang) {
  // Add our commands to annyang
  annyang.addCommands({
    'hello': function() {
      // window.speechSynthesis.speak(new SpeechSynthesisUtterance("hello"));
      console.log('Hello world!');
    },

    'or in rain': function(){
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

$(function(){

  $("#toggleRecord").click(startDictation);

  function startDictation() {

      if (window.hasOwnProperty('webkitSpeechRecognition')) {

        var recognition = new webkitSpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function(e) {
          document.getElementById('transcript').value
                                   = e.results[0][0].transcript;
          recognition.stop();
          // document.getElementById('labnol').submit();
        };

        recognition.onerror = function(e) {
          recognition.stop();
        }

      }
    };

}); // end shorhand doc. ready
