const db = require("../models");
const CategoryModel = db.Category;

module.exports.addcat = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "name is not defined" });
    }

    try {
        const newCategory = await CategoryModel.create({ name });
        console.log("new category created successfully");
        return res.status(201).json({
            success: "category created",
            category: newCategory
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
};

module.exports.fetchCategories = async(req, res)=>{
    try {
        let data = await CategoryModel.findAll();
        console.log("data received successfully", data);
        return res.status(200).json({success: "data received successfully", data})
    } catch (error) {
        console.log("server error", error.message);
        return res.status(400).json({error: error.message})
    }
}