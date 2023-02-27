"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _ProductController = require('../controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);
var _tokenRequired = require('../middlewares/tokenRequired'); var _tokenRequired2 = _interopRequireDefault(_tokenRequired);

const route = _express.Router.call(void 0, );

route.get('/', _ProductController2.default.index);
route.post('/', _tokenRequired2.default, _ProductController2.default.store);
route.get('/:code', _ProductController2.default.show);
route.get('/descricao/:description', _ProductController2.default.search);
route.put('/preco/:code', _tokenRequired2.default, _ProductController2.default.update);

exports. default = route;
