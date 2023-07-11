function lockJS(){
    var myScreenOrientation = window.screen.orientation;
    myScreenOrientation.lock("portrait");
    console.log("Hello Call JS Function From TypeScript ");
  }

  alert("Pop up");
