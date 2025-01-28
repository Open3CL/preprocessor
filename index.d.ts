import { Dpe } from './src/dpe/domain/models/dpe.model';

declare namespace DpePreProcessor {
  class DpePreProcessor {
    preprocess(dpe: Dpe): void;
  }
}

export = DpePreProcessor;
