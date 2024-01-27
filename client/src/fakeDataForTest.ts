import { IOriginItem, IPhotoFormats } from "./types/data"

const photoFormats1 : IPhotoFormats = {
  thumbnail: {
    url: 'string'
  },
  small: {
    url: 'string'
  },
  medium: {
    url: 'string'
  },
  large: {
    url: 'string'
  },
  origin: {
    url: 'string'
  }
}

const item1: IOriginItem = {
   id: 1,
  allPhotos: [photoFormats1],
  attributes: {
    name: 'string',
    description: 'string',
    price: 10,
    height: 20,
    wight: 30,
    material: "gallery wrap linen canvas" ,
    medium: "oil",
    subject: "nude",
    status: "in stock",
    isRotatable: true,
    category: 'string',
    oldPrice: 12,

    mainPhoto: {
      data: {
        attributes: {
          url: 'string',
          formats: photoFormats1
        }
      }
    },
    interiorPhoto: {
      data: {
        attributes: {
          url: 'string',
          formats: photoFormats1
        }
      }
    },
    photos: {
      data: [
        {
          attributes: {
            url: 'string',
            formats: photoFormats1
          }
        }
      ]
    },

    videos: {
      data: [
        {
          attributes: { url: 'string' }
        }
      ]
    }
  }
}

const item2: IOriginItem = {
   id: 1,
  allPhotos: [photoFormats1],
  attributes: {
    name: 'string',
    description: 'string',
    price: 20,
    height: 20,
    wight: 30,
    material: "gallery wrap linen canvas" ,
    medium: "oil",
    subject: "nude",
    status: "in stock",
    isRotatable: true,
    category: 'string',
    oldPrice: 12,

    mainPhoto: {
      data: {
        attributes: {
          url: 'string',
          formats: photoFormats1
        }
      }
    },
    interiorPhoto: {
      data: {
        attributes: {
          url: 'string',
          formats: photoFormats1
        }
      }
    },
    photos: {
      data: [
        {
          attributes: {
            url: 'string',
            formats: photoFormats1
          }
        }
      ]
    },

    videos: {
      data: [
        {
          attributes: { url: 'string' }
        }
      ]
    }
  }
}

const item3: IOriginItem = {
   id: 1,
  allPhotos: [photoFormats1],
  attributes: {
    name: 'string',
    description: 'string',
    price: 30,
    height: 20,
    wight: 30,
    material: "gallery wrap linen canvas" ,
    medium: "oil",
    subject: "nude",
    status: "in stock",
    isRotatable: true,
    category: 'string',
    oldPrice: 12,

    mainPhoto: {
      data: {
        attributes: {
          url: 'string',
          formats: photoFormats1
        }
      }
    },
    interiorPhoto: {
      data: {
        attributes: {
          url: 'string',
          formats: photoFormats1
        }
      }
    },
    photos: {
      data: [
        {
          attributes: {
            url: 'string',
            formats: photoFormats1
          }
        }
      ]
    },

    videos: {
      data: [
        {
          attributes: { url: 'string' }
        }
      ]
    }
  }
}
export const originsInCartTestData = [item1, item2, item3]