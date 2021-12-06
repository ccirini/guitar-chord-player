// 3rd party library imports
import p5 from "p5";
import P5 from 'p5';
import * as Tone from 'tone'; // Waveform
// project imports
import { Visualizer } from '../Visualizers';
// Global vars
var amplitude: number;

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
function randomColor(): number [] {
  return [Math.floor(Math.random()*250) + 150,
     Math.floor(Math.random()*250) + 150,
      Math.floor(Math.random()*250) + 150];
}


