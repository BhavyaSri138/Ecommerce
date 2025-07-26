const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Product = require('../models/productModel'); // Import the Product model
const router = express.Router();

router.get("/seed", async (req, res) => {
    try {
        console.log("Fetching products from Fake Store API...");
        const response = await axios.get('https://fakestoreapi.com/products'); // Fetch products from the API
        console.log("Products fetched:", response.data);

        const products = response.data.map(product => ({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: {
                rate: product.rating.rate,
                count: product.rating.count
            }
        }));

        console.log("Formatted products:", products);

        await Product.insertMany(products); // Insert products into the database
        console.log("Products inserted successfully");
        res.status(200).json({ message: "Products seeded successfully" });
    } catch (error) {
        console.error("Error seeding products:", error.message);
        res.status(500).json({ message: error.message });
    }
});

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a product by ID
router.get("/:id", async (req, res) => {
    try {
        const id = req.params._id;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const product = await Product.findById(id); // Fetch product by ID
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new product
router.post("/", async (req, res) => {
    try {
        const { title, price, description, category, image, rating } = req.body;

        if (!title || !price || !description || !category || !image || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProduct = new Product({
            title,
            price,
            description,
            category,
            image,
            rating
        });

        const savedProduct = await newProduct.save(); // Save the new product to the database
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT (update) a product by ID
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const { title, price, description, category, image, rating } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, price, description, category, image, rating },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id); // Delete the product by ID
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE all products
router.delete("/", async (req, res) => {
    try {
        await Product.deleteMany({}); // Delete all products
        res.status(200).json({ message: "All products deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/seed", async (req, res) => {
    try {
        console.log("Fetching products from Fake Store API...");
        const response = await axios.get('https://fakestoreapi.com/products'); // Fetch products from the API
        console.log("Products fetched:", response.data);

        const products = response.data.map(product => ({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: {
                rate: product.rating.rate,
                count: product.rating.count
            }
        }));

        console.log("Formatted products:", products);

        await Product.insertMany(products); // Insert products into the database
        console.log("Products inserted successfully");
        res.status(200).json({ message: "Products seeded successfully" });
    } catch (error) {
        console.error("Error seeding products:", error.message);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;