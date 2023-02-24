import mongoose from 'mongoose';

export default class Model extends mongoose {
  static init(schema, options = {}) {
    const modelSchema = new this.Schema(schema);
    const modelName = options.tagName || `${this.name.toLowerCase()}s`;

    return mongoose.model(modelName, modelSchema);
  }
}
