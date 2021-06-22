const delayTimeout = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// EffectsConfiguration can be overriden and this enables use of modified effects on different platforms
export const EffectsConfiguration = { delay: delayTimeout };

export const safeDelay = (time = 0) => EffectsConfiguration.delay(time);
