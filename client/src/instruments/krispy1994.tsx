// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { useState, useEffect } from 'react';
import '../css/Trumpet.css';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Trumpet.
 ** ------------------------------------------------------------------------ */

/* interface TrumpetValveProps {
    noteAdjustment: number;
    pressed?: boolean;
} */

/* export function TrumpetValve({
    noteAdjustment,
    pressed,
}: TrumpetValveProps): JSX.Element {
    return (
        <div></div>
    )
} */

// type MuteType = 'straight' | 'harmon' | 'cup' | 'plunger';

interface TrumpetProps {
    partial: number; // Bb3, F4, Bb4, D5, F5, Bb5
    sampler?: Tone.Sampler;
    valvesPressed?: Array<{valvePressed: boolean, noteOffset: number}>;
    //muted?: string; TODO
}

const trumpetSampler = new Tone.Sampler({
    urls: {
        "Bb3": "trumpet_bflat3.wav",
        "F4": "trumpet_f4.wav",
        "Bb4": "trumpet_bflat4.wav",
        "D5": "trumpet_d5.wav",
        "F5": "trumpet_f5.wav",
        "Bb5": "trumpet_bflat5.wav",
    },
    release: 1,
    baseUrl: "../sounds/trumpet/",
}).toDestination();

export function TrumpetPartial(props: { partialKey: string }) {
    const [partialPressed, setPartialPressed] = useState(false);
    const pressPartial = () => {
        if (partialPressed === true) {
            setPartialPressed(false);
        } else {
            setPartialPressed(true);
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === props.partialKey.toLowerCase() && !e.repeat) {
                console.log(`You pressed ${e.key.toLowerCase()}`);
                pressPartial();
            }
        });
    })

    return (
        <div className='partialSelector'>
            <input type='radio' name='trumpetPartialSelector' checked={partialPressed ? true : false} />
            <div className='partialKey'>{props.partialKey}</div>
        </div>
    );
}

export function TrumpetValve(props: { valveKey: string }) {
    const [valvePressed, setValvePressed] = useState(false);
    const alternateValve = () => {
        if (valvePressed === true) {
            setValvePressed(false);
        } else {
            setValvePressed(true);
        }
    };

    //https://stackoverflow.com/questions/6087959/prevent-javascript-keydown-event-from-being-handled-multiple-times-while-held-do

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === props.valveKey.toLowerCase() && !e.repeat) {
                e.preventDefault();
                console.log(`You pressed ${e.key.toLowerCase()}`);
                alternateValve();
            }
        });
    });

    const Button = ({}: any): JSX.Element => {
        return <button className="valve-button">
            <div className='key-kbd'><kbd>{props.valveKey}</kbd></div>
        </button>;
    };

    return (
        <div className={`valve_${valvePressed ? "down" : "up"}`}>
            <Button onClick={alternateValve} />
        </div>
    );
}

export function TrumpetBody(props:
    {
        partial: number,
        valvesPressed?: Array<{valvePressed: boolean, noteOffset: number}>
    }): JSX.Element {
    const resolveNote = () => {
        return 'Bb3';
        /* let sumValvesPressed = 0;
        if (props.valvesPressed) {
            for (let i = 0; i < props.valvesPressed.length; i++) {
                sumValvesPressed += props.valvesPressed[i].noteOffset;
            }
        } */
        
        /* const resolvedNote = props.partial - sumValvesPressed;
        //console.log(resolvedNote);
        
        if (resolvedNote === 0) {
            return 'E3';
        } else if (resolvedNote === 1) {
            return 'F3';
        } else if (resolvedNote === 2) {
            return 'Gb3';
        } else if (resolvedNote === 3) {
            return 'G3';
        } else if (resolvedNote === 4) {
            return 'Ab3';
        } else if (resolvedNote === 5) {
            return 'A3';
        } else if (resolvedNote === 6) {
            console.log('Returning Bb3...');
            return 'Bb3';
        } else if (resolvedNote === 7) {
            return 'B3';
        } else if (resolvedNote === 8) {
            return 'C4';
        } else if (resolvedNote === 9) {
            return 'Db4';
        } else if (resolvedNote === 10) {
            return 'D4';
        } else if (resolvedNote === 11) {
            return 'Eb4';
        } else if (resolvedNote === 12) {
            return 'E4';
        } else if (resolvedNote === 13) {
            return 'F4';
        } else if (resolvedNote === 14) {
            return 'Gb4';
        } else if (resolvedNote === 15) {
            return 'G4';
        } else if (resolvedNote === 16) {
            return 'Ab4';
        } else if (resolvedNote === 17) {
            return 'A4';
        } else if (resolvedNote === 18) {
            return 'Bb4';
        } else if (resolvedNote === 19) {
            return 'B4';
        } else if (resolvedNote === 20) {
            return 'C5';
        } else if (resolvedNote === 21) {
            return 'Db5';
        } else if (resolvedNote === 22) {
            return 'D5';
        } else if (resolvedNote === 23) {
            return 'Eb5';
        } else if (resolvedNote === 24) {
            return 'E5';
        } else if (resolvedNote === 25) {
            return 'F5';
        } else if (resolvedNote === 26) {
            return 'Gb5';
        } else if (resolvedNote === 27) {
            return 'G5';
        } else if (resolvedNote === 28) {
            return 'Ab5';
        } else if (resolvedNote === 29) {
            return 'A5';
        } else if (resolvedNote === 30) {
            return 'Bb5';
        } else {
            return 'Bb3';
        } */
    }

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === "e" && !e.repeat) {
                console.log('You pressed e!');
                trumpetSampler.triggerAttackRelease('Bb3', 4);
            }
        });
        document.addEventListener("keyup", (e) => {
            if (e.key.toLowerCase() === "e" && !e.repeat) {
                console.log('You let go of e!');
                trumpetSampler.triggerAttackRelease('Bb3', 4);
            }
        });
    });

    const Button = ({}: any): JSX.Element => {
        return <button id='trumpet-body'>
        </button>;
    };

    return (
        <Button className="trumpetBody" />
    );
}

function Trumpet ({}: InstrumentProps): JSX.Element {
    const valves = List([
        {
            noteOffset: 2,
            key: "1"
        },
        {
            noteOffset: 1,
            key: "2"
        },
        {
            noteOffset: 3,
            key: "3"
        },
    ]);

    const partials = List([
        {
            open: 6, // Bb3
            key: "t"
        },
        {
            open: 13, // F4
            key: "y"
        },
        {
            open: 18, // Bb4
            key: "u"
        },
        {
            open: 22, // D5
            key: "i"
        },
        {
            open: 25, // F5
            key: "o"
        },
        {
            open: 30, // Bb5
            key: "p"
        },
    ])

/*     const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth(oldSynth => {
            oldSynth.disconnect();
        
            return new Tone.Synth({
                oscillator: { type: newType } as Tone.OmniOscillatorOptions,
            }).toDestination();
        });
    }; */

/*     const mutes: List<MuteType> = List([
        'straight',
        'harmon',
        'cup',
        'plunger',
      ]) as List<MuteType>; */
    
    return (
        <div className='trumpetContainer'>
            <div className='valves'>
                {valves.map(valve => (
                    <TrumpetValve valveKey={valve.key}></TrumpetValve>
                ))}
            </div>
            <div id='trumpet'>
                <TrumpetBody partial={6}></TrumpetBody>
            </div>
            <div className='partials'>
                {partials.map(partial => (
                    <TrumpetPartial partialKey={partial.key}></TrumpetPartial>
                ))}
            </div>
        </div>
    );
/* 
    return (
		<div className="drum-set">
			<div className="drums">
				{sounds.map((sound, i) => (
					<Drum img={sound.img}  key={i} letter={sound.key} sound={sound.sound}></Drum>  
				))}
			</div>
      <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} 
      onMouseUp={() => synth?.triggerRelease('+0.25')}>
      </div>

		</div>
	); */
}

export const TrumpetInstrument = new Instrument('krispy1994', Trumpet);
