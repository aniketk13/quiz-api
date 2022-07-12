const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    correct_option: String
})

module.exports = mongoose.model('Question', QuestionSchema)