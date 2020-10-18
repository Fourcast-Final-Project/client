import { SET_INO } from './types';

export const setIno = (ino) => {
  return {
    type: SET_INO,
    payload: ino
  }
}