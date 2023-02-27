"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ProductModel = require('../models/ProductModel'); var _ProductModel2 = _interopRequireDefault(_ProductModel);
var _statusHttp = require('../configs/statusHttp'); var _statusHttp2 = _interopRequireDefault(_statusHttp);

class ProductController {
  async index(req, res) {
    console.log(req);
    try {
      const { page = 1, limit = 20 } = req.query;

      const { products, count } = await _ProductModel2.default.getAllProducts(page, limit);

      return res.status(_statusHttp2.default.ok).json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalItems: count,
      });
    } catch (e) {
      return res.status(_statusHttp2.default.internalServerError).json({
        errors: ['Erro ao buscar os produtos.'],
      });
    }
  }

  async store(req, res) {
    try {
      const product = new (0, _ProductModel2.default)(req.body);

      await product.create();

      if (product.errors.length) {
        return res.status(product.status).json({
          errors: product.errors,
        });
      }

      return res.status(product.status).json({
        product: product.product,
      });
    } catch (e) {
      return res.status(_statusHttp2.default.internalServerError).json({
        errors: ['Erro ao criar produto.'],
      });
    }
  }

  async show(req, res) {
    try {
      const { code } = req.params;

      if (typeof code !== 'string') {
        return res.status(_statusHttp2.default.badRequest).json({
          errors: ['Erro código inválido.'],
        });
      }

      const product = await _ProductModel2.default.getProduct({ code });

      if (!product) {
        return res.status(_statusHttp2.default.notFound).json({
          errors: ['Produto não existe.'],
        });
      }

      return res.status(_statusHttp2.default.ok).json({ product });
    } catch (e) {
      return res.status(_statusHttp2.default.internalServerError).json({
        errors: ['Erro ao buscar o produto.'],
      });
    }
  }

  async search(req, res) {
    try {
      const { description } = req.params;
      if (!description || typeof description !== 'string') {
        return res.status(_statusHttp2.default.badRequest).json({
          errors: ['Descrição inválida'],
        });
      }

      const { page = 1, limit = 20 } = req.query;

      const { products, count } = await _ProductModel2.default.getAllProducts(page, limit, {
        description: { $regex: description, $options: 'i' },
      });

      return res.status(_statusHttp2.default.ok).json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalItems: count,
      });
    } catch (e) {
      return res.status(_statusHttp2.default.internalServerError).json({
        errors: ['Erro ao buscar os produtos.'],
      });
    }
  }

  async update(req, res) {
    try {
      const { code } = req.params;

      if (typeof code !== 'string') {
        return res.status(_statusHttp2.default.badRequest).json({
          errors: ['Erro código inválido.'],
        });
      }

      const product = new (0, _ProductModel2.default)(req.body);

      await product.update(code);

      if (product.errors.length) {
        return res.status(product.status).json({
          errors: product.errors,
        });
      }

      return res.status(product.status).json({
        product: product.product,
      });
    } catch (e) {
      return res.status(_statusHttp2.default.internalServerError).json({
        errors: ['Erro ao atualizar produto.'],
      });
    }
  }
}

exports. default = new ProductController();
