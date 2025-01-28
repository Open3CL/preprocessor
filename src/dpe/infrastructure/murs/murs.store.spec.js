import { MursStore } from './murs.store.js';
import { describe, expect, it, vi } from 'vitest';
import { DpeDataFixture } from '../../../../tests/fixtures/dpe/dpe.fixture.js';
import { PreProcessMursService } from '../../domain/murs/pre-process-murs.service.js';

describe('VentilationService validator tests', () => {
  const preProcessMursService = new PreProcessMursService();
  const store = new MursStore(preProcessMursService);

  it('should pre-process a DPE', async () => {
    const dpe = DpeDataFixture.aFullDpe();

    vi.spyOn(preProcessMursService, 'preprocess').mockReturnValue(null);

    store.preprocess(dpe);
    expect(preProcessMursService.preprocess).toBeCalledWith(dpe);
  });
});
