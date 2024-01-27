import { originsInCartTestData } from "../fakeDataForTest"
import { findTotalPrice } from "./price"


test('find Total Price', () => {
  expect(findTotalPrice(originsInCartTestData)).toEqual(60)
})