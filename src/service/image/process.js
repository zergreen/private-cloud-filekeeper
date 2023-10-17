const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto'); 
const fs = require('fs')
const Images = require('../../models/Images')
class ImgProcess {
   addImagesProcess = async (imageModel, filepath, res) => {
      if (!filepath) {
          fs.unlinkSync(filepath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            return res.status(401).send({ error: "No uploading the image" })
      }

   try {
      //generate imageId
      const uniqueImageId = await this.generateUniqueImageId();
      
      //upload image to google bucket
      const storage = new Storage({
        keyFilename: __dirname + '/upload/file-keeper-401404-33518f0f641c.json',
      });

      const bucket = storage.bucket('filekeeper');
      const [file] = await bucket.upload(filepath, {
        metadata: {
          contentType: imageModel.contentType,
          metadata: {
            firebaseStorageDownloadTokens: uniqueImageId
          },
        },
      });
     
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(file.name)}`;

      //  const options = {
      //    version: 'v4', // Use v4 signing
      //    action: 'read', // Allow reading the object
      //    expires: Date.now() + 1000 * 60 * 60 * 24 * 365 * 10, // Expires in 10 years
      // };

      // const [imageUrl] = await file.getSignedUrl(options);
      imageModel.data = imageUrl;

      //updateAt
      const ImageObj = new Images({
         imageId: uniqueImageId,
         userId: imageModel.userId,
         name: imageModel.name,
         contentType: imageModel.contentType,
         data: imageModel.data,
         createdAt: new Date(),
      })

         await ImageObj.save();
         //res.redirect('/view/' + imageId);
         fs.unlinkSync(filepath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
         })
      //return res.status(201).send({ response: "Upload Images Success" ,data: ImageObj.data });
      return res.redirect('/')

      } catch (err) {
         console.error(err);
         fs.unlinkSync(filepath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
         })
         res.redirect('/')
         return res.status(500).send({ error: "Error uploading the image" });
      }
   }

   generateUniqueImageId = async() => {
      const randomBytes = await crypto.randomBytes(16); // Generate random bytes
      const imageId = randomBytes.toString('hex');

      const tempId = imageId;
      const findImagesId = await Images.findOne({ ImageId: imageId });
       
      while (tempId == findImagesId) {
         randomBytes = await crypto.randomBytes(16); // Generate random bytes
         imageId = randomBytes.toString('hex');
         tempId = imageId;
         findImagesId = await Images.find({ ImageId: imageId });
         if (tempId != findImagesId) {
            break;
         }
      }
      return tempId;
   }

   viewAllProcess = async(imageSchema, res) => {
      const findInfo = await Images.find({ userId: imageSchema })
      if (findInfo) {
         console.log(`[INFO] Information Found!`)
         return findInfo
        // return res.status(200).send({ response: findInfo });
      }
      else {
         return "ไม่พบรายการ"
        // return res.status(404).send({ response: "ไม่พบรายการ" });
      }
   }

   viewPictureProcess = async (imageSchema, res) => {
      const findInfo = await Images.findOne({ imageId: imageSchema.imageId })
      if (findInfo) {
         console.log(`[INFO] Information Found!`)
         return res.render('viewpic.ejs',{ image: findInfo.data });
      }
      else {
         return res.status(404).send({ response: "ไม่พบรายการ" });
      }
   }
  
   deletePictureProcess = async (imageSchema, res) => {
      try {
        const result = await Images.deleteOne({ imageId: imageSchema.imageId });

         if (result.deletedCount === 0) {
            console.error('[ERROR] No document found to delete.');
            return res.status(404).send({ error: "ไม่พบรายการที่จะลบ" });
         }
         console.log('[INFO] Document deleted successfully.');
         return res.redirect('/')
         //return res.status(200).send({ response: "ลบรายการสำเร็จ" });
         } catch (err) {
            console.error('[ERROR] Error deleting document:', err);
            return res.status(500).send({ error: "เกิดข้อผิดพลาดในการลบรายการ" });
         }
      };
   }


module.exports = {
   ImgProcess
}