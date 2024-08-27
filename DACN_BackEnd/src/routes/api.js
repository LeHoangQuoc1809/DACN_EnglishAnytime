const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');
const {
    // Get DATA
    APIGetAllUsers, APIGetAllSkills, APIGetAllTopics, APIGetTopicBySkillId, APIGetSkillByTopicId, APIGetAllLessons, APIGetLessonByTopicId,
    APIGetLessonByTopicId_SkillId, APIGetAllLessonsOfTopcId, APIGetAllLessonsOfSkillId, APIGetIDLessonByTopicId,
    APIGetAllVoiceQuizByLessonId, APIGetAllDescriptionQuizByLessonId, APIGetAllMultipleChoiceQuizByLessonId,
    APIGetAllLettersIntoWordsQuizByLessonId,
    APIGetNormalQuizByLessonId, APIFindTopicFromLesson,
    APIGetUserForLogin, APIGetUserByEmail, APIGetProgressByUserIDSkillIDTopicID, APIGetProgressByCurrentLesson,
    APIGetAllVoiceQuizs,

    // Create DATA
    APICreateNewUser, APICreateVoiceQuiz, APICreateMultipleChoiceQuiz, APICreateDescriptionQuiz, APICreateLettersIntoWordsQuiz,
    APICreateLeesonVoiceQuiz,

    // Update DATA
    APIUpdateUserByEmail, APIUpdateUserPassword, APIUpdateProgress, APIUpdateSkillTopic, APIUpdateChangeSkill,

    // Delete DATA
    APIDeleteTopicFromSkill_TopicByTopicId_SkillId, APIDeleteProgressByTopicId_SkillId, APIDeleteLessonById,
    APIDeleteVoiceQuizById, APIDeleteVoiceQuizfromLESSON_VOICE_QUIZById_lessonId, APIDeleteNormalQuizById,

} = require('../controllers/APIController');

const initAPIRoute = (app) => {
    // router.Method('/route', handler);

    // create User
    router.post('/create-user', APICreateNewUser); // method POST -> CREATE data

    // create VoiceQuiz từ file excell
    router.post('/create-VoiceQuiz', APICreateVoiceQuiz); // method POST -> CREATE data

    // create MultipleChoiceQuiz từ file excell
    router.post('/create-MultipleChoiceQuiz', APICreateMultipleChoiceQuiz); // method POST -> CREATE data

    // create DescriptionQuiz từ file excell
    router.post('/create-DescriptionQuiz', APICreateDescriptionQuiz); // method POST -> CREATE data

    // create LettersIntoWordsQuiz từ file excell
    router.post('/create-LettersIntoWordsQuiz', APICreateLettersIntoWordsQuiz); // method POST -> CREATE data

    // create LESSON_VOICE_QUIZ từ file excell
    router.post('/create-LessonVoiceQuiz', APICreateLeesonVoiceQuiz); // method POST -> CREATE data

    // get User for login
    router.get('/getUserForLogin', APIGetUserForLogin); // method GET -> READ data

    // get User by email
    router.get('/getUserByEmail/:email', APIGetUserByEmail); // method GET -> READ data

    // get Progress by user_id, skill_id và topic_id
    router.get('/getProgressByUserID_SkillID_TopicID', APIGetProgressByUserIDSkillIDTopicID); // method GET -> READ data

    // get Progress by current_lesson
    router.get('/getProgressByCurrentLesson/:current_lesson', APIGetProgressByCurrentLesson); // method GET -> READ data

    // update Progress
    router.get('/update-SKILL_TOPIC', APIUpdateSkillTopic); // method PUT -> UPDATE data

    // get all data User
    router.get('/users', APIGetAllUsers); // method GET -> READ data

    // get all data Skill
    router.get('/skills', APIGetAllSkills); // method GET -> READ data

    // get all data Topic
    router.get('/topics', APIGetAllTopics); // method GET -> READ data

    // get Topic by skill_id
    router.get('/topics/:id', APIGetTopicBySkillId); // method GET -> READ data

    // get Skill by topic_id
    router.get('/skills/:id', APIGetSkillByTopicId); // method GET -> READ data

    // get all data Lesson
    router.get('/getAllLessons', APIGetAllLessons); // method GET -> READ data

    // get Lesson by ID
    //router.get('/lessons/:id', APIGetLessonByTopicId); // method GET -> READ data

    // get Lesson by topicId và skillId
    router.get('/lessons/:topicId/:skillId', APIGetLessonByTopicId_SkillId); // method GET -> READ data

    // get All Lesson by topicId
    router.get('/getAllLessonsOfTopcId/:topicId', APIGetAllLessonsOfTopcId); // method GET -> READ data

    // get All Lesson by topicId
    router.get('/getAllLessonsOfSkillId/:skillId', APIGetAllLessonsOfSkillId); // method GET -> READ data

    // get ID Lesson by ID
    router.get('/ID-lessons/:id', APIGetIDLessonByTopicId); // method GET -> READ data

    // get All VOICE_QUIZ by lesson_id
    router.get('/getAllVoiceQuizByLessonId/:id', APIGetAllVoiceQuizByLessonId); // method GET -> READ data

    // get All VOICE_QUIZ by lesson_id
    router.get('/getAllVoiceQuiz', APIGetAllVoiceQuizs); // method GET -> READ data


    // get All DESCRIPTION_QUIZ by lesson_id
    router.get('/getAllDescriptionQuizByLessonId/:id', APIGetAllDescriptionQuizByLessonId); // method GET -> READ data

    // get All MULTIPLE_CHOICE_QUIZ by lesson_id
    router.get('/getAllMultipleChoiceQuizByLessonId/:id', APIGetAllMultipleChoiceQuizByLessonId); // method GET -> READ data

    // get All LETTERS_INTO_WORDS_QUIZ by lesson_id
    router.get('/getAllLettersIntoWordsQuizByLessonId/:id', APIGetAllLettersIntoWordsQuizByLessonId); // method GET -> READ data

    // get Normal_Quiz by ID
    //router.get('/normalQuiz/:id', APIGetNormalQuizByLessonId); // method GET -> READ data

    // get Topic from Lesson_id
    router.get('/find-topic-fromLesson/:id', APIFindTopicFromLesson); // method GET -> READ data

    // update full_name, photo for User by Email
    router.put('/update-user', APIUpdateUserByEmail); // method PUT -> UPDATE data

    // update password for User by Email
    router.put('/update-user-password', APIUpdateUserPassword); // method PUT -> UPDATE data

    // update Progress
    router.put('/update-progress', APIUpdateProgress); // method PUT -> UPDATE data

    // update SKILL_TOPIC
    router.put('/update-ChangeSkill', APIUpdateChangeSkill); // method PUT -> UPDATE data

    // delete Topic khỏi SKILL by topicId và skillId
    router.delete('/delete-topic-fromSKILL_TOPIC/:topicId/:skillId', APIDeleteTopicFromSkill_TopicByTopicId_SkillId); // method DELETE -> DELETE data

    // delete Progress by topicId và skillId
    router.delete('/delete-progress/:topicId/:skillId', APIDeleteProgressByTopicId_SkillId); // method DELETE -> DELETE data

    // delete Lesson by ID
    router.delete('/delete-lesson/:id', APIDeleteLessonById); // method DELETE -> DELETE data 

    // delete Voice_Quiz by ID
    router.delete('/delete-voiceQuiz/:id', APIDeleteVoiceQuizById); // method DELETE -> DELETE data

    // delete Voice_Quiz ra khỏi LESSON_VOICE_QUIZ by ID
    router.delete('/delete-voiceQuiz-fromLESSON_VOICE_QUIZ/:id/:lessonId', APIDeleteVoiceQuizfromLESSON_VOICE_QUIZById_lessonId); // method DELETE -> DELETE data

    // delete Normal_Quiz by ID
    router.delete('/delete-normalQuiz/:id', APIDeleteNormalQuizById); // method DELETE -> DELETE data


    app.use('/api', router);
}

module.exports = initAPIRoute; // export default





{/* <div class="table-container">
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Actions</th>
        </tr>
        <% listTopics.forEach(function(topic, index) { %>
            <tr>
                <td>
                    <%= topic.id %>
                </td>
                <td>
                    <%= topic.name %>
                </td>
                <td>
                    <img src="/images/topics/<%= topic.photo %>" alt="photo" width="100" height="100"
                        style="border:2px solid black">
                </td>
                <td>
                    <div class="container_btn">
                        <div class="btn">
                            <a class="btnEdit" href="/update-topic/<%= topic.id %>">Edit</a>
                        </div>
                        <div class="btn">
                            <button class="btnDelete" data-id="<%= topic.id %>">Delete</button>
                        </div>
                    </div>
                </td>
            </tr>
            <% }); %>
    </table>
</div> */}


// <!-- <div class="btn-bar">
//         <button class="btnNavi active" onclick="openData('Listening')">Listening</button>
//         <button class="btnNavi active" onclick="openData('Speaking')">Speaking</button>
//         <button class="btnNavi active" onclick="openData('Reading')">Reading</button>
//         <button class="btnNavi active" onclick="openData('Writing')">Writing</button>
//     </div>
//     <div id="Listening" class="city" style="display:none">

//     <div id="Speaking" class="city" style="display:none">
//         <h2>Paris</h2>
//         <p>Paris is the capital of France.</p>
//     </div>

//     <div id="Reading" class="city" style="display:none">
//         <h2>Tokyo</h2>
//         <p>Tokyo is the capital of Japan.</p>
//     </div>

//     <div id="Writing" class="city" style="display:none">
//         <h2>Vietnam</h2>
//         <p>Vietnam is the capital of Japan.</p>
//     </div>

//     <script>
//         // Hiển thị thành phố mặc định khi giao diện được tải
//         document.getElementById('Listening').style.display = 'block';

//         function openData(skillName) {
//             var i;
//             var x = document.getElementsByClassName("city");
//             for (i = 0; i < x.length; i++) {
//                 x[i].style.display = "none";
//             }
//             document.getElementById(skillName).style.display = "block";
//         }
//     </script> --></div>