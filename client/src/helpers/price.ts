import { IOriginItem } from "../types/data"



export const findTotalPrice = (originsInCart: IOriginItem[]): number  => originsInCart.reduce(
    (total: number, item: IOriginItem) => {
      return total + item.attributes.price
    },
    0
  )
  export const findTotalPriceWithDiscount = (totalPrice: number, discount?: number): number  =>
  discount ? (totalPrice * (100 - discount)) / 100 : totalPrice