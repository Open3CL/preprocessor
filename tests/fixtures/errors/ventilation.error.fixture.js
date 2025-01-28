import { ValidationErrorCode, ValidationErrorLevel } from '../../../src/core/domain/error.model.js';

export class VentilationErrorFixture {
  /**
   * @return {ValidationError}
   */
  static aVentilationError() {
    return {
      code: ValidationErrorCode.WRONG_PFE_ONCE,
      level: ValidationErrorLevel.FATAL,
      metadata: {
        originalValue: 0,
        expectedValue: 1,
        property: 'plusieurs_facades_exposees'
      }
    };
  }
}
