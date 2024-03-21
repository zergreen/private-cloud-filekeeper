const express = require('express');
const router = express.Router()
const path = require('path');
const multer = require('multer')
const { AuthEndpoint } = require('../service/auth/endpoint');
const { ImgEndpoint } = require('../service/image/endpoint');
const {ImgProcess } = require('../service/image/process')

router.get('/auth/google',new AuthEndpoint().authGoogle)
router.get('/auth/google/callback', new AuthEndpoint().authCallback)
router.get('/profile', new AuthEndpoint().profile)
router.get('/auth/google/logout',new AuthEndpoint().logout)

/** Image router CRUD */

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../service/image/upload'));
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.png', '.jpg', '.gif', '.jpeg'];

        if (allowedExtensions.includes(ext)) {
            callback(null, true);
        } else {
            callback(new Error('[WARNING]Only images are allowed'));
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5// 5MB
    }
});

router.post("/upload-new-images", upload.single("file"), new ImgEndpoint().addImagesEndpoint,
    (error, req, res, next) => {
        if (error) {
            console.log(`[ERROR] ${error.message}`)
           return res.status(400).send({ error: error.message }) 
        }
        else {
            new ImgEndpoint().addImagesEndpoint
        }
    });

router.get("/picture-view", new ImgEndpoint().viewAllEndpoint)
router.get("/picture-view/:imageId", new ImgEndpoint().viewPictureEndpoint)
router.get("/delete-picture/:imageId",new ImgEndpoint().deletePictureEndpoint)

// router.get('/', (req, res) => {
//     if (req.user) {
//         axios.get(`http://localhost:3000/picture-view`)
//             .then(response => {
//                 const pictureData = response.findInfo;
//                 res.render('index.ejs', { user: req.user, image: pictureData });
//             })
//             .catch(error => {
//                 console.error('Failed to fetch picture data', error)
//             });
//     } else {
//         res.render('index.ejs', { user: req.user, image: null });
//     }
// });

router.get('/', async (req, res) => {
    if (req.user) {
        const userId = req.user.googleId
        const imageInfo = await new ImgProcess().viewAllProcess(userId, res)
        return res.render('index.ejs', { user: req.user , image: imageInfo })
    }
    else {
        return res.render('index.ejs', { user: req.user })
    }                                          
})

// router.get('/:template', (req, res) => {
//     const template = req.params.template;
//     res.render(template); // Renders "views/{template}.ejs"
// });


// router.get('/', (req, res) => {
//   res.render('home', { pageTitle: 'Handlebars Example' });
// });

router.get('/hello', async (req, res) => {
    return res.status(200).send({ message: "Hello World!" })
})

module.exports = router;