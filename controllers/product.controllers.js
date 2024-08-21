import Product from '../models/product.models.js';
import asyncHandler from 'express-async-handler';

// @method POST
// @method {string} title - product's title


const createProduct = asyncHandler(async (req, res) => {
    try{
        const{title, description, price, variants} = req.body;

        if(title && description && variants && price){
            const newProduct = new Product({
                title: title,
                description: description,
                variants: variants,
                price: price,
            });

            const createdProduct = await newProduct.save();

            res.json({
                code: 200,
                remark: 'product created',
            });
        }else{
            res.status(400);
            res.json({
                code: 400,
                remark: 'title and description are required',
            });
        }
    }catch(error){
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: 'internal server error',
        });
        
    }
});

const getProduct = asyncHandler(async(req, res)=>{
    try{
        let filterObject = {
            isArchived: req.query.isArchived === undefined ? false : req.query.isArchived
        }

        if(req.query.search){
            filterObject.title = {
                $regex: req.query.search,
                $options: 'i'
            }
        }

        const product = await Product.find(filterObject);

        res.json({
            code: 200,
            remark: 'success',
            data: product,
        });
    }catch(error){
        console.log(error);
        res.status(500);
        res.json({
            code: 500,
            remark: 'failed',
        });
        
    }
});


const updateProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.productId; // Route parameter should match
        const product = await Product.findById(productId);

        if (product) {
            const { title, description, price, variants, archivedToggle } = req.body;
            product.title = title || product.title;
            product.description = description || product.description;
            product.variants = variants || product.variants;
            product.price = price || product.price;
            product.isArchived = archivedToggle === undefined ? product.isArchived : archivedToggle;

            await product.save();

            res.json({
                code: 200,
                remark: 'product updated',
            });
        } else {
            res.status(404).json({
                code: 404,
                remark: 'product not found',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            code: 500,
            remark: 'failed',
        });
    }
});




const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.productId; // Use productId from the route
        console.log(`Deleting product with ID: ${productId}`);

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({
                code: 404,
                remark: 'Product not found',
            });
        }

        res.json({
            code: 200,
            remark: 'Product deleted',
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            code: 500,
            remark: 'Failed to delete product',
        });
    }
});


export {createProduct, deleteProduct, getProduct, updateProduct}