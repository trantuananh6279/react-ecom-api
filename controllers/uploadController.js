const multiparty = require('multiparty');
const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const bucketName = 'tta-next-ecom';
const mime = require('mime-types');

const uploadImage = async (req, res) => {
    const form = new multiparty.Form();
    const { files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ files });
        });
    });
    const client = new S3Client({
        region: 'ap-northeast-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const newFilename = `${Date.now()}-${ext}`;
        await client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: newFilename,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path),
            })
        );
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
    }
    res.json({ links });
};

module.exports = uploadImage;
