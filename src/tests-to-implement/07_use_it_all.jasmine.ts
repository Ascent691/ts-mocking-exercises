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
      const firstProcessCall = sut.processItems();
      spy();
      await sut.processItems();
      // Assert
      await firstProcessCall;
      expect(itemRepository.getAll).toHaveBeenCalledTimes(1);
    });

    describe("given single unprocessed item", () => {
      it("updates the cache with the item", async () => {
        // Arrange
        const item = itemBuilder().build();
        const inMemoryCache = new InMemoryCache();
        spyOn(inMemoryCache, "update");
        const itemRepository = createItemRepository(item);
        const sut = createSut(inMemoryCache, itemRepository);
        // Act
        await sut.processItems();
        // Assert
        expect(inMemoryCache.update).toHaveBeenCalledWith(item);
      });

      it("publishes an item updated message", async () => {
        // Arrange
        const spy = jasmine.createSpy();

        const myPromise = new Promise<Item>((success, reject) => {
          spy.and.callFake((receivedItem) => {
            success(receivedItem);
          });
        });

        PubSub.getInstance().subscribe(PubSubChannels.itemUpdated, spy);
        const item = itemBuilder().build();
        const itemRepository = createItemRepository(item);
        const sut = createSut(new InMemoryCache(), itemRepository);
        // Act
        await sut.processItems();
        const actualItem = await myPromise;
        // Assert
        expect(actualItem).toEqual(item);
      });

      xit("does not process items that have already been processed", async () => {
        // Arrange
        // Act
        // Assert
      });
    });

    describe("given newly added unprocessed items", () => {
      xit("processes all newly added items every x seconds", async () => {
        // Arrange
        // Act
        // Assert
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

  function createItemRepository(...params: Item[]): ItemRepository {
    const result = new ItemRepository();
    if (!!params) {
      spyOn(result, "getAll").and.returnValue(params);
    }
    return result;
  }

  function createSut(
    cache: InMemoryCache,
    itemRepository: ItemRepository
  ): ItemProcessor {
    return new ItemProcessor(cache, itemRepository);
  }
});
