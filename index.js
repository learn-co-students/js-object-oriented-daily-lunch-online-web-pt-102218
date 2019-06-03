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
  meals() {
    const allMeals = this.customers().map(customer => customer.meals());
    const merged = [].concat.apply([], allMeals);
    return [...new Set(merged)];
  }
}

class Meal {
  constructor(title, price) {
    this.title = title; 
    this.price = price; 
    this.id = ++ mealId;

    store.meals.push(this); 
  }
  deliveries() {
    return store.deliveries.filter(delivery=> delivery.mealId === this.id);
  }
  customers() {
    const ourDelieveries = this.deliveries().filter(delivery=> delivery.customer())
    return ourDelieveries.map(delivery=> delivery.customer()); 
    }; 
  static byPrice() {
    return store.meals.sort( (a, b) => a.price - b.price).reverse();
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
  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }
  meals() {
    return this.deliveries().map(delivery => delivery.meal()); 
  }
  totalSpent() {
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
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