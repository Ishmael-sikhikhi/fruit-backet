module.exports = (pool)=>{

    async function addFruit(theFruit){
        let fruit = theFruit.type;
        let price = theFruit.price;

        let checkFruit = await pool.query(`select type from fruitbacket where type = $1`,[fruit]);
        if(checkFruit.rowCount === 0){
            await pool.query(`insert into fruitbacket (type,qty,price) values ($1,$2,$3)`,[fruit,1,price])
        }
        return "insert complete"
    }

    async function updateQty(backet){
        const fruitType = backet.type;
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
        let priceByQty = await pool.query(`select qty*price as tprice from fruitbacket where type = $1`, [fruit]);
        priceByQty = priceByQty.rows;
        let totalPrice = priceByQty[0].tprice;
        return totalPrice;
    }

    async function totalFruits(theFruit){
        let fruit = theFruit.type;
        let allFruit = await pool.query(`select sum(qty) from fruitbacket where type = $1`, [fruit]);
       let total = allFruit.rows[0].sum;
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