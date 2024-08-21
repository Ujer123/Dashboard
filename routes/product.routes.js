import express from "express";
import {createProduct, getProduct, updateProduct, deleteProduct} from '../controllers/product.controllers.js'

const router = express.Router();

router.route('/').post(createProduct).get(getProduct)
router.route('/:productId').put(updateProduct).delete(deleteProduct)

export default router;