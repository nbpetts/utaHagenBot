if (annyang) {
  // Add our commands to annyang
  annyang.addCommands({
    'hello': function() { window.speechSynthesis.speak(new SpeechSynthesisUtterance("hello"))},

    'or in rain': function(){window.speechSynthesis.speak(new SpeechSynthesisUtterance("When the hurlyburlys done"))}


  });

  // Tell KITT to use annyang
  SpeechKITT.annyang();

  // Define a stylesheet for KITT to use
  SpeechKITT.setStylesheet('http://cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

  // Render KITT's interface
  SpeechKITT.vroom();
}
