// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/ccirini';
import { XylophoneInstrument } from './instruments/yujarvis08';
import { WaveformVisualizer } from './visualizers/Waveform';
import { ccirini} from './visualizers/ccirini';
import { Vis} from './visualizers/yujarvis08';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;

const instruments = List([PianoInstrument,GuitarInstrument,XylophoneInstrument]);
const visualizers = List([WaveformVisualizer,ccirini, Vis]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
