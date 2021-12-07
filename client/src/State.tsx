// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';

import { Drumkit } from './instruments/Rig06';
import { MiniTron } from './visualizers/Rig06';

import { GuitarInstrument } from './instruments/ccirini';
import { ccirini } from './visualizers/ccirini';

import { XylophoneInstrument } from './instruments/yujarvis08';
import { Vis } from './visualizers/yujarvis08';

import { TrumpetInstrument } from './instruments/krispy1994';
import { krispy1994Visualizer } from './visualizers/krispy1994';

import { Audioplayer } from './instruments/AudioPlayerMain'


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

const instruments = List([PianoInstrument, Drumkit, GuitarInstrument, XylophoneInstrument, TrumpetInstrument, Audioplayer]);
const visualizers = List([WaveformVisualizer, MiniTron, ccirini, krispy1994Visualizer, Vis]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
