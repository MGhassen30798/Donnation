const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: 'showapp',
    api_key: '119927546454816',
    api_secret: '_THJp96HHi6hfnPkueiIOQ-PqvE'
});

module.exports = cloudinary