const News = require('../../models/News');
const { newsModel } = require('./repository');
class NewsProcess {

    addNewsProcess = async (newsModel, res) => {
        const NewsObj = new News({
            newsId: newsModel.newsId,
            topic: newsModel.topic,
            detail: newsModel.detail,
            writer: newsModel.writer,
            category: newsModel.category,
            createdAt: new Date(),
        })
        await NewsObj.save();
        return res.status(201).send(NewsObj);
        // return res.status(201).send({ response: "Create News Success" });
    }

    updateNewsProcess = async (newsSchema, res) => {
        // console.log(newsSchema.newsId);
        // const news = await News.findByIdAndUpdate(id, newsSchema, { new: true });
        // if (!news) return res.status(404).send('News not found');
        // return res.send(news);
        // return res.status(200).send({ response: "Update News Success" });
        // return res.status(200).send({ response: newsSchema.id });
        
        console.log(newsModel.id)
        console.log(newsModel.detail);
        
        const findNews = await News.findOne({ _id: newsModel.id });
        if (findNews) {
            findNews.topic = newsModel.topic
            findNews.detail = newsModel.detail || findNews.detail;
            findNews.writer = newsModel.writer || findNews.writer;
            findNews.category = newsModel.category || findNews.category;
            await findNews.save();
            return res.status(200).send(findNews);
        }
        else {
            return res.status(404).send({ response: "Not Found News" });
        }
    }

  
   }


module.exports = {
    NewsProcess
}