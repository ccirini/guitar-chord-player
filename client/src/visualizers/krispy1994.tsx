// 3rd party library imports
import p5 from "p5";
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

// Global vars
var amplitude: number;

// Initial Position of horn
const INIT_HORN_POS_Y = 200;
const INIT_HORN_POS_X = 1000;
var InitRadius = 150;
const HORN_WEIGHT = 10;

function setUp(p5: p5) {
    p5.angleMode('degrees');
    p5.background(0);
    p5.translate(INIT_HORN_POS_X, INIT_HORN_POS_Y);
}

export const krispy1994Visualizer = new Visualizer(
    'krispy1994',
    (p5: p5, analyzer: Tone.Analyser) => {
        setUp(p5);

        const horn = new CircleWave(p5, analyzer, InitRadius, [0, 0, 0] , HORN_WEIGHT);
        horn.drawEffect(-300, 0);
        if (amplitude !== 0){
            const cir_02 = new CircleWave(p5, analyzer, InitRadius - 120, [255, 8, 0] , 0.5);
            cir_02.drawEffect(0, 0);
        }

        const mouthpiece = new CircleWave(p5, analyzer, (InitRadius / 15), [0, 0, 0] , HORN_WEIGHT);
        mouthpiece.drawEffect(-450, 0);
        if (amplitude !== 0){
            const cir_02 = new CircleWave(p5, analyzer, InitRadius - 120, [255, 8, 0] , 0.5);
            cir_02.drawEffect(0, 0);
        }
        
        const waveBars = new WaveBars(p5, analyzer);
        waveBars.drawBars(250, 250);

        const stem = new DrawRec(p5, 40, -475);
        stem.drawRect(300, 50, 50);

        const valve1 = new DrawRec(p5, 185, -50);
        valve1.drawRect(20, 50, 0);

        const valve2 = new DrawRec(p5, -40, 0);
        valve2.drawRect(20, 50, 0);

        const valve3 = new DrawRec(p5, -40, 0);
        valve3.drawRect(20, 50, 0);
    }
);

class WaveBars {
    p5: p5
    analyzer: Tone.Analyser
    constructor(p5: p5, analyzer: Tone.Analyser) {
        this.p5 = p5;
        this.analyzer = analyzer;
    }
    // Render loop that draws shapes with p5
    drawBars(box_x_pos: number, box_y_pos: number) {
        this.p5.translate(box_x_pos, box_y_pos)
        this.drawRecMidRect(this.p5); // rec-waves box

        const values = this.analyzer.getValue();
        this.p5.noStroke();
        var bars = 100;
        this.p5.translate(-250, 200);

        for (var i = 0; i < bars; i++) {
            var amp = values[i] as number;
            const bar_x = i * 5;
            const bar_width = 4.5;
            if (amp > 0) {
                amp = amp * -1;
            }
            const bar_height = amp / 4;
            this.p5.fill(0);
            this.p5.rect(bar_x, 5, bar_width, ((500 * bar_height) -2));
        }
    }

    drawRecMidRect(p5: p5) {
        p5.noStroke();
        const color = generateRandomColors()
        p5.fill(color[0], color[1], color[2]);
        p5.rect(0, 500, 500, 200);
    }
}
class DrawRec {
    p5: p5;
    x_pos: number;
    y_pos: number;

    constructor(p5: p5, x_pos: number, y_pos: number) {
        this.p5 = p5;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
    }

    drawRect(width: number, height: number, border: number) {
        this.p5.translate(this.x_pos, this.y_pos)
        this.p5.noStroke();

        if (amplitude === 0) {
            this.p5.fill(0, 0, 0);
        } else {
            var color = generateRandomColors();
            this.p5.fill(color[0], color[1], color[2]);
        }
        this.p5.rect(0, 0, width, height);
    }
}

class CircleWave {
    p5: p5;
    values: any;
    radius: number;
    color: number [];
    shape_weight: number;
    constructor (p5: p5, waveValues: Tone.Analyser, radius: number,
    fill_color: number [], circum_w: number) {
        this.p5 = p5;
        this.values = waveValues.getValue();
        this.radius = radius;
        this.color = fill_color;
        this.shape_weight = circum_w;
    }

    drawEffect(canvas_pos_x: number, canvas_pos_y: number): void {
        this.p5.translate(canvas_pos_x, canvas_pos_y)
        this.p5.strokeWeight(this.shape_weight); // Density of the circumference
        const stroke = generateRandomColors();
        this.p5.stroke(stroke[0], stroke[1], stroke[2]);
        this.p5.fill(
            this.color[0],
            this.color[1],
            this.color[2]);
        this.p5.beginShape();
        for (let i = 0; i <= 180; i+= 0.5) {
            var index = Math.floor(this.p5.map(i, 0, 180, 0, this.values.length-1));
            amplitude = this.values[index] as number;
            var r = this.p5.map(amplitude, -1, 1, 50, this.radius)
            var x = r * Math.sin(i);
            var y = r * Math.cos(i);
            // Place vertex
            this.p5.vertex(x , y);
        }
        this.p5.endShape();
    }
}

function generateRandomColors(): number [] {
    return [Math.floor(Math.random() * 250) + 150,
        Math.floor(Math.random() * 250) + 150,
        Math.floor(Math.random() * 250) + 150];
}
