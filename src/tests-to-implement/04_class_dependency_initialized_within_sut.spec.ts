import { describe, expect, it } from '@jest/globals'
import { itemBuilder } from '../dependencies/builders/item_builder'
import { PricingService } from '../dependencies/PricingService'
import { ItemPriceAdjusterVersion2 } from '../tests-to-implement/04_class_dependency_initialized_within_sut'

describe('ItemPriceAdjusterVersion2', () => {
  describe('price is less than 100', () => {
    it('marks item price up by the markup percentage', async () => {
      // Arrange
      const item = itemBuilder().withPrice(50).build();
      const pricingService = new PricingService();
      spyOn(pricingService, "getMarkUpPercentage").and.returnValue(200);
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

  function createSut(
    pricingService: PricingService
  ): ItemPriceAdjusterVersion2 {
    
    jest.spyOn(PricingService.prototype, "getMarkUpPercentage").mockReturnValue(
      pricingService.getMarkUpPercentage()
    );
    jest.spyOn(PricingService.prototype, "getMarkDownPercentage").mockReturnValue(
      pricingService.getMarkDownPercentage()
    );

    return new ItemPriceAdjusterVersion2();
  }
})
