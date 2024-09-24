const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth-controllers");
const authValidate = require('../middlewares/validate');
const {singUpSchema,loginSchema} = require('../validators/auth-validators'); 
const AuthMiddleware = require('../middlewares/auth-middlewares'); 
const multer = require('multer'); 
const path = require('path');

router.route("/").get(AuthController.Home); 
router.route("/user").get(AuthMiddleware, AuthController.userInfo); 
router.route("/register").post(authValidate(singUpSchema),AuthController.register); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'E:/xampp/htdocs/coreui-free-react-admin-template-main/src/assets/images/avatars'); // Frontend directory
    },
    filename: function (req, file, cb) {
      const userName = req.body.name || 'default'; // Use a default name if not provided
      const timestamp = Date.now();
      const fileExtension = path.extname(file.originalname);
      const formattedName = userName.toLowerCase().replace(/\s+/g, '-') + '-' + timestamp;
      cb(null, formattedName + fileExtension); // Save file with formatted name
    }
  });

// Initialize multer with storage configuration
const upload = multer({ storage: storage });
router.route("/profile-submit").post(upload.single('image'),AuthController.ChangeDetails);
router.route("/login").post(authValidate(loginSchema),AuthController.login); 
module.exports = router; 