window.onload = init;
var context;    // Audio context
var buf;        // Audio buffer


function playByteArray(byteArray) {

  var arrayBuffer = new ArrayBuffer(byteArray.length);
  var bufferView = new Uint8Array(arrayBuffer);
  for (i = 0; i < byteArray.length; i++) {
    bufferView[i] = byteArray[i];
  }

  context.decodeAudioData(arrayBuffer, function(buffer) {
      buf = buffer;
      play();
  });
}


// Play the loaded file
function play() {
  // Create a source node from the buffer
  var source = context.createBufferSource();
  source.buffer = buf;
  // Connect to the final output node (the speakers)
  source.connect(context.destination);
  // Play immediately
  source.start(0);
}
