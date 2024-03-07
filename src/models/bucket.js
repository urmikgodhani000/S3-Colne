import mongoose from 'mongoose';

const bucketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Bucket name is required!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bucket = mongoose.model('buckets', bucketSchema);

export default Bucket;
