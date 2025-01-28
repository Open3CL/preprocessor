import { describe, expect, it } from 'vitest';
import { DpeElementStore } from './dpe-element.store.js';

describe('DpeElementStore unit tests', () => {
  it('should not be able to pre-process a dpe', async () => {
    try {
      const store = new DpeElementStore();
      store.preprocess(null);
    } catch (error) {
      expect(error.message).toBe('Unsupported operation');
    }
  });
});
