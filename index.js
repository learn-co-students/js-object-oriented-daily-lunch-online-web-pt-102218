// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = Neighborhood.incrementId();
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter(x => x.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(x => x.neighborhoodId === this.id)
  }

  meals() {
    let mealIds = this.deliveries().map(x => x.mealId);
    return store.meals.filter(x => mealIds.includes(x.id));
  }

  static incrementId() {
    if (!this.currentId) this.currentId = 1
    else this.currentId++
    return this.currentId
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = Meal.incrementId();
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter(x => x.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(d => store.customers.find(c => c.id === d.customerId))
  }

  static byPrice() {
    return store.meals.sort(function(a, b){return b.price - a.price;}); 
  }

  static incrementId() {
    if (!this.currentId) this.currentId = 1;
    else this.currentId++;
    return this.currentId;
  }
}

class Customer {
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = Customer.incrementId();
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter(x => x.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(deliv => store.meals.find(meal => meal.id === deliv.mealId))
  }

  totalSpent() {
    return this.meals().reduce(((p, c) => p + c.price), 0)
  }

  static incrementId() {
    this.currentId = (this.currentId ? this.currentId++ : 1);
    return this.currentId;
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = Delivery.incrementId();
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find(x => x.id === this.mealId);
  }

  customer() {
    return store.customers.filter(x => x.id === this.customerId)[0]
  }

  neighborhood() {
    return store.neighborhoods.filter(x => x.id === this.neighborhoodId)[0];
  }


  static incrementId() {
    if (!this.currentId) this.currentId = 1
    else this.currentId++
    return this.currentId
  }
}