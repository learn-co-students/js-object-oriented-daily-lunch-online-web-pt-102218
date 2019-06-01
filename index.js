// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// variables

let neighborhoodId = 0;

let customerId = 0;

let mealId = 0;

let deliveryId = 0;

// classes

class Neighborhood {
    constructor(name) {
        this.id = ++neighborhoodId
        this.name = name

        store.neighborhoods.push(this)
    };

    deliveries() {
        return store.deliveries.filter(
            delivery => delivery.neighborhoodId === this.id)
    };

    customers() {
        return store.customers.filter(customer => customer.neighborhoodId === this.id)
    };

    meals() {   
        function uniqueMeals(value, index, self) {
            return self.indexOf(value) === index
        }
        return this.deliveries().map(delivery => delivery.meal()).filter(uniqueMeals)
    }


};

class Customer {
    constructor(name, neighborhood) {
        this.id = ++customerId
        this.name = name
        this.neighborhoodId = neighborhood

        store.customers.push(this)
    };

    deliveries() {
        return store.deliveries.filter(delivery => delivery.customerId === this.id);
    }

    meals() {
        return this.deliveries().map(delivery => delivery.meal())
        // iterate over store's meals and return an array of meals where the meals.customers id is equal to this customers.id
    }

    totalSpent() {
        return this.meals().reduce((a,b) => {return a += b.price}, 0)
    }
}

class Meal {
    constructor(title, price) {
        this.id = ++mealId
        this.title = title
        this.price = price

        store.meals.push(this)
    };

    deliveries() {
        return store.deliveries.filter(delivery => delivery.mealId === this.id);
    }

    customers() {
        return this.deliveries().map(delivery => delivery.customer());
    }

    static byPrice() {
        return store.meals.sort(function(a,b){ return b.price-a.price})
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.id = ++deliveryId
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId

        store.deliveries.push(this)
    };

    meal() {
        return store.meals.find(meal => meal.id === this.mealId);
    };

    customer() {
      return store.customers.find(customer => customer.id === this.customerId);  
    };

    neighborhood() {
        return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
    }
}