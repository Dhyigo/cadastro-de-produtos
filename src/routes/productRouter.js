import { Router } from 'express';

import ProductController from '../controllers/ProductController';
import tokenRequired from '../middlewares/tokenRequired';

const route = Router();

route.get('/', ProductController.index);
route.post('/', tokenRequired, ProductController.store);
route.get('/:code', ProductController.show);
route.get('/descricao/:description', ProductController.search);
route.put('/preco/:code', tokenRequired, ProductController.update);

export default route;
