function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded(){
  console.log("modelLoaded")
}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video, gotResults);
}

previous_result="";

function gotResults(error, results){
if(error){
  console.error(error);
}
else{
  if((results[0].confidence>0.5)&&(previous_result != results[0].label)){
    console.log(results);
    previous_result=results[0].label;

    result_accu= Math.floor(results[0].confidence*100)+ "%";

    synth=window.speechSynthesis;
    speak_this='The object detected is- '+results[0].label;
    utter_this= new SpeechSynthesisUtterance(speak_this);
    synth.speak(utter_this);

    document.getElementById("result_name").innerHTML=results[0].label;
    document.getElementById("result_accu").innerHTML=result_accu;
    
  }
}
}


