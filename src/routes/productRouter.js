import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const route = Router();

route.get('/', ProductController.index);
route.post('/', ProductController.store);
route.get('/:code', ProductController.show);
route.get('/descricao/:description', ProductController.search);
route.put('/preco/:code', ProductController.update);

export default route;
