// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Guitar.
 ** ------------------------------------------------------------------------ */
interface GuitarProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.PolySynth; // Contains library code for making polyphonic sound
  muted?: boolean;
  octave: number;
  stringName?: string;
  stringIndex: number;
  transpositionaOffset: number; // Transpositional offset
  activeNotesProp: string[]; // Polyphonic note output
  fretsProp: List<{note: string,idx:number}>; 
}

// Polysynth setup for a unique Guitar sound
const limiter = new Tone.Limiter(0).toDestination();
const filter = new Tone.FeedbackCombFilter(1/1000,.7).toDestination();
let pSynth = new Tone.PolySynth();
pSynth.maxPolyphony = 7;
pSynth.toDestination();

pSynth.set({
	oscillator: {
		type: "fmsine5"
	},
	envelope: {
		attack: 0.01,
        decay: .3,
        sustain: .3,
	},
    volume: -15,
});

pSynth.connect(filter);
pSynth.connect(limiter);

export function GuitarString({
  stringName,
  stringIndex,
  transpositionaOffset,
  activeNotesProp,
  fretsProp,
  octave,

}: GuitarProps): JSX.Element {
  return (
    <div className = 'inline-flex br b--black'>
        <div onMouseDown={()=>{activeNotesProp[stringIndex] = '';
            }} className='inline-flex pa1 bg-silver'>
            <input className='flex bg-transparent' type='radio' value='male' name= {`string${stringIndex}`}/>
        </div>
        <div className ='flex w1'>
            <text className='flex-auto f3'>{stringName}</text>
        </div>
    {Range(octave+1, octave+3).map(currentOctave =>
        fretsProp.map(key => {
            let note = `${key.note}${currentOctave}`;
            let fretStyle: string = 'inline-flex bg-light-yellow br b--silver pa1';
            note = Tone.Midi(note).transpose(transpositionaOffset).toNote();
            if(currentOctave === octave+1 && key.note === 'E' ){
                fretStyle = 'inline-flex br b--washed-yellow bw3 pa1';
            }
            return (
                <div className = {fretStyle}>
                    <div
                    onMouseDown={()=>{activeNotesProp[stringIndex] = note;}}
                    className='flex-auto pr2 pl2 bg-transparent'
                    >
                        <input className='flex' type='radio' value='male' name= {`string${stringIndex}`}/>
                    </div>
                </div>
            );
        }),
        )}
    </div>
  );
}

function fretMarker(numberOfFrets: number){
  return(
    <div className='inline-flex pt3'>
    <text style={{
        paddingRight: 10,
        fontSize: 12,
        }}>Mute</text>
    <text style={{
        paddingRight: 19,
        fontSize: 12
    }}>Open</text>
      <div>{Range(1,numberOfFrets-1).map(fret => {
          return(
              <text style={{
                  paddingRight:26.5,
                  fontSize:12,
                  alignItems: 'center',
            }}>{fret.toString().padStart(2,'0')}</text>
          )
      }
      )}</div>
      </div>
  )
}


function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const frets = List([
    { note: 'E', idx: 0 },
    { note: 'F', idx: 1 },
    { note: 'Gb', idx: 2 },
    { note: 'G', idx: 3 },
    { note: 'Ab', idx: 4 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 6 },
    { note: 'B', idx: 7 },
    { note: 'C', idx: 8 },
    { note: 'Db', idx: 9 },
    { note: 'D', idx: 10 },
    { note: 'Eb', idx: 11 },
  ]);

  const guitarStrings = List([
    { note: 'E', octave: 4, offset: 0, str: 1},
    { note: 'B', octave: 4, offset: -5, str: 2},
    { note: 'G', octave: 3, offset: 3, str: 3},
    { note: 'D', octave: 3, offset: -2, str: 4},
    { note: 'A', octave: 2, offset: 5, str: 5},
    { note: 'E', octave: 2, offset: 0, str: 6},
  ]);

  let activeNotes: string[] = ['','','','','',''];

  function strum(){
    pSynth.releaseAll();
    Tone.Transport.cancel();
    pSynth.unsync();

    let temp = activeNotes.filter(n=>n!=='')
    let triggeredNotes: string[] = temp.map(x=>Tone.Frequency(x).toNote())

    pSynth.triggerAttackRelease(triggeredNotes,.6);
  }

  function pluck(){
    pSynth.releaseAll();
    Tone.Transport.cancel();
    Tone.Transport.stop();
    pSynth.sync();

    let temp = activeNotes.filter(n=>n!=='')
    let triggeredNotes: string[] = temp.map(x=>Tone.Frequency(x).toNote())

    for(let i = 0; i < triggeredNotes.length;i++){
        pSynth.triggerAttackRelease(triggeredNotes[i],.3,triggeredNotes.length - i);
    }
    Tone.Transport.start();
  }


  return (
    <div className='flex-column'>
        <div>{fretMarker(24)}</div>
        <div className='flex-column'>
        {guitarStrings.map(str =>{ 
                return(
                    <div className='flex'>
                     <GuitarString
                        note={str.note}
                        synth={pSynth}
                        octave={str.octave}
                        transpositionaOffset={str.offset}
                        stringName = {str.note}
                        activeNotesProp = {activeNotes}
                        fretsProp = {frets}
                        stringIndex ={str.str}
                    />
                </div>
                )
            })}
        <div onMouseDown={()=> strum()}>
            <button>strum</button>
        </div>
        <div onMouseDown={()=> pluck()}>
            <button>pluck</button>
        </div>
        </div>
    </div>
  );
}

export const GuitarInstrument = new Instrument('ccirini', Guitar);

