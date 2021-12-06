// 3rd party library imports
import * as Tone from 'tone';
import React, {useState} from 'react';
import Drum from "../components/Drum";
import '../components/Drum.css'
// project imports
import { Instrument, InstrumentProps } from '../Instruments';
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
function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
  return (
    <div className="pv4">    
      <div>
      <DrumKit
        note={''}
        synth={synth}/>
      </div>
    </div>
  );
}// PIANO
export const Drumkit = new Instrument('Rig06', Piano);
