import { PubSub } from "../tests-to-implement/06_PubSub";

describe("PubSub", () => {
  describe("subscribe", () => {
    it("calls subscription callback when publish occurs on channel", async () => {
      // Arrange
      const spy = jasmine.createSpy();

      const myPromise = new Promise((success, reject) => {
        spy.and.callFake(() => {
          success("");
        });
      });

      await PubSub.getInstance().subscribe("test", spy);
      // Act
      await PubSub.getInstance().publish("test", "some payload");
      // Assert
      await myPromise;
      expect(spy).toHaveBeenCalled();
    });

    it("calls all subscription callbacks when publish occurs on channel", async () => {
      // Arrange
      const spy = jasmine.createSpy();
      const numSubs = 3;
      let finishedTimeout = 0;

      const myPromise = new Promise((success, reject) => {
        spy.and.callFake(() => {
          finishedTimeout += 1;
          if (finishedTimeout >= numSubs) {
            success("");
          }
        });
      });

      for (let i = 0; i < numSubs; i++) {
        await PubSub.getInstance().subscribe("test", spy);
      }
      // Act
      await PubSub.getInstance().publish("test", "some payload");
      // Assert
      await myPromise;
      expect(spy).toHaveBeenCalledTimes(numSubs);
    });
  });
});
