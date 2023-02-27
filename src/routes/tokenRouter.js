import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const route = Router();

route.post('/', TokenController.store);

export default route;
