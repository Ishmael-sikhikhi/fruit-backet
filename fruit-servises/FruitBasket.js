module.exports = (pool)=>{

    async function addFruit(theFruit){
        let fruit = theFruit.type;
        let price = theFruit.price;

        let checkFruit = await pool.query(`select type from fruitbacket where type = $1`,[fruit]);
        console.log(checkFruit.rowCount !== 0);
        if(checkFruit.rowCount === 0){
            await pool.query(`insert into fruitbacket (type,qty,price) values ($1,$2,$3)`,[fruit,1,price])
        }
    }

    async function updateQty(backet){
        const fruitType = backet.type;
        console.log('Type: '+fruitType);
        let checkFruit = (`select * from fruitbacket where type = $1`,[fruitType]);
        if(checkFruit.rowCount !== 0){
            await pool.query(`update fruitbacket set qty = qty + 1 where type = $1`,[fruitType]);
            return "updated"
        }
    }

    async function findFruit(find){
        let fruit = find.type;
        let fruits = await pool.query(`select * from fruitbacket where type = $1`, [fruit]);
        fruits = fruits.rows;
        return fruits;
    }

    async function totalPrice(theFruit){
        let fruit = theFruit.type;
        let priceByQty = await pool.query(`select qty, price from fruitbacket where type = $1`, [fruit]);
        priceByQty = priceByQty.rows;
        let totalPrice = priceByQty[0].qty * priceByQty[0].price;
        return totalPrice;
    }

    async function totalFruits(theFruit){
        let fruit = theFruit.type;
        let allFruit = await pool.query(`select qty from fruitbacket where type = $1`, [fruit]);
       let total = allFruit.rows[0].qty;
       console.log(total);
        return total;
    }

    return {
        addFruit,
        updateQty,
        totalFruits,
        findFruit,
        totalPrice
    }
}