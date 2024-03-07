import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });

addFormats(ajv);

const createBucketDto = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 24 },
  },
  required: ['name'],
  additionalProperties: false,
};

const createBucketSchema = ajv.compile(createBucketDto);

export { createBucketSchema };
