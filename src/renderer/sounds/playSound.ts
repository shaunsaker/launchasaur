import { Howl, HowlOptions } from "howler";

export const playSound = (filepath: string, options?: HowlOptions): void => {
  const sound = new Howl({
    src: [filepath],
    volume: 0.5,
    ...options,
  });

  sound.play();
};
