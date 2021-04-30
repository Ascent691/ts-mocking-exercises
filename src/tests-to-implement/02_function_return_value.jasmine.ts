import { getAllItemsOnSale } from "../tests-to-implement/02_function_return_value";
import * as getAllItems from "../dependencies/get_all";
import { itemBuilder } from "../dependencies/builders/item_builder";

describe("function mock return value", () => {
  describe("getAllItemsOnSale", () => {
    it("returns only prices under 10", async () => {
      // Arrange
      const itemsUnder10 = [
        itemBuilder().withPrice(0).build(),
        itemBuilder().withPrice(9).build(),
        itemBuilder().withPrice(9.99).build(),
      ];
      const itemsGreaterThanOrEqualTo10 = [
        itemBuilder().withPrice(10).build(),
        itemBuilder().withPrice(15).build(),
        itemBuilder().withPrice(30).build(),
      ];

      const allItems = [...itemsUnder10, ...itemsGreaterThanOrEqualTo10];
      spyOn(getAllItems, "getAll").and.returnValues(allItems);
      // Act
      const actualItemsOnSale = await getAllItemsOnSale();
      // Assert
      expect(actualItemsOnSale).toEqual(itemsUnder10);
    });
  });
});
