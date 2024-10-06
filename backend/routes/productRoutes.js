const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // Ensure this path is correct

// Add a new product
router.post('/add', async (req, res) => {
    const { name, category, image, status } = req.body; // Use consistent naming
    const product = new Product({ name, category, image, status });

    try {
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(400).json({ message: 'Error adding product', error: error.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(400).json({ message: 'Error fetching products', error: error.message });
    }
});

// Edit a product
router.put('/:id', async (req, res) => {
    const { name, category, image, status } = req.body; // Use consistent naming

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, category, image, status },
            { new: true, runValidators: true } // Ensure validation is applied
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(400).json({ message: 'Error deleting product', error: error.message });
    }
});

module.exports = router;
