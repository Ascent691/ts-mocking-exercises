import { describe, expect, it } from '@jest/globals'
import { itemBuilder } from '../dependencies/builders/item_builder'
import { InMemoryCache } from '../dependencies/InMemoryCache'
import { Item } from '../dependencies/Item'
import { ItemRepository } from '../dependencies/ItemRepository'
import { ItemProcessor } from "../tests-to-implement/07_use_it_all"

describe('ItemProcessor', () => {
  describe('processItems', () => {
    it('will not process items if processing is already busy', async () => {
      // Arrange
      const itemRepository = new ItemRepository();
      const barrier = jest.fn();

      const myPromise = new Promise<Item[]>((success, reject) => {
        barrier.mockImplementation(() => {
          success([itemBuilder().build(), itemBuilder().build()]);
        });
      });

     jest.spyOn(itemRepository, "getAll").mockImplementation().mockResolvedValue(myPromise);

      const sut = createSut(new InMemoryCache(), itemRepository);
      // Act
      sut.processItems();
      barrier();
      await sut.processItems();
      // Assert
      expect(itemRepository.getAll).toHaveBeenCalledTimes(1);
    })
    describe('given single unprocessed item', () => {
      it.skip('updates the cache with the item', async () => {
        // Arrange
        // Act
        // Assert
      })

      it.skip('publishes an item updated message', async () => {
        // Arrange
        // Act
        // Assert
      })

      it.skip('does not process items that have already been processed', async () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('given newly added unprocessed items', () => {
      it.skip('processes all newly added items every x seconds', async () => {
        // Arrange
        // Act
        // Assert
      })
    })

    describe('given multiple unprocessed items', () => {
      it.skip('updates the cache with the item', async () => {
        // Arrange
        // Act
        // Assert
      })

      it.skip('publishes an item updated message', async () => {
        // Arrange
        // Act
        // Assert
      })

      it.skip('does not process items that have already been processed', async () => {
        // Arrange
        // Act
        // Assert
      })
    })
    function createSut(
      cache: InMemoryCache,
      itemRepository: ItemRepository
    ): ItemProcessor {
      return new ItemProcessor(cache, itemRepository);
    }
  })
})
