window.onload = init;
var context;    // Audio context
var buf;        // Audio buffer




function init() {

  }

  function playByteArray(byteArray) {
    if (!window.AudioContext) {
      if (!window.webkitAudioContext) {
          console.log("Your browser does not support any AudioContext and cannot play back this audio.");

      }
          window.AudioContext = window.webkitAudioContext;

      }

    const context = new (window.AudioContext || window.webkitAudioContext)();


    var arrayBuffer = new ArrayBuffer(byteArray.length);
    var bufferView = new Uint8Array(arrayBuffer);
    for (i = 0; i < byteArray.length; i++) {
      bufferView[i] = byteArray[i];
    }
    console.log(byteArray);

    context.decodeAudioData(arrayBuffer, function(buffer) {
        buf = buffer;
        play(context);
    });

}

function play(context) {
  // Create a source node from the buffer
  var source = context.createBufferSource();
  source.buffer = buf;
  // Connect to the final output node (the speakers)
  source.connect(context.destination);
  // Play immediately
  source.start(0);
}
