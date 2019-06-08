// global datastore
let store = {
  neighborhoods: [],
  meals: [],
  customers: [],
  deliveries: []
};
let i = {
  neighborhoods: 0,
  meals: 0,
  customers: 0,
  deliveries: 0
}

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = i.neighborhoods += 1
    store.neighborhoods.push(this)
  }
  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.neighborhoodId === this.id
    })
  }
  customers() {
    return store.customers.filter((customer) => {
      return customer.neighborhoodId === this.id
    })
  }
  meals(){
      return store.deliveries.filter((delivery)=>{
          return delivery.neighborhood()==this
      }).map((delivery)=>{
        return delivery.meal()     
      }).filter((value, index, self) => {
        return self.indexOf(value) === index;
    })
  }
}
class Meal {
  constructor(name, price) {
    this.title = name
    this.price = price
    this.id = i.meals += 1
    store.meals.push(this)
  }
  static byPrice(){
      return store.meals.sort((a,b)=>b.price-a.price)
  }
  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.mealId === this.id
    })
  }
  customers(){
    return store.deliveries.filter((deliveries)=>{
        return deliveries.mealId===this.id
    }).map((delivery)=>delivery.customer())
}
}


class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = i.customers += 1
    store.customers.push(this)
  }
  totalSpent(){
      return this.meals().reduce((a,c)=>{return a+c.price},0)
  }
  deliveries() {
    return store.deliveries.filter((delivery) => {
      return delivery.customerId === this.id
    })
  }
  meals(){
      return store.deliveries.filter((deliveries)=>{
          return deliveries.customerId===this.id
      }).map((delivery)=>delivery.meal())
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId

    this.id = i.deliveries += 1
    store.deliveries.push(this)
  }
  meal() {
    return store.meals.find((meal) => {
      return this.mealId === meal.id
    })
  }
  customer() {
    return store.customers.find((customer) => {
      return this.customerId === customer.id
    })
  }
  neighborhood() {
    return store.neighborhoods.find((neighborhood) => {
      return this.neighborhoodId === neighborhood.id
    })
  }
}
