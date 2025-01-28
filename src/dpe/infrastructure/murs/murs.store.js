import { DpeElementStore } from '../dpe-element.store.js';
import { PreProcessMursService } from '../../domain/murs/pre-process-murs.service.js';
import { inject } from 'dioma';

export class MursStore extends DpeElementStore {
  /**
   * @type {PreProcessMursService}
   */
  #preProcessMursService;

  /**
   * @param preProcessMursService {PreProcessMursService}
   */
  constructor(preProcessMursService = inject(PreProcessMursService)) {
    super();
    this.#preProcessMursService = preProcessMursService;
  }

  /**
   * @param dpe {Dpe}
   */
  /*eslint no-unused-vars: "off"*/
  preprocess(dpe) {
    this.#preProcessMursService.preprocess(dpe);
  }
}
