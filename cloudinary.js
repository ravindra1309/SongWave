const cloudinary= require('cloudinary');

cloudinary.config({ 
    cloud_name: 'dwizpsurd', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY, 
  });

module.exports = {cloudinary};
          
