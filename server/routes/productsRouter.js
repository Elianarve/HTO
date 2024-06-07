import express from 'express';
import {getProducts, createdProducts, updateProducts, getOneProducts, deleteProducts} from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts); 
router.get('/:id', getOneProducts);

router.post('/', createdProducts);

router.put('/:id', updateProducts);

router.delete('/:id', deleteProducts);

export default router;
