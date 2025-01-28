import { ValidationErrorCode, ValidationErrorLevel } from '../../../src/core/domain/error.model.js';

export class EnveloppeErrorFixture {
  /**
   * @return {ValidationError}
   */
  static anEnveloppeError() {
    return {
      code: ValidationErrorCode.UNSUPPORTED_VERSION,
      level: ValidationErrorLevel.ERROR,
      metadata: {
        originalValue: '3',
        expectedValue: '1'
      }
    };
  }
}
