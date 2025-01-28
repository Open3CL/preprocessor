import { inject } from 'dioma';
import { MursStore } from './murs/murs.store.js';

export class DpeStore {
  /**
   * @type {DpeElementStore[]}
   */
  #dpeElementsStore;

  /**
   * @param mursStore {MursStore}
   */
  constructor(mursStore = inject(MursStore)) {
    this.#dpeElementsStore = [mursStore];
  }

  /**
   * Redressement de certaines données du DPE
   * @param dpe {Dpe}
   */
  /*eslint no-unused-vars: "off"*/
  preprocess(dpe) {
    return this.#dpeElementsStore.flatMap((store) => store.preprocess(dpe));
  }
}
