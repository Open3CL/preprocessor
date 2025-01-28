import { describe, expect, it, vi } from 'vitest';
import { DpeStore } from '../../dpe/infrastructure/dpe.store.js';
import { PreProcessDpeStore } from './pre-process-dpe.store.js';
import { DpeDataFixture } from '../../../tests/fixtures/dpe/dpe.fixture.js';

describe('ProcessDpeStore tests', () => {
  it('should pre-process a DPE', async () => {
    const dpeStore = new DpeStore();

    const service = new PreProcessDpeStore(dpeStore);

    vi.spyOn(dpeStore, 'preprocess').mockReturnValue(null);

    const errors = service.preprocess(DpeDataFixture.aFullDpe());
    expect(errors).toBeNull();
  });
});
