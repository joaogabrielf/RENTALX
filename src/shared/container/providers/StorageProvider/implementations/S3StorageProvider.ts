import {
    DeleteObjectsCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import upload from "@config/upload";
import dotenv from "dotenv";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import { IStorageProvider } from "../IStorageProvider";

dotenv.config();
export class S3StorageProvider implements IStorageProvider {
    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({});
    }

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        const ContentType = mime.getType(originalName);

        console.log(ContentType);

        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET,
                Body: fileContent,
                Key: `${folder}/${file}`,
                // ACL: "public-read",
                ContentType,
            })
        );

        await fs.promises.unlink(originalName);

        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        await this.s3Client.send(
            new DeleteObjectsCommand({
                Bucket: process.env.AWS_BUCKET,
                Delete: { Objects: [{ Key: `${folder}/${file}` }] },
            })
        );
    }
}
