import { Item } from "../Item";

export interface ItemBuilder {
  withPrice(amount: number): ItemBuilder;
  build(): Item;
}

export function itemBuilder(): ItemBuilder {
  const item = {
    id: "abcdefg",
    name: "Jack",
    price: 0,
    description: "bob",
    created: new Date(),
  };

  const builder = {
    withPrice(amount: number) {
      item.price = amount;
      return builder;
    },
    build(): Item {
      return { ...item };
    },
  };

  return builder;
}
