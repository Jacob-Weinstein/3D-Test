var nodes = [];
var edges = [];
var nodeSize = 15;
var bondLength = 100;
function setup(){
  var ww = ((windowWidth * 2/3 > 1000) ? windowWidth * 2/3 : 1000);
  var wh = 600;
  createCanvas(ww,wh);
  angleMode(DEGREES);

  nodes.push([0,0,0, color(0,0,0)]);
  nodes.push([0,100,0, color(255,0,0)]);
  nodes.push([100,0,0, color(0,0,255)]);
  nodes.push([0,0,100, color(0,255,0)]);
  edges.push([0,1]);
  edges.push([0,2]);
  edges.push([0,3]);
  /*nodes.push([0,0,0, true]);
  //nodes.push([cos(60)*100, sin(60)*100, 0]);
  //nodes.push([cos(120)*100, sin(120)*100, 0]);
  var ang = 35;
  for (var i = 1;i<20;i+=3){
    var even = (i + 1) % 2 == 0;

    var bX = nodes[i - 1][0] + cos(ang) * bondLength;
    var bY = nodes[i - 1][1] + sin(ang) * bondLength;

    console.log("ang: " + ang);
    console.log("bx: " + bX + " by: " + bY);
    var t1Z = 45;
    var t2Z = -45;

    nodes.push(
      [
        bX,
        bY,
        0,
        true
      ]
    );
    nodes.push(
      [
        bX + cos(t1Z) * 20,
        bY,//bY + sin(t1Z)*50,
        50,//50 + sin(t1Z)*50,
        false
      ]
    );
    nodes.push(
      [
        bX - cos(t1Z) * 20,
        bY,//bY + sin(t2Z)*50,
        -50,//-50 + sin(t2Z)*50,
        false
      ]
    );
    ang = - ang;
  }

  edges.push([0, 1]);
  for (var i = 1;i<nodes.length-3;i++){
    if (nodes[i][3]){
      edges.push([i, i + 1]);
      edges.push([i, i + 2]);
      edges.push([i, i + 3]);
    }

    //edges.push([i, i + 2]);
    //edges.push([i, i + 3]);
  }
  for (var i = 0;i<nodes.length;i++){
    //nodes[i][0] -= 200;
  }
  //rotateX3D(30);
  //rotateY3D(30);*/
  var offset = findExtremes();
  for (var i = 0;i<nodes.length;i++){
    //nodes[i][0] -= (offset[0] + offset[2])/2;
    //nodes[i][1] -= (offset[1] + offset[3])/2;
  }
  console.log((offset[0]+offset[2])/2);

}
function getBondAngles3D(a){
  var angs = [];
  //var
  return angs;
}

var rotateZ3D = function(theta) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);

    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cos_t - y * sin_t;
        node[1] = y * cos_t + x * sin_t;
    }
};
var rotateY3D = function(theta) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);

    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cos_t - z * sin_t;
        node[2] = z * cos_t + x * sin_t;
    }
};
var rotateX3D = function(theta) {
    var sin_t = sin(theta);
    var cos_t = cos(theta);

    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cos_t - z * sin_t;
        node[2] = z * cos_t + y * sin_t;
    }
};
function findExtremes(){
  var ex = [0,0,0,0];
  var minX = minY = Number.MAX_VALUE;
  var maxX = maxY = Number.MIN_VALUE;
  for (var i = 0;i<nodes.length;i++){
    var n = nodes[i];
    if (n[0] < minX){
      minX = n[0];
    }
    if (n[1] < minY){
      minY = n[1];
    }
    if (n[0] > maxX){
      maxX = n[0];
    }
    if (n[1] > maxY){
      maxY = n[1];
    }
  }
  return [minX, minY, maxX, maxY];
}
var count = 0;
function draw(){
  translate(width/2, height/2);
  background(255);
  stroke(0, 100, 150);
  for (var i = 0;i<edges.length;i++){
    line(nodes[edges[i][0]][0], nodes[edges[i][0]][1], nodes[edges[i][1]][0], nodes[edges[i][1]][1]);
  }

  fill(100, 200, 255);
  for (var i = 0;i<nodes.length;i++){
    fill(nodes[i][3]);
    //ellipse(nodes[i][0], nodes[i][1], nodeSize - nodes[i][2]/20, nodeSize - nodes[i][2]/20);
    ellipse(nodes[i][0], nodes[i][1], nodeSize, nodeSize);
  }
  if (frameCount % 30 == 0){
    count++;
  }
}
function mouseDragged(){
  rotateY3D(mouseX - pmouseX);
  rotateX3D(mouseY - pmouseY);
}
