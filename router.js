const express = require('express');
const router = express.Router();

const credential = {
  email: 'admin@gmail.com',
  password: 'admin123',
};

// Sample arrays of user images and videos (replace these with your actual data)
const userImages = ['/assests/img1.jpg', '/assests/img2.jpg', '/assests/img3.jpg'];
const userVideos = ['/assests/vid1.mp4', '/assests/vid2.mp4', '/assests/vid3.mp4'];

// Function to get user images after login
function getUserImages() {
  // Simulating retrieval of user images after login
  return userImages;
}

// Function to get user videos after login
function getUserVideos() {
  // Simulating retrieval of user videos after login
  return userVideos;
}

// login user
router.post('/login', (req, res) => {
  if (req.body.email === credential.email && req.body.password === credential.password) {
    req.session.user = req.body.email; // Set the 'user' property in the session object
    res.redirect('/route/dashboard'); // Redirect to the dashboard route
  } else {
    res.end('Invalid Username');
  }
});

// route for dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    const userImages = getUserImages();
    const userVideos = getUserVideos();
    res.render('dashboard', { user: req.session.user, images: userImages, videos: userVideos });
  } else {
    res.send('Unauthorized User');
  }
});

// route logout
router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send('Error');
    } else {
      res.render('base', { title: 'Express', logout: 'Logout Successfully' });
    }
  });
});

module.exports = router;
