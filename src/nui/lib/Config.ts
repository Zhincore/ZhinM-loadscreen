export interface ImageConfig {
  duration: number;
  durationRandom: number;
  sources: string[];
}

export interface Config {
  background: ImageConfig;
  image: ImageConfig;
  audio: {
    volume: number;
    source: string;
  };
}
