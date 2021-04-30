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

    // xit("calls all subscription callbacks when publish occurs on channel", async () => {
    //   // Arrange
    //   const subscriber1 = await createSubscriber("test");
    //   const subscriber2 = await createSubscriber("test");
    //   const spy1 = spyOn(subscriber1, "callback");
    //   const spy2 = spyOn(subscriber2, "callback");
    //   // Act
    //   await PubSub.getInstance().publish("test", "some payload");
    //   // Assert
    //   setTimeout(function () {
    //     expect(spy1).toHaveBeenCalledWith("some payload");
    //     expect(spy2).toHaveBeenCalledWith("some payload");
    //   }, 1000);
    // });
  });
});
