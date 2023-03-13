const Joi = require("joi");
const { Article } = require("../models/article");

const getArticles = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Article.countDocuments({});
    const articles = await Article.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.json({
      data: articles,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const postArticle = async (req, res) => {
  const article = req.body;
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      creator: Joi.string().required(),
      description: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newArticle = new Article({
      ...article,
      title: article.title,
      content: article.content,
      creator: article.creator,
      description: article.description,
      category: article.category,
      createdAt: new Date().toISOString(),
    });

    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  postArticle,
  deleteArticle,
};
