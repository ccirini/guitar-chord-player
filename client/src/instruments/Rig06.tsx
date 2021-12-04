// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List } from 'immutable';
import React, {useState} from 'react';
import Drum from "../components/Drum";
import '../components/Drum.css'

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */
interface DrumKeyProps {
  note: string;
  synth?: Tone.Synth; // Contains library code for making sound
}

export function DrumKit({
note,
synth
}: DrumKeyProps): JSX.Element {
  const [sounds] = useState([
		{
			sound: require("../sounds/boom.wav").default,
			key: "A",
      img: require('../img/bassboom.png').default
		},
    {
			sound: require("../sounds/kick.wav").default,
			key: "S",
      img: require('../img/drumkick.png').default
		},
		{
			sound: require("../sounds/clap.wav").default,
			key: "D",
      img: require('../img/clapstack.png').default
		},
		{
			sound: require("../sounds/hihat.wav").default,
			key: "F",
      img: require('../img/hihat.png').default
		},
    {
			sound: require("../sounds/tink.wav").default,
			key: "G",
      img: require('../img/tiks.png').default
		},

		{
			sound: require("../sounds/openhat.wav").default,
			key: "H",
      img: require('../img/openhihat.png').default
		},
		{
			sound: require("../sounds/ride.wav").default,
			key: "J",
      img: require('../img/ridecymbal.png').default
		},
		{
			sound: require("../sounds/snare.wav").default,
			key: "K",
      img: require('../img/snare.png').default
		},
		{
			sound: require("../sounds/tom.wav").default,
			key: "L",
      img: require('../img/floortomedt.png').default
		},
	]);
	
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
	);
}

function PianoType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}>
      {title}
    </div>
  );
}// PianoType




function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {

  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);


  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();
      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">    
      <div>
      <DrumKit
        note={''}
        synth={synth}/>
      </div>
    

    
      <div className={'pl4'}>
        {oscillators.map(o => (
          <PianoType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          >
          </PianoType>
        ))}

      </div>





    </div>
  );
}// PIANO

export const Drumkit = new Instrument('Rig06', Piano);



/*

      <DrumKit
        note={''}
        synth={synth}/>
*/