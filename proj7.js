// Andrew Duerr
// CS 435
// Project 7: The purpose of this project was to demostrate a few of the
// techniques we learned this semester. For this project I tried something new for me
// and made a sphere. I also made the texture changeable, something that I could
// not accomplish for project 5.

var canvas = document.getElementById('webgl');
 var gl = WebGLUtils.setupWebGL(canvas);

 var images = [];
 var imageIndex = 0;

 var earth = new Image()
 earth.src = './earth2.jpg';
 earth.onload = () => start();
 images[0] = earth;

 var marsImage = new Image()
 marsImage.src = './mars.jpg';
 marsImage.onload = () => start();
 images[1] = marsImage;

 var baseImage = new Image()
 baseImage.src = './baseball.jpg';
 baseImage.onload = () => start();
 images[2] = baseImage;

 var basketball = new Image()
 basketball.src = './BasketballColor.jpg';
 basketball.onload = () => start();
 images[3] = basketball;

 var tennisball = new Image()
 tennisball.src = './tennis.jpg';
 tennisball.onload = () => start();
 images[4] = tennisball;

 var backgrounds = [
   './space.jpg',
   './baseballField.jpg',
   './basketballCourt.jpg',
   './tennis-courts.jpg'
 ];

 function changeBGImage(index){
      document.body.background = backgrounds[index];
    }

 var vertexShaderSource = `
   attribute vec3 a_Position;
   attribute vec2 a_TexCoord;

   uniform mat4 u_ModelViewProjectionMatrix;

   varying vec2 v_TexCoord;

   void main() {
     // Output tex coord to frag shader.
     v_TexCoord = a_TexCoord;

     // Output the final position.
     gl_Position = u_ModelViewProjectionMatrix * vec4(a_Position, 1.0);
   }
 `;

 var fragmentShaderSource = `
   #ifdef GL_ES
     precision mediump float;
   #endif

   uniform sampler2D u_Sampler;

   varying vec2 v_TexCoord;

   void main() {
     // Get texture color for tex coord.
     gl_FragColor = texture2D(u_Sampler, v_TexCoord);
   }
 `;

 var shader;
 var sphereMaterial;
 var sphere;

 function start() {
   // Setup camera.
   var eye = [-5.0, 3.0, 5.0];
   var center = [0.0, 0.0, 0.0];
   var up = [0.0, 1.0, 0.0];
   var fov = Math.PI / 3;
   var aspect = 1.0;
   var near = 0.1;
   var far = 100.0;
   var camera = new Camera(eye, center, up, fov, aspect, near, far);

   document.body.style.backgroundRepeat = "no-repeat";
   document.body.style.backgroundSize = "cover";

   // Setup sphere with texture material.
   sphereMaterial = new Material(gl, null, null, null, null, images[imageIndex]);
   sphere = new Sphere(gl, 2, 250, 250, sphereMaterial);

   // Setup shader.
   shader = new Shader(gl, vertexShaderSource, fragmentShaderSource, null, camera, sphere);

   // Set up clear color and enable depth testing.
   gl.clearColor(0.0, 0.0, 0.0, 0.0);
   gl.enable(gl.DEPTH_TEST);

   document.getElementById("Buttonz").onclick = function(){
     imageIndex = 0;
     changeBGImage(0);
     start();
   };
   document.getElementById("ButtonX").onclick = function(){
     imageIndex = 1;
     changeBGImage(0);
     start();
   };
   document.getElementById("ButtonY").onclick = function(){
     imageIndex = 2;
     changeBGImage(1);
     start();
   };
   document.getElementById("ButtonA").onclick = function(){
     imageIndex = 3;
     changeBGImage(2);
     start();
   };
   document.getElementById("ButtonB").onclick = function(){
     imageIndex = 4;
     changeBGImage(3);
     start();
   };

   // Draw.
   shader.draw(gl, sphere);

   // render();
 }

 var render = function(){
     gl.clear( gl.COLOR_BUFFER_BIT );
     // sphereMaterial = new Material(gl, null, null, null, null, images[imageIndex]);
     // sphere = new Sphere(gl, 2, 250, 250, sphereMaterial);
     shader.draw(gl, sphere);
     requestAnimFrame(render);
 }
