let video;
let poseNet;
let pose;
function setup(){
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(poses){
    console.log(poses);
    if(poses.lenght > 0)
    {
        pose = poses[0].pose;
    }
}
function modelLoaded()
{
    console.log("Poenet Loaded");
}

function draw(){
    image(video, 0,0);
    fill(255,0,0);
    ellipse
}