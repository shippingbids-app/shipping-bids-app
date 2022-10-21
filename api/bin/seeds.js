require("../config/db.config")

const { Offer } = require("../models")
const { faker } = require("@faker-js/faker")

Offer.deleteMany({})
  .then(() => {
    console.log("offers erased")
    // for (let i = 0; i < 40; i++) {
    //   Offer.create({
    //     title: faker.word.adjective(),
    //     logisticsCapacity: faker.helpers.arrayElements(['small', 'medium', 'large', 'xl']),
    //     services: faker.helpers.arrayElements([
    //       'restaurant',
    //       'fresh-food',
    //       'store-parts',
    //       'household-appliance',
    //       'shop',
    //       'fragile-merchandise',
    //       'others'
    //     ]),
    //     author: faker.internet.userName(),
    //     originAddress: faker.address.cityName(),
    //     destinationAddress: faker.address.cityName(),
    //     expirationDate: faker.date.soon(),
    //     offerState: faker.helpers.arrayElements(['open', 'closed']),
    //     initialPrice: Math.floor(Math.random() * 1000)
    //   }).then((offer) => {
    //     console.log(`offer ${offer.title} created.`)
    //   })
    // }
  })
  .catch((err) => console.error(err))