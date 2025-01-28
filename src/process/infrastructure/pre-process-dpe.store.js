import { inject } from 'dioma';
import { DpeStore } from '../../dpe/infrastructure/dpe.store.js';

export class PreProcessDpeStore {
  /**
   * @type {DpeStore}
   */
  #dpeStore;

  /**
   * @param dpeStore {DpeStore}
   */
  constructor(dpeStore = inject(DpeStore)) {
    this.#dpeStore = dpeStore;
  }

  /**
   * @param dpe {Dpe}
   * @return {ValidationError[]}
   */
  preprocess(dpe) {
    return this.#dpeStore.preprocess(dpe);
  }
}
