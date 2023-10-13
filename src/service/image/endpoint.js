const { ImgProcess } = require('./process');
const Images = require('../../models/Images')
const repo = require('./repository')
class ImgEndpoint {

    constructor() {
        this.imageModel = repo.imgModel
        this.imageSchema = repo.imgSchema
    }
    addImagesEndpoint = (req, res) => {
         let filepath
         if (req.file) {
             this.imageModel.userId = req.user.googleId
             this.imageModel.name = req.file.originalname
             this.imageModel.contentType = req.file.mimetype
             filepath = __dirname + "\\upload\\" + req.file.originalname
        } else {
            console.log("[WARNING] No Such Images File!")
            return res.status(401).send({ error : "No such image file!" })
        }
        new ImgProcess().addImagesProcess(this.imageModel,filepath,res)
    }

    viewAllEndpoint = (req, res) => {
        this.imageSchema.userId = req.user.googleId
        new ImgProcess().viewAllProcess(this.imageSchema,res)
    }

    viewPictureEndpoint = (req, res) => {
        this.imageSchema.imageId = req.params.imageId
         new ImgProcess().viewPictureProcess(this.imageSchema,res)
    }

    deletePictureEndpoint = (req, res) => {
        this.imageSchema.imageId = req.params.imageId
        new ImgProcess().deletePictureProcess(this.imageSchema,res)
    }
}

module.exports = {
    ImgEndpoint
}