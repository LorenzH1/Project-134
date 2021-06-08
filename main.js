img = "";
status = "";
object = [];
warning = "";
warning_status = "";
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}
function modelLoaded(){
    console.log("modelLoaded");
    status =  true;
}

function preload(){
    warning = loadSound("Warning.mp3")
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    
        console.log(results);
        object = results;
}

function draw(){

    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++ ){
            warning_status = warning.isPlaying();
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object.label = "person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                warning.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby not detected";
                warning.play();
            }


            

        }
    }
    
}