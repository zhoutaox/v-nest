import CryptoJS from 'crypto-js';

export function md5(text: string): string {
  const hash = CryptoJS.MD5(text);
  return hash.toString(CryptoJS.enc.Hex);
}
