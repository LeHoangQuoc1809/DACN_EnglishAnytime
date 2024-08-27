const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
const {
    // Get DATA
    getListUserPage, getListSkillPage, getListTopicPage, getListTopicJSONPage, getListTopicListeningPage,
    getListTopicSpeakingPage, getListTopicReadingPage, getListTopicWritingPage, getListLessonPage,
    getListVoiceQuizPage, getListMultipleChoiceQuizPage, getListDescriptionQuizPage, getListLettersIntoWordsQuizPage,

    // Get Create Page
    getCreateTopicPage, getCreateLessonPage, getCreateVoiceQuizPage, getCreateMultipleChoiceQuizPage,
    getCreateDescriptionQuizPage, getCreateLettersIntoWordsQuizPage,

    // Post Create 
    postCreateTopic, postCreateLesson, postCreateVoiceQuiz, postCreateMultipleChoiceQuiz,
    postCreateDescriptionQuiz, postCreateLettersIntoWordsQuiz,

    // Get Update Page
    getUpdateTopicPage, getUpdateLessonPage, getUpdateVoiceQuizPage,

    // Post Update
    postUpdateTopic, postUpdateLesson, postUpdateVoiceQuiz,

} = require('../controllers/homeController');


// Xử lý hình ảnh cho topic
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/topics/");
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb('Only image files are allow: jpg, JPG, jpeg, JPEG, png, PNG, gif, GIF', false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

////////////////////////////////////////////////////

const initWebRoute = (app) => {
    // router.Method('/route', handler);
    router.get('/', getListUserPage);
    router.get('/skill', getListSkillPage);

    router.get('/topic', getListTopicPage);
    router.get('/topicJson', getListTopicJSONPage);
    router.get('/topicListening', getListTopicListeningPage);
    router.get('/topicSpeaking', getListTopicSpeakingPage);
    router.get('/topicReading', getListTopicReadingPage);
    router.get('/topicWriting', getListTopicWritingPage);

    router.get('/lesson', getListLessonPage);
    router.get('/voiceQuiz', getListVoiceQuizPage);
    router.get('/multipleChoiceQuiz', getListMultipleChoiceQuizPage);
    router.get('/descriptionQuiz', getListDescriptionQuizPage);
    router.get('/lettersIntoWordsQuiz', getListLettersIntoWordsQuizPage);

    router.get('/create-topic', getCreateTopicPage);
    router.get('/create-lesson', getCreateLessonPage);
    router.get('/create-voiceQuiz', getCreateVoiceQuizPage);
    router.get('/create-multipleChoiceQuiz', getCreateMultipleChoiceQuizPage);
    router.get('/create-descriptionQuiz', getCreateDescriptionQuizPage);
    router.get('/create-lettersIntoWordsQuiz', getCreateLettersIntoWordsQuizPage);

    router.post('/create-topic', upload.single('topic'), postCreateTopic);
    router.post('/create-lesson', postCreateLesson);
    router.post('/create-voice-quiz', postCreateVoiceQuiz);
    router.post('/create-multiple-choice-quiz', postCreateMultipleChoiceQuiz);
    router.post('/create-description-quiz', postCreateDescriptionQuiz);
    router.post('/create-letters-into-words-quiz', postCreateLettersIntoWordsQuiz);

    //router.post('/create-normal-quiz', postCreateNormalQuiz);

    router.get('/update-topic/:id', getUpdateTopicPage);
    router.get('/update-lesson/:id', getUpdateLessonPage);
    router.get('/update-voiceQuiz/:id', getUpdateVoiceQuizPage);
    //router.get('/update-normalQuiz/:id', getUpdateNormalQuizPage);

    router.post('/update-lesson', postUpdateLesson);
    router.post('/update-topic', upload.single('topic'), postUpdateTopic);
    router.post('/update-voiceQuiz', postUpdateVoiceQuiz);
    //router.post('/update-normalQuiz', postUpdateNormalQuiz);

    app.use('/', router);
}

module.exports = initWebRoute; // export default