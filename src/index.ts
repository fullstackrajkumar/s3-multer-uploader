import * as AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3-v2';

export interface ConfigType{
    secretAccessKey : String;
    accessKeyId : String;
    region : String;
    bucketName : String;
}

class AWSUploader {
    secretAccessKey: any;
    accessKeyId: any;
    region: any;
    bucketName: any;
    constructor(obj:ConfigType) {
        this.secretAccessKey = obj.secretAccessKey
        this.accessKeyId = obj.accessKeyId
        this.region = obj.region
        this.bucketName = obj.bucketName
    }
    upload() {
        AWS.config.update({
            secretAccessKey: this.secretAccessKey,
            accessKeyId: this.accessKeyId,
            region: this.region
        });
        const s3 = new AWS.S3();
        return multer({
            storage: multerS3({
                S3: s3,
                acl: 'public-read',
                bucket: this.bucketName,
                key: function (req:any, file:any, cb:any) {
                    cb(null, file.originalname); //use Date.now() for unique file keys
                }
            })
        });
    }
}

export default AWSUploader