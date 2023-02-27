import Product from '../models/ProductModel';
import statusHttp from '../configs/statusHttp';

class ProductController {
  async index(req, res) {
    console.log(req);
    try {
      const { page = 1, limit = 20 } = req.query;

      const { products, count } = await Product.getAllProducts(page, limit);

      return res.status(statusHttp.ok).json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalItems: count,
      });
    } catch (e) {
      return res.status(statusHttp.internalServerError).json({
        errors: ['Erro ao buscar os produtos.'],
      });
    }
  }

  async store(req, res) {
    try {
      const product = new Product(req.body);

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
      return res.status(statusHttp.internalServerError).json({
        errors: ['Erro ao criar produto.'],
      });
    }
  }

  async show(req, res) {
    try {
      const { code } = req.params;

      if (typeof code !== 'string') {
        return res.status(statusHttp.badRequest).json({
          errors: ['Erro código inválido.'],
        });
      }

      const product = await Product.getProduct({ code });

      if (!product) {
        return res.status(statusHttp.notFound).json({
          errors: ['Produto não existe.'],
        });
      }

      return res.status(statusHttp.ok).json({ product });
    } catch (e) {
      return res.status(statusHttp.internalServerError).json({
        errors: ['Erro ao buscar o produto.'],
      });
    }
  }

  async search(req, res) {
    try {
      const { description } = req.params;
      if (!description || typeof description !== 'string') {
        return res.status(statusHttp.badRequest).json({
          errors: ['Descrição inválida'],
        });
      }

      const { page = 1, limit = 20 } = req.query;

      const { products, count } = await Product.getAllProducts(page, limit, {
        description: { $regex: description, $options: 'i' },
      });

      return res.status(statusHttp.ok).json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalItems: count,
      });
    } catch (e) {
      return res.status(statusHttp.internalServerError).json({
        errors: ['Erro ao buscar os produtos.'],
      });
    }
  }

  async update(req, res) {
    try {
      const { code } = req.params;

      if (typeof code !== 'string') {
        return res.status(statusHttp.badRequest).json({
          errors: ['Erro código inválido.'],
        });
      }

      const product = new Product(req.body);

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
      return res.status(statusHttp.internalServerError).json({
        errors: ['Erro ao atualizar produto.'],
      });
    }
  }
}

export default new ProductController();
