// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

import { Visualizer } from '../Visualizers';

export const krispy1994Visualizer = new Visualizer(
  'krispy1994',
  (p5: P5, analyzer: Tone.Analyser) => {
      <p>Test Visualizer</p>
  }
);
