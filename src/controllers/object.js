import { isValidObjectId } from "mongoose";
import fs from "fs";

import Object from "../models/object.js";
import HttpError from "../utils/HttpError.js";
import HttpRes from "../utils/HttpRes.js";
import {
  createFolderSchema,
  createObjectSchema,
} from "../validators/object.js";

export async function createFolder(req, res, next) {
  try {
    if (!createFolderSchema(req.body))
      throw new HttpError(400, createFolderSchema.errors);

    const object = await Object.create({
      name: req.body.name,
      url: "folder",
      type: "folder",
      size: 0,
      isFolder: true,
      userId: res.locals.user._id,
      parentId: req.body.parent_id,
    });

    const response = new HttpRes(201, object);
    return res.status(response.status).send(response);
  } catch (error) {
    return next(error);
  }
}

export async function createObject(req, res, next) {
  try {
    if (!createObjectSchema(req.body))
      throw new HttpError(400, createObjectSchema.errors);

    if (req.files.length === 0) {
      throw new HttpError(400, {
        message: "Please select the file",
      });
    }

    const objects = req.files.map((file) => {
      const payload = {
        name: file.filename,
        url: file.path,
        type: file.mimetype,
        size: file.size,
        isFolder: false,
        parentId: req.body.parent_id,
        userId: res.locals.user._id,
      };

      return payload;
    });

    const newObjects = await Object.insertMany(objects);
    const response = new HttpRes(201, newObjects);
    return res.status(response.status).send(response);
  } catch (error) {
    return next(error);
  }
}

export async function getAllObjects(req, res, next) {
  try {
    const parentId = req.params.parent_id;

    if (!isValidObjectId(parentId)) {
      throw new HttpError(400, { message: "Please provide valid id!" });
    }

    const objects = await Object.find({
      userId: res.locals.user._id,
      parentId,
    });

    const response = new HttpRes(200, objects);
    return res.status(response.status).send(response);
  } catch (error) {
    return next(error);
  }
}

export async function deleteObject(req, res, next) {
  try {
    const objectId = req.params.object_id;

    if (!isValidObjectId(objectId)) {
      throw new HttpError(400, { message: "Please provide valid id!" });
    }

    const result = await Object.findOneAndDelete({
      _id: objectId,
    });

    fs.unlink(result.url, (err) => {
      if (err) return res.status(500).send("Failed to delete file.");
    });
    let message = { message: "File deleted sucessfuly" };
    const response = new HttpRes(200, message);
    return res.status(response.status).send(response);
  } catch (error) {
    return next(error);
  }
}

export async function streamFile(req, res, next) {
  try {
    const fileId = req.params.file_id;

    const file = await Object.findOne({
      _id: fileId,
      userId: res.locals.user._id,
    });

    if (!file) {
      throw new HttpError(404, { message: "File not found!" });
    }

    if (file.isFolder) {
      throw new HttpError(400, { message: "Can not download folder!" });
    }

    res.setHeader("Content-Type", file.type);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.filename}"`
    );

    const fileStream = fs.createReadStream(file.url);

    fileStream.pipe(res);

    fileStream.on("error", (error) => {
      return next(error);
    });

    fileStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    return next(error);
  }
}
