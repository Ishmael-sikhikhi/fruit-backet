const assert = require('assert');
const pg = require('pg');
const FruitBasket = require('../fruit-servises/FruitBasket');

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruit_backet';

const pool = new pg.Pool({
  connectionString,
});

const backetInst = FruitBasket(pool);

// eslint-disable-next-line no-undef
beforeEach(async () => {
  // clean the tables before each test run
});

describe('Fruit backet App logic tests', () => {
  it('', async ()=>{
    await backetInst.addFruit({type:"Watermelon", price: 30.00});
  });
  it('Should find all fruits backet for the given fruit', async () => {
    assert.deepEqual([{ "id": 10, "price": "10.50", "qty": 1, "type": "Mango" }], await backetInst.findFruit({ type: "Mango" }));
  });
  it('Should update to the backet', async () => {
    assert.equal('updated', await backetInst.updateQty({ type: "Orange" }));
  });
  it('show the total price for a given fruit basket', async () => {
    assert.equal(4.50, await backetInst.totalPrice({ type: "Banana" }));
  })
  it('show the sum of the total of the fruit baskets for a given fruit type.', async () => {
    assert.equal(1, await backetInst.totalFruits({type:"Banana"}))
  });
})