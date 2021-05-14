import { describe, expect, it } from '@jest/globals'
import { itemBuilder } from '../dependencies/builders/item_builder'
import { PricingService } from '../dependencies/PricingService'
import { ItemPriceAdjuster } from '../tests-to-implement/03_class_dependency_injected_into_sut'

describe('ItemPriceAdjuster', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
       // Arrange
       const item = itemBuilder().withPrice(50).build();
       const pricingService = new PricingService();
       jest.spyOn(pricingService, "getMarkUpPercentage").mockResolvedValue(200);
       const sut = createSut(pricingService);
       // Act
       const updatedItem = await sut.adjustPrice(item);
       // Assert
       expect(updatedItem.price).toBe(150);
    })
  })

  describe('price is greater than 100', () => {
    it('marks item price down by the markdown percentage', async () => {
     // Arrange
     const item = itemBuilder().withPrice(150).build();
     const pricingService = new PricingService();
     jest.spyOn(pricingService, "getMarkDownPercentage").mockResolvedValue(50);
     const sut = createSut(pricingService);
     // Act
     const updatedItem = await sut.adjustPrice(item);
     // Assert
     expect(updatedItem.price).toBe(75);
    })
  })

  describe('price is equal to 100', () => {
    it('will not alter the price', async () => {
       // Arrange
       const item = itemBuilder().withPrice(100).build();
       const sut = createSut(new PricingService());
       // Act
       const updatedItem = await sut.adjustPrice(item);
       // Assert
       expect(updatedItem.price).toBe(item.price);
    })
  })

  function createSut(pricingService: PricingService): ItemPriceAdjuster {
    return new ItemPriceAdjuster(pricingService);
  }
})
