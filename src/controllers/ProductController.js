import Product from '../models/ProductModel';

class ProductController {
  async index(req, res) {
    try {
      const { page = 1, limit = 20 } = req.query;

      const { products, count } = await Product.getAllProducts(page, limit);

      return res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalItems: count,
      });
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar os produtos'],
      });
    }
  }

  async store(req, res) {
    try {
      const product = new Product(req.body);

      await product.create();

      if (product.errors.length) {
        return res.status(400).json({
          errors: product.errors,
        });
      }

      return res.json({
        product: product.product,
      });
    } catch (e) {
      return res.status(400).json({
        errors: ['Erro ao criar produto'],
      });
    }
  }

  async show(req, res) {
    try {
      const { code } = req.params;

      if (!code) {
        return res.status(400).json({
          errors: ['Erro código inválido'],
        });
      }

      const product = await Product.getProduct({ code });

      if (!product) {
        return res.status(404).json({
          errors: ['Produto não existe'],
        });
      }

      return res.json({ product });
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar o produto'],
      });
    }
  }

  async search(req, res) {
    try {
      const { description } = req.params;
      if (!description || typeof description !== 'string') {
        return res.status(400).json({
          errors: ['Descrição inválida'],
        });
      }

      const { page = 1, limit = 20 } = req.query;

      const { products, count } = await Product.getAllProducts(page, limit, {
        description: { $regex: description, $options: 'i' },
      });

      return res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalItems: count,
      });
    } catch (e) {
      return res.status(500).json({
        errors: ['Erro ao buscar os produtos'],
      });
    }
  }
}

export default new ProductController();
