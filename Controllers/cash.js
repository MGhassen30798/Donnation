const Articles = require('../Models/cash');


//create
exports.createArticles = async(req, res, next) => {
    const articles = new Articles({
        price: req.body.price,
        Ass: req.body.Ass,
    });

    await articles.save()
        .then(() => res.status(201).json({ message: 'Cash saved !' }))
        .catch(error => res.status(400).json({ message: 'articles not saved error 400 check id company!', error }));


}

//get articles by id
exports.getArticlesbyid = (req, res, next) => {
    Articles.findOne({ _id: req.params.id })
        .then(articles => res.status(200).json({ articles: articles }))
        .catch(error => res.status(404).json({ message: "articles not found ligne 29" }));
}