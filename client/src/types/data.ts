export interface IOriginItem {
  id: number
  allPhotos: IPhotoFormats[]
  attributes: {
    name: string
    description: string
    price: number
    height: number
    wight: number
    material: "gallery wrap linen canvas" | "gallery wrap canvas"
    medium: "oil" | "acrylic"
    subject: "nude" | "abstract" | "others"
    status: "in stock" | "booked" | "sold" | "sale"
    isRotatable: boolean
    category: string
    oldPrice: number

    mainPhoto: {
      data: {
        attributes: {
          url: string
          formats: IPhotoFormats
        }
      }
    }
    interiorPhoto: {
      data: {
        attributes: {
          url: string
          formats: IPhotoFormats
        }
      }
    }
    photos: {
      data: [
        {
          attributes: {
            url: string
            formats: IPhotoFormats
          }
        }
      ]
    }

    videos: {
      data: [
        {
          attributes: { url: string }
        }
      ]
    }
  }
}

// export interface IOriginInCart {
//   count: number
//   item: IOriginItem
// }

export interface ICarouselItem {
  id: number
  attributes: {
    sequenceNumber: number
    buttonLink: string
    buttonMainText: string
    buttonSmallText: string
    photo: {
      data: {
        attributes: {
          url: string
          formats: {
            thumbnail: { url: string }
            small: { url: string }
            medium: { url: string }
            large: { url: string }
            // origin: { url: string }
          }
        }
      }
    }
  }
}

export interface IPhotoFormats {
  thumbnail: {
    url: string
  }
  small: {
    url: string
  }
  medium: {
    url: string
  }
  large: {
    url: string
  }
  origin: {
    url: string
  }
}

export type ShippingAddress = {
  firstName: string
  lastName: string
  country: string
  street: string
  city: string
  state: string
  zipCode: string
}

export type HomeItemsId = {
  firstOfAbstract: number
  secondOfAbstract: number
  firstOfNude: number
  secondOfNude: number
  firstOfOthers: number
  secondOfOthers: number
}

export interface ICreateOrderResponse {
  id: string
  attributes: any
  // success: boolean
  // orderId: string
  // message?: string
}
export interface IUpdateOrderResponse {
  id: string
  attributes: any
}
export interface IPromo {
  promoCode: string
  discount: number
  isCorrect: boolean | null
}
export interface IDataForOrderCreate {
  userEmail: string
  orderProducts: string 
  promoCode: string
  discount: number
  totalPrice: number
  totalPriceWithDiscount: number
  products?: {
    set: number[]
  }
}
export interface IDataForOrderUpdate {
  orderId: string
  userEmail: string
  orderProducts: string ///IOrderProduct[]
  promoCode: string
  discount: number
  totalPrice: number
  totalPriceWithDiscount: number
  firstName?: string
  lastName?: string
  country?: string
  street?: string
  city?: string
  state?: string
  zipCode?: string
  paymentMethod?: string
  paymentConfirm?: boolean
  products?: {
    set: number[]
  }
}
// export interface IShippingAddressUpdate {
//   orderId: string
//   shippingAddress : ShippingAddress
// }

export interface IOrderProduct {
  original: {
    id: string
    name: string
    price: string
  }
}

export interface IPaymentProps {
  finalPrice: number
  orderId: string
}

// export interface IOriginsInCart {
//   id: string
//   // text: string
//   // user: string
//   // post: string
//   name: string
//   count: number
//   attributes: {
//     price: number
//     name: string
//     shortDescription: string
//     image: {
//       data: {
//         attributes: {
//           formats: {
//             medium: {
//               url: string
//             }
//           }
//         }
//       }
//     }
//   }
// }

// export interface ICart {
//   id: string
//   // text: string
//   // user: string
//   // post: string
//   name: string
//   count: number
//   attributes: {
//     price: number
//     name: string
//     shortDescription: string
//     image: {
//       data: {
//         attributes: {
//           formats: {
//             medium: {
//               url: string
//             }
//           }
//         }
//       }
//     }
//   }
// }
// attributes?.image?.data?.attributes?.formats?.medium?.url
// export interface IItem {
//   id: string
//   attributes: {
//     category: string
//     price: number
//     name: string
//     image: {
//       data: {
//         attributes: {
//           formats: {
//             medium: { url: string }
//           }
//         }
//       }
//     }
//   }
// }

// export type PostSort = "new" | "pop"
