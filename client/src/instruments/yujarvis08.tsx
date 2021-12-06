import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import { Instrument, InstrumentProps } from '../Instruments';

interface XylophoneKeyProps {
  note: string;
  synth?: Tone.AMSynth;
  octave: number;
}

let asynth = new Tone.AMSynth().toDestination();
const filter = new Tone.Filter("C6").toDestination();
const freeverb = new Tone.Freeverb().toDestination();
freeverb.dampening = 160;

asynth.set({

	envelope: {
		attack: 0.01,
        sustain: 1,
	},
    volume: 5,
});

asynth.connect(freeverb);
asynth.connect(filter);

asynth.harmonicity.value = 32;

let randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);

export function XylophoneKey({
  note,
  synth,
}: XylophoneKeyProps): JSX.Element {

  return (
    <div
      onMouseDown={() => synth?.triggerAttackRelease(`${note}`, '64n')}
      style={{
        height: "23rem",
        width: "6.5rem",
        backgroundColor: randomColor+10,
        margin: "0.2rem",
        display: "inline-block",
        border: "solid",
        borderRadius: "20px",
        zIndex: -1
      }}
    >
      <div className="circle"
        style={{height: "20px",
        width: "20px",
        borderRadius:"50%",
        backgroundColor: "black",
        marginLeft: "2.3rem",
        marginTop:"10px"}}>
      </div>
      <div className="circle2"
        style={{height: "20px",
        width: "20px",
        borderRadius:"50%",
        backgroundColor: "black",
        marginLeft: "2.3rem",
        marginTop:"18.5rem"}}>
      </div>
    </div>
    
  );
}

function Xylophone({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 4 },
    { note: 'D', idx: 5 },
    { note: 'E', idx: 6 },
    { note: 'F', idx: 7 },
    { note: 'G', idx: 8 },
    { note: 'A', idx: 9 },
    { note: 'B', idx: 10 },
  ]);

  const setOscillator = () => {
    setSynth(oldSynth => {
      oldSynth.disconnect();
      
      return new Tone.Synth(
        synth.get()
      ).toDestination();
    });
  };

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(3, 5).map(octave =>
          keys.map(key => {
            const note = `${key.note}${octave+2}`;
            return (
              <XylophoneKey
                note={note}
                synth={asynth}
                octave={octave}
              />
            );
          }),
        )}
      </div>
      <div className='dib w-30 pa2' onMouseDown={()=> setOscillator()}>
            <button className='w-100 bg-light-silver'>Set as active instrument</button>
        </div>
    </div>
  );
}

export const XylophoneInstrument = new Instrument('yujarvis08', Xylophone);