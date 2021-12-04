// 3rd party library imports
import P5 from 'p5';
import * as rp5 from 'react-p5';
import * as Tone from 'tone';
import { couldStartTrivia } from 'typescript';

// project imports
import { Visualizer } from '../Visualizers';




export const Vis = new Visualizer(
  'yujarvis08',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    let randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    let angle = 0;
    
    p5.background(0, 0, 0, 255);

    p5.stroke(Math.random() * 256, Math.random() * 256, Math.random() * 256, Math.random() * 256);
    p5.strokeJoin('round');
    p5.strokeWeight(2.5);
    p5.noFill();
    p5.smooth();

    p5.translate(width / 2.5, height / 2);
    const values = analyzer.getValue();

    p5.beginShape();
    for (let i = 0; i < values.length / 2; i++) {
      const amplitude = values[i] as number;
      const x = Math.tan(amplitude) * 150;
      const y = (Math.random() * 30) * Math.sin(amplitude) * 4;
      let circ = p5.circle(x, y, 100);
      circ.vertex(x, y);
      let circ2 = p5.circle(x, y, 200);
      circ2.vertex(x, y);
      let circ3 = p5.circle(x, y, 300);
      circ3.vertex(x, y);

      p5.push();
      p5.translate(x, y);
      p5.rotate(angle);
      p5.fill('white');
      p5.rect(x, y, 10, 10);
      p5.pop();

      p5.push();
      p5.translate(x, y);
      p5.rotate(angle);
      p5.fill(randomColor);
      p5.circle(-200, 0, 10);
      p5.pop();

      p5.push();
      p5.translate(x, y);
      p5.rotate(angle);
      p5.fill(randomColor);
      p5.circle(-250, 0, 10);
      p5.pop();

      angle++;

    }

    p5.endShape();

  },
);