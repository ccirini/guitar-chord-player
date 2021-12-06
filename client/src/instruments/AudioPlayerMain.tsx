// 3rd party library imports
import * as Tone from 'tone';
import Mp3Player from "../components/AudioPlayer";
import '../components/AudioPlayer.css'

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */
interface MP3Player {
  synth?: Tone.Synth; // Contains library code for making sound
}
export function AudioPlayer({
synth
}: MP3Player): JSX.Element {

  

	return (
     
        <Mp3Player></Mp3Player> 
        
	);
}
function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
  return (
    <div className="mp3-player">
      <AudioPlayer
        synth={synth}/>
      </div>
  );
}// PIANO




export const Audioplayer = new Instrument('AudioPlayer', Piano);

