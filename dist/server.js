"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

_dotenv2.default.config();

const port = process.env.PORT;
const connectString = process.env.CONNECTION_STRING;
_mongoose2.default.set('strictQuery', false);
_mongoose2.default.connect(connectString)
  .then(() => _app2.default.emit('connected'))
  .catch((e) => console.error(`error connecting to db: ${e}`));

_app2.default.on('connected', () => {
  _app2.default.listen(port, () => {
    console.log(`Server active http://localhost:${port}/`);
  });
});
