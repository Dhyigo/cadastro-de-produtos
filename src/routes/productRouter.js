import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const route = Router();

route.get('/', ProductController.index);
route.post('/', ProductController.store);

export default route;
