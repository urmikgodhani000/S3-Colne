import mongoose from 'mongoose';

const objectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Object name is required!'],
    },
    url: {
      type: String,
      trim: true,
      required: [true, 'Object url is required!'],
    },
    type: {
      type: String,
      trim: true,
      required: [true, 'Object type is required!'],
    },
    size: {
      type: Number,
      default: 0,
    },
    isFolder: {
      type: Boolean,
      default: false,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'objects',
      required: [true, 'Object parentId is required!'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'UserId is required!'],
    },
  },
  {
    timestamps: true,
  }
);

const Object = mongoose.model('objects', objectSchema);

export default Object;
