// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

import { Visualizer } from '../Visualizers';


export const SpinAndTrip = new Visualizer(
  'SpinAndTrip',
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
    
    for (let i = 0; i < values.length; i+=10) {
        p5.push();
        const amplitude = values[i] as number;
        p5.rotate((p5.frameCount +i)/100);
        p5.rect(0,0,i+(amplitude*1000),i+(amplitude*1000),20+Math.abs(10*amplitude));
        
        //bubble particles
        let point = p5.random(-height,height);
        if(amplitude!=0){
            p5.circle(point,point,(100*amplitude));
        }
        
        p5.pop();
    }  
  },
);
