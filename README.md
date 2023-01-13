# s3-multer-uploader

s3-multer-uploader is a middleware which you can use for uploading the files from your backend to s3 bucket directly. Here you need to provide some required credentials of your AWS ACL account and S3 bucket.

## Install

    npm i s3-multer-uploader

## Usage

    const express = require('express');
    const { AWSUploader } = require('s3-multer-uploader');
    const app = new express();
	
	// Initialize constructor with credentials
    const  awsUploader = new  AWSUploader({
	    secretAccessKey:  process.env.SECRET_ID,
	    accessKeyId:  process.env.ACCESS_ID,
	    region:  process.env.REGION,
	    bucketName:  process.env.AWS_S3_BUCKET_NAME
    })
    
    // for upload a single file 
    
    app.post('/uploadFile',awsUploader.upload().single('file'),(req,res)=>{
    res.send({url : req.file.location})
    });
    
    // for upload a multiple files together 
    
    app.post('/uploadFile',awsUploader.upload().array('file'),(req,res)=>{
     res.send({urls : req.files.map(item=>item.location)})
    });
    
    app.listen(process.env.PORT)

*Note - This package uses multer for uploading files*

## Maintainers

 - [Rajkumar](https://www.npmjs.com/~fullstackrajkumar)
