import Product from '../models/ProductModel';

class ProductController {
  async index(req, res) {
    const products = await Product.getAllProducts();

    return res.json(products);
  }

  async store(req, res) {
    const product = new Product(req.body);

    await product.create();

    if (product.errors.length) {
      return res.status(400).json({
        errors: product.errors,
      });
    }
    return res.json(product.product);
  }
}
export default new ProductController();
