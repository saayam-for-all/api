const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const s3 = new S3Client({ region: 'us-east-1' }); // Change region as needed
const BUCKET = 'your-s3-bucket-name'; // Replace with your actual S3 bucket name

exports.handler = async (event) => {
  const method = event.httpMethod;
  const userId = event.requestContext.authorizer.claims.sub; // Cognito User ID
  const objectKey = `${userId}.jpg`;

  try {
    if (method === 'POST' || method === 'PUT') {
      const body = JSON.parse(event.body || '{}');
      const base64Image = body.image;

      if (!base64Image) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Image data is required' }),
        };
      }

      const imageBuffer = Buffer.from(base64Image, 'base64');

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET,
          Key: objectKey,
          Body: imageBuffer,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Uploaded' }),
      };
    }

    if (method === 'GET') {
      const imageUrl = `https://${BUCKET}.s3.amazonaws.com/${objectKey}`;
      return {
        statusCode: 200,
        body: JSON.stringify({ url: imageUrl }),
      };
    }

    if (method === 'DELETE') {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: BUCKET,
          Key: objectKey,
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Deleted' }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};