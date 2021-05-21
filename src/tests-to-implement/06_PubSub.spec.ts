import { describe, expect, it } from '@jest/globals'
import { PubSub } from '../tests-to-implement/06_PubSub'

describe('PubSub', () => {
  describe('subscribe', () => {
    beforeEach(() => {
      jest.useFakeTimers("modern");
    });
  
    afterEach(() => {
      jest.useRealTimers();
    });

    it('calls subscription callback when publish occurs on channel', async () => {
      // Arrange
      const callback = jest.fn();
    
      await PubSub.getInstance().subscribe("test", callback);
      // Act
      await PubSub.getInstance().publish("test", "some payload");
      jest.runOnlyPendingTimers();
      // Assert
      expect(callback).toHaveBeenCalledTimes(1);
    })

    it('calls all subscription callbacks when publish occurs on channel', async () => {
        // Arrange
        const callback = jest.fn();
    
        await PubSub.getInstance().subscribe("test", callback);
        await PubSub.getInstance().subscribe("test", callback);
        // Act
        await PubSub.getInstance().publish("test", "some payload");
        jest.runOnlyPendingTimers();
        // Assert
        expect(callback).toHaveBeenCalledTimes(2);
    })
  })
})
