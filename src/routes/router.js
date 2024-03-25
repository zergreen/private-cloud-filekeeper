const express = require('express');
const router = express.Router()

const { NewsEndpoint } = require('../service/news/endpoint');

// Green Section
const News = require('../models/News');


router.get('/hello', async (req, res) => {
    return res.status(200).send({ message: "Hello World!" })
})

// Create a new news item
router.post('/news', new NewsEndpoint().addNewsEndpoint);

// // Create a new news item
// router.post('/news', async (req, res) => {
//     const news = new News(req.body);
//     await news.save();
//     res.status(201).send(news);
//  });

 // Get all news items
router.get('/news', async (req, res) => {
    const newsItems = await News.find({});
    res.send(newsItems);
 });
 
 // Get a news item by ID
 router.get('/news/:id', async (req, res) => {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).send('News not found');
    res.send(news);
 });

router.put('/news/:id', new NewsEndpoint().updateNewsEndpoint)
 
//  // Update a news item by ID
//  router.put('/news/:id', async (req, res) => {
//     const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!news) return res.status(404).send('News not found');
//     res.send(news);
//  });
 
 // Delete a news item by ID
 router.delete('/news/:id', async (req, res) => {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).send('News not found');
    res.send(news);
 });

 router.get('/news/search/:id', async (req, res) => {
    const newsId  = req.params.id;
    if (!newsId) {
       return res.status(400).send('Topic is required');
    }
   
    try {
       const newsItem = await News.findOne({ newsId: newsId });
       if (!newsItem) {
         return res.status(404).send('News item not found');
       }
       res.send({ id: newsItem._id });
    } catch (error) {
       res.status(500).send('Error searching news item');
    }
   });

module.exports = router;