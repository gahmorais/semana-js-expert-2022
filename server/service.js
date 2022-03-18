import fs from "fs";
import { join, extname } from "path";
import config from "./config.js";
import fsPromises from "fs/promises";
const {
  dir: { publicDirectory },
} = config;

export class Service {
  createFileStream(fileName) {
    return fs.createReadStream(fileName);
  }

  async getFileInfo(file) {
    const fullFilePath = join(publicDirectory, file);
    // valida se o arquivo existe, senão estoura um erro
    await fsPromises.access(fullFilePath);
    const fileType = extname(fullFilePath);
    return {
      type: fileType,
      name: fullFilePath,
    };
  }

  async getFileStream(fileName) {
    const { name, type } = await this.getFileInfo(fileName);
    return {
      stream: this.createFileStream(name),
      type,
    };
  }
}
