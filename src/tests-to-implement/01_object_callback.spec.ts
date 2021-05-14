import { describe, expect, it } from '@jest/globals'
import { execute, Payload } from '../tests-to-implement/01_object_callback'

describe('object mock callback', () => {
  describe('execute', () => {
    it('calls the callback', () => {
      // Arrange
      const payload = createPayload((thing) => { });
      jest.spyOn(payload, "callback");
      // Act
      execute(payload);
      // Assert
      expect(payload.callback).toHaveBeenCalled();
    })

    it('calls the callback once', () => {
       // Arrange
       const payload = createPayload((thing) => {});
       jest.spyOn(payload, "callback");
       // Act
       execute(payload);
       // Assert
       expect(payload.callback).toHaveBeenCalledTimes(1);
    })

    it('calls the callback with correct value', () => {
      // Arrange
      const payload = createPayload((thing) => {});
      jest.spyOn(payload, "callback");
      // Act
      execute(payload);
      // Assert
      expect(payload.callback).toHaveBeenCalledWith("50 for abcdcd");
    })
  })

  function createPayload(callback: (result: string) => void): Payload {
    return { id: "abcdcd", amount: 5, callback: callback };
  }
})
