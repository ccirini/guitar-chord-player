
// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

import { Visualizer } from '../Visualizers';

export const ccirini = new Visualizer(
  'ccirini',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    
    let r = 0;
    let g = 250;
    let b = 255;

    p5.rectMode(p5.CENTER);
    p5.background(0, 0, 0, 255);
    p5.noFill();
    p5.translate(width/3,height/2);
    p5.stroke(r,g,b);;

    const values = analyzer.getValue();

    let particles = [];
    
    for (let i = 0; i < values.length; i+=8) {
        p5.push();
        const amplitude = values[i] as number;
        p5.rotate((p5.frameCount +i)/(100));
        p5.rect(0,0,i+(amplitude*1000),i+(amplitude*1000),20);
     
        if(amplitude!==0){
            p5.stroke(255,255,255);
            particles.push(p5.circle(100+(100*amplitude),100+(100*amplitude),(100*amplitude)));
            particles.push(p5.circle(-1*100+(100*amplitude),-1*100+(100*amplitude),(100*amplitude)));
        }
        p5.pop();
    }  
  },
);
