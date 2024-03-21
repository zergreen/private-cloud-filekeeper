const { NewsProcess } = require('./process');
const repo = require('./repository')

class NewsEndpoint {

    constructor() {
        this.newsModel = repo.newsModel
        this.newsSchema = repo.newsSchema
    }

    addNewsEndpoint = (req, res) => {
        this.newsModel.newsId = req.body.newsId
        this.newsModel.topic = req.body.topic
        this.newsModel.detail = req.body.detail
        this.newsModel.writer = req.body.writer
        this.newsModel.category = req.body.category
        new NewsProcess().addNewsProcess(this.newsModel,res)
    }

    updateNewsEndpoint = (req, res) => {
        this.newsModel.id = req.params.id 
        this.newsModel.topic = req.body.topic
        this.newsModel.detail = req.body.detail
        this.newsModel.writer = req.body.writer
        this.newsModel.category = req.body.category
        new NewsProcess().updateNewsProcess(this.newsModel,res)
    }
}

module.exports = {
    NewsEndpoint
}