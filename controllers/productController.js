const db = require("../models");
const productModel = db.Product;

module.exports.addProduct = async (req, res) => {
    const { name, description, price, quantity, categoryId } = req.body;

    if (!name || !description || !price || !quantity || !categoryId) {
        return res.status(400).json({ error: "all details are needed" });
    }

    try {
        const newProduct = await productModel.create({
            name,
            description,
            price,
            quantity,
            categoryId,
        });
        console.log("product added successfully");
        return res.json({
            success: "product added successfully",
            data: newProduct,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
};

module.exports.fetchProducts = async (req, res) => {
    //"Hey backend, give me only those products where stock is low, and I just want 3 of them."
    //That ?stock=low&limit=3 part is what we call a query string — it goes into req.query.
    const { limit, action, id} = req.query; // This extracts limit = "3" and stock = "low" from the query string.
    try {
        let options = {}

        let where = {}

        if(id){
            where = {id}
        }else if(action == "low-stock"){
            where = {quantity:{[db.Sequelize.Op.lte]:10}}; 
        }

        options = {
            where,
        }

        if(limit){
            options.limit = parseInt(limit)
        }
        //the final object will look like

        // options = {
        //   where: { quantity: { [Op.lt]: 5 } },
        //   limit: 3
        // }

        let products = await productModel.findAll(options);
        console.log("products fetched successfully");
        return res
            .status(200)
            .json({ success: "product/s fetched successfully", data: products });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
};

module.exports.updateProducts = async(req, res)=>{
    const {id} = req.params // ahiya thi khabar padse kone update karvanu chhe
    const {name, description, price, categoryId, quantity, action} = req.body // ahiya thi khabar padse su su upadte karvanu chhe te

    //aa code ma badha j inputs aave evi jarur nathi. 
    try {

        let product = await productModel.findByPk(id)
        if(!product) return res.status(400).json({error: "product not found"});

        // Handle stock increase/decrease
        if(action === "increase"){
            product.quantity ++
        }else if(action === "decrease"){
            if(product.quantity <= 0){
                return res.status(400).json({error: "cant decrease 0 quantity"})
            }else{
                product.quantity --
            }
        }else{
            // Full or partial product update
            if(name) product.name = name
            if(description) product.description = description
            if(price) product.price = price
            if(quantity !== undefined) product.quantity = Number(quantity)

            //if we want the user to enter all details mandatorily then we can put validation on the frontend
        }

        await product.save()
        return res.status(200).json({success: "product updated successfully"})
        //old logic 

        // let updatedProduct = await productModel.update({name, description, price, categoryId, quantity}, {where:{id}})

        // console.log(updatedProduct)
        // if(updatedProduct){
        //     return res.status(200).json({success: "product updated successfully", data: updatedProduct})
        // }else{
        //     return res.status(400).json({error: `product with ${id} does not exist`})
        // }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error.message})
    }
}

module.exports.deleteProducts = async(req, res)=>{
    let {id} = req.params

    try {
        let deletedProduct = await productModel.destroy({where:{id:id}})
        console.log(deletedProduct)

        if(deletedProduct){
            return res.status(200).json({success: "product deleted successfully", data: deletedProduct})
        }else{
            return res.status(400).json({error: `product with ${id} does not exist`})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error: error.message})
    }
}
