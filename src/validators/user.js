import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });

addFormats(ajv);

const registerUserDto = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 24 },
    email: { type: 'string', format: 'email', maxLength: 50 },
    password: { type: 'string', maxLength: 50 },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

const loginUserDto = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', maxLength: 50 },
    password: { type: 'string', maxLength: 50 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

const registerUserSchema = ajv.compile(registerUserDto);
const loginUserSchema = ajv.compile(loginUserDto);

export { registerUserSchema, loginUserSchema };
