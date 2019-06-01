// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let mealId = 0;
let neighborhoodId = 0;
let deliveryId = 0; 
let customerId = 0;

class Neighborhood {
   constructor(name) {
  this.name = name;
  this.id = ++ neighborhoodId;

  store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter( delievery => {
      return delievery.neighborhoodId === this.id;
    });
  }
  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }
}

class Meal {
  constructor(title, price) {
    this.title = title; 
    this.price = price; 
    this.id = ++ mealId;

    store.meals.push(this); 
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++ customerId;
    this.name = name;
    this.neighborhoodId = neighborhoodId;

    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(delivery => 
     delivery.customerId === this.id )
  }
  meals() {
    return this.deliveries().filter(delivery => {
      return delivery.mealId === delivery.id 
    });
  }
} 
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++ deliveryId; 
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId; 

    store.deliveries.push(this);
  }
  customer() {
    return store.deliveries.find (delivery => {
      return delivery.customerId = this.customerId;
    });
  }
  meal() {
    return store.meals.find(meal => {
      return meal.id === this.mealId;
    });
  }
  customer() {
    return store.customers.find(customer => {
     return customer.id === this.customerId;
    })
  }
  neighborhood() {
    return store.neighborhoods.find(neighborhood => {
     return neighborhood.id === this.neighborhoodId;
    })
  }
} 