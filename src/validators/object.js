import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });

addFormats(ajv);

const createFolderDto = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 24 },
    parent_id: { type: 'string', minLength: 24, maxLength: 24 },
  },
  required: ['name', 'parent_id'],
  additionalProperties: false,
};

const createObjectDto = {
  type: 'object',
  properties: {
    parent_id: { type: 'string', minLength: 24, maxLength: 24 },
  },
  required: ['parent_id'],
  additionalProperties: false,
};

const createFolderSchema = ajv.compile(createFolderDto);
const createObjectSchema = ajv.compile(createObjectDto);

export { createObjectSchema, createFolderSchema };
