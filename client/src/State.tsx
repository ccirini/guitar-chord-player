// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/ccirini';
import { WaveformVisualizer } from './visualizers/Waveform';
import { ccirini} from './visualizers/ccirini';

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

const instruments = List([PianoInstrument,GuitarInstrument]);
const visualizers = List([WaveformVisualizer,ccirini]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
