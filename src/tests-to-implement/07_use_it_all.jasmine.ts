import { spy } from "sinon";
import { itemBuilder } from "../dependencies/builders/item_builder";
import { InMemoryCache } from "../dependencies/InMemoryCache";
import { Item } from "../dependencies/Item";
import { ItemRepository } from "../dependencies/ItemRepository";
import { ItemProcessor } from "../tests-to-implement/07_use_it_all";
import { PubSub, PubSubChannels } from "./06_PubSub";

describe("ItemProcessor", () => {
  describe("processItems", () => {
    it("will not process items if processing is already busy", async () => {
      // Arrange
      const spy = jasmine.createSpy();

      const myPromise = new Promise<Item[]>((success, reject) => {
        spy.and.callFake(() => {
          success([itemBuilder().build(), itemBuilder().build()]);
        });
      });

      const itemRepository = new ItemRepository();

      spyOn(itemRepository, "getAll").and.callFake(async () => {
        return myPromise;
      });

      const sut = createSut(new InMemoryCache(), itemRepository);
      // Act
      sut.processItems();
      spy();
      await sut.processItems();
      // Assert
      expect(itemRepository.getAll).toHaveBeenCalledTimes(1);
    });

    describe("given single unprocessed item", () => {
      it("updates the cache with the item", async () => {
        // Arrange
        const item = itemBuilder().build();
        const inMemoryCache = new InMemoryCache();
        spyOn(inMemoryCache, "update");
        const itemRepository = createItemRepositoryReturningValue(item);
        const sut = createSut(inMemoryCache, itemRepository);
        // Act
        await sut.processItems();
        // Assert
        expect(inMemoryCache.update).toHaveBeenCalledWith(item);
      });

      it("publishes an item updated message", async () => {
        // Arrange
        const publishSpy = spyOnPubSubPublish();
        const item = itemBuilder().build();
        const itemRepository = createItemRepositoryReturningValue(item);
        const sut = createSut(new InMemoryCache(), itemRepository);
        // Act
        await sut.processItems();
        // Assert
        expect(publishSpy).toHaveBeenCalledWith(
          PubSubChannels.itemUpdated,
          item
        );
      });

      it("does not process items that have already been processed", async () => {
        // Arrange
        const item = itemBuilder().build();
        const itemRepository = createItemRepositoryReturningValue(item);
        const sut = createSut(new InMemoryCache(), itemRepository);
        const publishSpy = spyOnPubSubPublish();
        // Act
        await sut.processItems();
        await sut.processItems();
        // Assert
        expect(publishSpy).toHaveBeenCalledOnceWith(
          PubSubChannels.itemUpdated,
          item
        );
      });
    });

    describe("given newly added unprocessed items", () => {
      beforeEach(() => {
        jasmine.clock().install();
        const currentDate = new Date(2021, 3, 30, 14, 29, 0, 0);
        jasmine.clock().mockDate(currentDate);
      });

      afterEach(() => {
        jasmine.clock().uninstall();
      });

      it("processes all newly added items every 5 seconds", async () => {
        // Arrange
        const publishSpy = spyOnPubSubPublish();
        const alreadyProcessedItems = createRandomItems();
        const notYetProcessedItems = createRandomItems();
        const itemsToBeProcessed =
          alreadyProcessedItems.concat(notYetProcessedItems);
        const itemRepository = createItemRepositoryReturningValues(
          alreadyProcessedItems,
          itemsToBeProcessed
        );
        const sut = createSut(new InMemoryCache(), itemRepository);
        // Act
        await sut.processItems();
        jasmine.clock().tick(5001);
        await new Promise<void>((success, reject) => {
          success();
        }).then(() => { });
        // Assert
        expect(publishSpy).toHaveBeenCalledWith(PubSubChannels.itemUpdated, notYetProcessedItems[0]);
      });
    });

    describe("given multiple unprocessed items", () => {
      xit("updates the cache with the item", async () => {
        // Arrange
        // Act
        // Assert
      });

      xit("publishes an item updated message", async () => {
        // Arrange
        // Act
        // Assert
      });

      xit("does not process items that have already been processed", async () => {
        // Arrange
        // Act
        // Assert
      });
    });
  });

  function spyOnPubSubPublish() {
    const instance = PubSub.getInstance();
    spyOn(instance, "publish");
    return instance.publish;
  }

  function createItemRepositoryReturningValue(
    ...params: Item[]
  ): ItemRepository {
    const result = new ItemRepository();
    if (!!params) {
      spyOn(result, "getAll").and.returnValue(params);
    }
    return result;
  }

  function createItemRepositoryReturningValues(
    ...params: Item[][]
  ): ItemRepository {
    const result = new ItemRepository();
    if (!!params) {
      spyOn(result, "getAll").and.returnValues(...params);
    }
    return result;
  }

  function createRandomItems() {
    return [5,5,5,5,5].map((thing) => itemBuilder().build());
  }

  function createSut(
    cache: InMemoryCache,
    itemRepository: ItemRepository
  ): ItemProcessor {
    return new ItemProcessor(cache, itemRepository);
  }
});
