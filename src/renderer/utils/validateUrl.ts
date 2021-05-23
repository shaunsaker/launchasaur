export const validateUrl = (url: string): boolean =>
  /^(ftp|http|https):\/\/[^ "]+$/.test(url);
