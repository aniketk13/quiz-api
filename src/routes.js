const express = require('express')
const router = express()
const Question = require('./models/Question') //includes our model

router.get('/', (req, res) => {
    return res.status(200).send("Welcome to the Quiz")
})
// get all quiz questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

// get one quiz question
router.get('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const question = await Question.findOne({ _id })
        if (!question) {
            return res.status(404).json({})
        }
        else {
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }

})

// create one quiz question
router.post('/questions', async (req, res) => {
    try {
        const { question } = req.body
        const { option1 } = req.body
        const { option2 } = req.body
        const { option3 } = req.body
        const { option4 } = req.body
        const { correct_option } = req.body

        const question_created = await Question.create({
            question,
            option1,
            option2,
            option3,
            option4,
            correct_option

        })
        return res.status(201).json(question_created)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const { question, option1, option2, option3, option4, correct_option } = req.body

        let question_find = await Question.findOne({ _id })
        console.log("Now printing question")
        console.log(question_find)
        console.log(question)
        console.log(req.body)

        if (!question_find) {
            const question_new = await Question.create({
                question,
                option1,
                option2,
                option3,
                option4,
                correct_option
            })
            return res.status(201).json(question_new)
        }
        else {
            question_find.question = question
            question_find.option1 = option1
            question_find.option2 = option2
            question_find.option3 = option3
            question_find.option4 = option4
            question_find.correct_option = correct_option
            await question_find.save()
            console.log("Now printing another question")
            console.log(question_find)
            return res.status(200).json(question_find)
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

// delete one quiz question
router.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const question = await Question.deleteOne({ _id })

        if (question.deletedCount === 0) {
            return res.status(404).json()
        }
        else {
            return res.status(204).json()
        }

    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})


module.exports = router