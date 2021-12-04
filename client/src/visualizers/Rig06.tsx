// 3rd party library imports
import p5 from "p5";
import P5 from 'p5';
import * as Tone from 'tone'; // Waveform
// project imports
import { Visualizer } from '../Visualizers';
// Global vars
var amplitude: number;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
//const particles: Particle [] = [];

// Initial Position of glowing right circle O O
const INI_CIRCLE_POS_Y = 130;
const INI_CIRCLE_POS_X = 740;
var InitRadius = 150;
const CIRC_WEIGHT = 4.8;

function setUp(p5: p5){
  p5.angleMode('degrees')
  p5.background(0)
  p5.translate(INI_CIRCLE_POS_X, INI_CIRCLE_POS_Y);
}

export const MiniTron = new Visualizer(
'Rig06',  (p5: p5, analyzer: Tone.Analyser) => {
  setUp(p5)

  const cir_01 = new CircleWave(p5,  analyzer, InitRadius, [0, 0, 0] , CIRC_WEIGHT);
  cir_01.darwEffect(0, 0);
  if(amplitude !== 0){
    const cir_02 = new CircleWave(p5,  analyzer, InitRadius - 120, [255, 8, 0]   , 0.5); 
    cir_02.darwEffect(0, 0);
  }

 

  const cir_02 = new CircleWave(p5,  analyzer, InitRadius, [0, 0, 0] , CIRC_WEIGHT);
  cir_02.darwEffect(-300, 0);
  if(amplitude !== 0){
    const cir_02 = new CircleWave(p5,  analyzer, InitRadius - 120, [255, 8, 0]  , 0.5); 
    cir_02.darwEffect(0, 0);
  }
 
  const waveBars = new WaveBars(p5, analyzer);
  waveBars.drawBars(0, 0);

  const rect_top = new DrawRec(p5, 0, -600, -540); // red rec center
  rect_top.drawRect(1500, 200, 0);

  

  //const rect_center = new DrawRec(p5, 0, 0, 0);// left
  //rect_center.drawRect(WIDTH - 1440, HEIGHT - 500, 0)

 const rect_left = new DrawRec(p5, -17, 1100, 300);// right
 rect_left.drawRect(700, 600, 0)
//
 const rect_right = new DrawRec(p5, 29, -1420, 0); // left
 rect_right.drawRect(700, 600, 0);

  } // callback () =>{}
); // Export


class WaveBars{
  p5: p5
  analyzer: Tone.Analyser
  constructor(p5: p5, analyzer: Tone.Analyser){
    this.p5 = p5;
    this.analyzer = analyzer;
  }
    // Render loop that draws shapes with p5
      drawBars(box_x_pos: number, box_y_pos: number) {

      this.p5.translate(box_x_pos, 250)
      this.drawRecMidRect(this.p5); // rec-waves box

      const values = this.analyzer.getValue();
      this.p5.noStroke();
      var bars = 55;
      this.p5.translate(14, -30)
    
      for (var i = 0; i < bars; i++) {
        var amp = values[i] as number;
       const bar_x = i * 5;
        const bar_width = 4.5;
        if(amp > 0) amp = amp*-1;
        const bar_height = amp / 4;
        this.p5.fill(0);
        this.p5.rect(
          bar_x,
          5,
          bar_width,
          (500 * bar_height) -2
        );
      }
    }

    drawRecMidRect(p5: p5){
    //  p5.translate(WIDTH - 1440, HEIGHT - 500)
      p5.noStroke();
      const color = randomColor()
      p5.fill(color[0], color[1], color[2]);
        p5.rect(
        0,
        -20,
        300,
         -50,
         p5.PI + 20.0,
         p5.PI + 20.0,
         p5.PI,
         p5.PI
      );
      
        }

}

    class DrawRec{
      p5: p5;
      shear: number;
      x_pos: number;
      y_pos: number;

      constructor(p5: p5, shear: number, x_pos: number, y_pos: number){
        this.p5 = p5;
        this.shear = shear;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
      }

       drawRect(width: number, height: number, border: number) {
      this.p5.translate(this.x_pos, this.y_pos)
      this.p5.noStroke();
      this.p5.shearX(this.shear)

      if(amplitude === 0){
      this.p5.fill(248, 53, 53);
      } else {
        var color = randomColor();
        this.p5.fill(color[0], color[1], color[2]);
      }


      this.p5.rect(
        0,
        0,
        width,
         height,
         25
      );
    }


  }

class CircleWave{
  p5: P5;
  values: any;
  radius: number;
  color: number [];
  shape_weight: number;
  constructor(p5: p5, waveValues: Tone.Analyser, radius: number,
    fill_color: number [], circum_w: number){
    this.p5 = p5;
    this.values = waveValues.getValue();
    this.radius = radius;
    this.color = fill_color;
    this.shape_weight = circum_w;
  }

 darwEffect(canvas_pos_x: number, canvas_pos_y: number): void{
  this.p5.translate(canvas_pos_x, canvas_pos_y)
  this.p5.strokeWeight(this.shape_weight); // Density of the circumference 
  const stroke = randomColor();
  this.p5.stroke(stroke[0],
    stroke[1],
    stroke[2]);
  this.p5.fill(
    this.color[0],
    this.color[1],
    this.color[2]);
  this.p5.beginShape();
  for (let i = 0; i <= 180; i+= 0.5) {
      var index = Math.floor(this.p5.map(i, 0, 180, 0, this.values.length-1));
      amplitude = this.values[index] as number;
      var r = this.p5.map(amplitude, -1, 1, 50, this.radius)
      var x = r * Math.sin(i) ;
      var y = r * Math.cos(i)
      // Place vertex
      this.p5.vertex(x , y);
  }
  this.p5.endShape();
}
}

//==================================================================
// Class particle
class Particle {
   pos: p5.Vector;
   vel: p5.Vector;
   acc: p5.Vector;
   w: number;
   color: number [];
   p5: p5;
  
  constructor(p5: p5, color: number []){
    this.color = color;
    this.p5 = p5;
     var r = p5.map(amplitude, -1, 1, 40, 150)
     var angle = p5.random(0, 180)
     var x = r * Math.sin(angle);
     var y = r * Math.cos(angle)
    this.pos = p5.createVector(x , y)
    this.vel = p5.createVector(-.4, .1);
    this.acc = this.pos.copy().mult(p5.random(0.0000200, 0.0000300))
    this.w = p5.random(3, 5)*amplitude*10;
   // this.color = randomColor();
  
   }
   update(cond: number): void{
     this.vel.add(this.acc);
     this.pos.add(this.vel );
     if(cond){
       this.pos.add(this.vel);
       this.pos.add(this.vel);

       this.pos.add(this.vel);

       
     }
   }
   edges(width: number, height: number): boolean{
     if(this.pos.x < -width / 2 || this.pos.x > width / 2
       || this.pos.y < -height / 2 || this.pos.y > height / 2){
         return true;
     } else {
       return false;
     }
   }
  show(): void{
    this.p5.translate(500,0)
   this.p5.noStroke()
   this.p5.fill(this.color[0],
     this.color[1],
     this.color[2])
   var x = this.pos.x;
   var y = this.pos.y;
  this.p5.ellipse(x, y, this.w);
   this.p5.ellipse(-x, y, this.w);
   this.p5.ellipse(x, -y, this.w);
   this.p5.ellipse(-x, -y, this.w);
  }
}




//==================================================================
// Class FlowField
class FlowField {
    multi: number;
    p5: p5;
    points: P5.Vector [];
	  density: number;
	  space: number;
  	constructor(p5: P5) {
    this.multi = 0.0005;
    this.p5 = p5;
    this.points = [];
    this.density = 20;
    this.space = WIDTH / this.density;
	}

  setUpAndDraw(): void{
    this.p5.translate(-150,20);
    this.p5.shearY(2)
    for(var x = 0; x < WIDTH/2; x += this.space){
      for(var y = 0; y < HEIGHT; y += this.space){
        var p = this.p5.createVector(x + this.p5.random(-10, 10),
        y + this.p5.random(-10, 10));
        this.points.push(p);
      }
    }
    this.draw();
  }

	draw(): void{
    this.p5.noStroke();
    this.p5.fill(0);
    for (var i = 0; i < this.points.length; i++) {      
      var angle = this.p5.map(this.p5.noise(this.points[i].x * this.multi,
      this.points[i].y* this.multi),0, 1, 0, 10);
      this.points[i].add(this.p5.createVector(this.p5.cos(angle), this.p5.sin(angle)));
      this.p5.ellipse(this.points[i].x, this.points[i].y, 35 * amplitude); //5* amplitude
    }
    this.points.splice(0,this.points.length)
	}
}
function randomColor(): number [] {
  return [Math.floor(Math.random()*250) + 150,
     Math.floor(Math.random()*250) + 150,
      Math.floor(Math.random()*250) + 150];
}


