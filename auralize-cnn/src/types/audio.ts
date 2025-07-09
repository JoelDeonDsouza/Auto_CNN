export interface Prediction {
  class: string;
  confidence: number;
}

export interface LayerData {
  shape: number[];
  values: number[][];
}

export type VisualizeData = Record<string, LayerData>;

export interface WaveformData {
  values: number[];
  sample_rate: number;
  duration: number;
}

export interface ApiResponse {
  predictions: Prediction[];
  visualization: VisualizeData;
  input_spectrogram: LayerData;
  waveform: WaveformData;
}

export interface SplitLayersResult {
  main: [string, LayerData][];
  internals: Record<string, [string, LayerData][]>;
}
