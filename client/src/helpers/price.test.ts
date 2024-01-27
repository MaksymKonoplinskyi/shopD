import { originsInCartTestData } from "../fakeDataForTest"
import { findTotalPrice, findTotalPriceWithDiscount } from "./price"
const [item1, item2, item3] = originsInCartTestData

test('find Total Price', () => {
  expect(findTotalPrice(originsInCartTestData)).toEqual(60)
  expect(findTotalPrice([item1, item2])).toEqual(30)
  expect(findTotalPrice([item1, item3])).toEqual(40)
  expect(findTotalPrice([item1])).toEqual(10)
  expect(findTotalPrice([])).toEqual(0)
})
test('find Total Price with discount', () => {
  expect(findTotalPriceWithDiscount(100)).toEqual(100)
  expect(findTotalPriceWithDiscount(200, 0)).toEqual(200)
  expect(findTotalPriceWithDiscount(150, 10)).toEqual(135)
  expect(findTotalPriceWithDiscount(0,50)).toEqual(0)
  expect(findTotalPriceWithDiscount(1,10)).toEqual(0.9)
})