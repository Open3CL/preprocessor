import { describe, expect, it, vi } from 'vitest';
import { DpeStore } from './dpe.store.js';
import { DpeDataFixture } from '../../../tests/fixtures/dpe/dpe.fixture.js';
import { MursStore } from './murs/murs.store.js';

describe('DpeStore tests', () => {
  it('should pre process a DPE', async () => {
    const mursStore = new MursStore();

    const store = new DpeStore(mursStore);
    const dpe = DpeDataFixture.aFullDpe();

    vi.spyOn(mursStore, 'preprocess').mockReturnValue(null);

    store.preprocess(dpe);
    expect(mursStore.preprocess).toHaveBeenCalledWith(dpe);
  });
});
