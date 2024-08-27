const connection = require('../config/database');
const fs = require('fs');
const {
    // Get DATA
    getAllUsers, getAllSkills, getAllTopics, getAllTopicListening, getAllTopicSpeaking, getAllTopicSpeakingUnduplicated,
    getAllTopicReading, getAllTopicWriting,
    GetPhotoFromTopicById, getAllLessons, getAllVoiceQuizs, getAllMultipleChoiceQuizs, getAllDescriptionQuizs,
    getAllLettersIntoWordsQuizs, getLessonBySkillId,

    // Find DATA
    findTopicById, findTopicByName, findLessonById, findLessonByName, findVoiceQuizById,

    // Create DATA
    createTopic, createLesson, createVoiceQuiz, createMultipleChoiceQuiz,
    createDescriptionQuiz, createLettersIntoWordsQuiz, createProgress, createSkillTopic,

    // Update DATA
    updateTopicById, updateLessonById, updateVoiceQuizById,

} = require('../services/CRUDService');


// Get DATA
const getListUserPage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('listUser.ejs', { listUsers: results })
}
const getListSkillPage = async (req, res) => {
    let results = await getAllSkills();
    return res.render('listSkill.ejs', { listSkills: results })
}
// const getListTopicPage = async (req, res) => {
//     let results = await getAllTopics();
//     return res.render('listTopic.ejs', { listTopics: results })
// }
// const getListTopicListeningPage = async (req, res) => {
//     let results = await getAllTopicListening();
//     return res.render('listTopic.ejs', { listTopicListening: results })
// }
// const getListTopicSpeakingPage = async (req, res) => {
//     let results = await getAllTopicSpeaking();
//     return res.render('listTopic.ejs', { listTopicSpeaking: results })
// }
// const getListTopicReadingPage = async (req, res) => {
//     let results = await getAllTopicReading();
//     return res.render('listTopic.ejs', { listTopicReading: results })
// }
// const getListTopicWritingPage = async (req, res) => {
//     let results = await getAllTopicWriting();
//     return res.render('listTopic.ejs', { listTopicWriting: results })
// }
const getListTopicPage = async (req, res) => {
    let results = await getAllTopics();
    return res.render('listTopic.ejs', { listTopics: results });
}
const getListTopicJSONPage = async (req, res) => {
    let results = await getAllTopics();
    return res.json({ listTopics: results });
}
const getListTopicListeningPage = async (req, res) => {
    let results = await getAllTopicListening();
    return res.json({ listTopics: results });
}

const getListTopicSpeakingPage = async (req, res) => {
    let results = await getAllTopicSpeaking();
    return res.json({ listTopics: results });
}

const getListTopicReadingPage = async (req, res) => {
    let results = await getAllTopicReading();
    return res.json({ listTopics: results });
}

const getListTopicWritingPage = async (req, res) => {
    let results = await getAllTopicWriting();
    return res.json({ listTopics: results });
}
const getListLessonPage = async (req, res) => {
    let results = await getAllLessons();
    let topics = await getAllTopics();
    let skills = await getAllSkills();
    return res.render('listLesson.ejs', { listLessons: results, listTopics: topics, listSkills: skills })
}
const getListVoiceQuizPage = async (req, res) => {
    let results = await getAllVoiceQuizs();
    let lesson = await getAllLessons();
    let lessonOfSpeaking = await getLessonBySkillId(2);
    let topicSpeaking = await getAllTopicSpeaking();
    let topicSpeakingUnduplicated = await getAllTopicSpeakingUnduplicated();
    return res.render('listVoiceQuiz.ejs',
        {
            listVoiceQuiz: results, listLessons: lesson,
            listTopicSpeakingUnduplicated: topicSpeakingUnduplicated,
            listLessonOfSpeaking: lessonOfSpeaking,
        })
}
const getListMultipleChoiceQuizPage = async (req, res) => {
    let results = await getAllMultipleChoiceQuizs();
    let lesson = await getAllLessons();
    return res.render('listMultipleChoiceQuiz.ejs', { listMultipleChoiceQuiz: results, listLessons: lesson })
}
const getListDescriptionQuizPage = async (req, res) => {
    let results = await getAllDescriptionQuizs();
    let lesson = await getAllLessons();
    return res.render('listDescriptionQuiz.ejs', { listDescriptionQuiz: results, listLessons: lesson })
}
const getListLettersIntoWordsQuizPage = async (req, res) => {
    let results = await getAllLettersIntoWordsQuizs();
    let lesson = await getAllLessons();
    return res.render('listLettersIntoWordsQuiz.ejs', { listLettersIntoWordsQuiz: results, listLessons: lesson })
}

// Get Create Page
const getCreateTopicPage = (req, res) => {
    res.render('createTopic.ejs')
}
const getCreateLessonPage = async (req, res) => {
    //let topics = await getAllTopics();
    let skills = await getAllSkills();
    //return res.render('createLesson.ejs', { listTopics: topics, listSkills: skills })
    return res.render('createLesson.ejs', { listSkills: skills })
}
const getCreateVoiceQuizPage = async (req, res) => {
    return res.render('createVoiceQuiz.ejs')
}
const getCreateMultipleChoiceQuizPage = async (req, res) => {
    return res.render('createMultipleChoiceQuiz.ejs')
}
const getCreateDescriptionQuizPage = async (req, res) => {
    return res.render('createDescriptionQuiz.ejs')
}
const getCreateLettersIntoWordsQuizPage = async (req, res) => {
    return res.render('createLettersIntoWordsQuiz.ejs')
}
const getCreateNormalQuizPage = async (req, res) => {
    let lesson = await getAllLessons();
    return res.render('createNormalQuiz.ejs', { listLessons: lesson })
}

// Post Create 
const postCreateTopic = async (req, res) => {
    let { name, Listening, Speaking, Reading, Writing, selectAll } = req.body;
    console.log('>>>>>>>>>>>>>>>>>>req.body<<<<<<<<<<<<<<<<<<', req.body);
    console.log('>>>>>>>>>>>>>>>>>>name<<<<<<<<<<<<<<<<<<', name);
    console.log('>>>>>>>>>>>>>>>>>>Listening<<<<<<<<<<<<<<<<<<', Listening);
    console.log('>>>>>>>>>>>>>>>>>>Speaking<<<<<<<<<<<<<<<<<<', Speaking);
    console.log('>>>>>>>>>>>>>>>>>>Reading<<<<<<<<<<<<<<<<<<', Reading);
    console.log('>>>>>>>>>>>>>>>>>>Writing<<<<<<<<<<<<<<<<<<', Writing);
    console.log('>>>>>>>>>>>>>>>>>>selectAll<<<<<<<<<<<<<<<<<<', selectAll);
    console.log('==========================================================');
    let skillList = [];
    if (!name) {
        return res.send("Please Enter Name!!!");
    }
    if (!Listening && !Speaking && !Reading && !Writing) {
        return res.send("Please Enter Skill!!!");
    } else {
        if (Listening) {
            skillList.push(1);
            console.log('>>>>>>>>>>>>>>>>>>Listening<<<<<<<<<<<<<<<<<<', Listening);
        }
        if (Speaking) {
            skillList.push(2);
            console.log('>>>>>>>>>>>>>>>>>>Speaking<<<<<<<<<<<<<<<<<<', Speaking);
        }
        if (Reading) {
            skillList.push(3);
            console.log('>>>>>>>>>>>>>>>>>>Reading<<<<<<<<<<<<<<<<<<', Reading);
        }
        if (Writing) {
            skillList.push(4);
            console.log('>>>>>>>>>>>>>>>>>>Writing<<<<<<<<<<<<<<<<<<', Writing);
        }
    }
    console.log('>>>>>>>>>>>>>>>>>>skillList<<<<<<<<<<<<<<<<<<', skillList);
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send("Please select an image to Create");
    }
    let photo = '';
    if (req.file.filename != null) {
        photo = req.file.filename;
    }
    await createTopic(name, photo);
    try {
        // getAll topic
        let topics = await getAllTopics();
        const lastItem = topics[topics.length - 1];
        const lastItemId = lastItem.id;
        console.log("ID của phần tử cuối cùng:", lastItemId);
        // getAll user
        let users = await getAllUsers();
        //
        for (let i = 0; i < skillList.length; i++) {
            await createSkillTopic(skillList[i], lastItemId);
            console.log(`Đã create SkillTopic với skill_id: ${skillList[i]} và topic_id: ${lastItemId}`);
            console.log('====================================================================================');
            for (let j = 0; j < users.length; j++) {
                // add data vào PROGRESS với user_id=user_id, skill_id=Skill_Topic[index].skill_id, topic_id=lastItemId, current_lesson=-1
                const user_id = users[j].email;
                await createProgress(user_id, skillList[i], lastItemId, -1);
                console.log(`Đã create PROGRESS với user_id: ${user_id}, skill_id: ${skillList[i]}, topic_id: ${lastItemId}, current_lesson: -1`);
                console.log('====================================================================================');
            }
        }
    } catch (error) {

    }
    res.redirect('/topic');
}
const postCreateLesson = async (req, res) => {
    let { name, topic_id, skill_name } = req.body;
    //let topic = await findTopicByName(topic_name);
    console.log('==========================name============================', name);
    console.log('==========================skill_name============================', skill_name);
    console.log('==========================topic_id============================', topic_id);
    let skillList = ['Listening', 'Speaking', 'Reading', 'Writing'];
    let skillId = skillList.indexOf(skill_name) + 1;
    console.log('==========================skillId============================', skillId);
    await createLesson(name, topic_id, skillId);
    res.redirect('/lesson');
}
const postCreateVoiceQuiz = async (req, res) => {
    let { answer, meaning } = req.body;
    // let lesson = await findLessonByName(lesson_name);
    // let lessonId = lesson.id;
    await createVoiceQuiz(answer, meaning);
    res.redirect('/voiceQuiz');
}
const postCreateMultipleChoiceQuiz = async (req, res) => {
    let { word_1, word_2, word_3, word_4, meaning, answer } = req.body;
    // let lesson = await findLessonByName(lesson_name);
    // let lessonId = lesson.id;
    await createMultipleChoiceQuiz(word_1, word_2, word_3, word_4, meaning, answer);
    res.redirect('/multipleChoiceQuiz');
}
const postCreateDescriptionQuiz = async (req, res) => {
    let { word_1, word_2, meaning, answer, description } = req.body;
    // let lesson = await findLessonByName(lesson_name);
    // let lessonId = lesson.id;
    await createDescriptionQuiz(word_1, word_2, meaning, answer, description);
    res.redirect('/descriptionQuiz');
}
const postCreateLettersIntoWordsQuiz = async (req, res) => {
    let { answer, meaning } = req.body;
    // let lesson = await findLessonByName(lesson_name);
    // let lessonId = lesson.id;
    await createLettersIntoWordsQuiz(answer, meaning);
    res.redirect('/lettersIntoWordsQuiz');
}
const postCreateNormalQuiz = async (req, res) => {
    let { word_1, word_2, word_3, word_4, meaning, answer, lesson_name } = req.body;
    let lesson = await findLessonByName(lesson_name);
    let lessonId = lesson.id;
    console.log(">>>>>>>>>>>>>>>>word_1<<<<<<<<<<<<<<<<<<<", word_1);
    console.log(">>>>>>>>>>>>>>>>word_2<<<<<<<<<<<<<<<<<<<", word_2);
    console.log(">>>>>>>>>>>>>>>>word_3<<<<<<<<<<<<<<<<<<<", word_3);
    console.log(">>>>>>>>>>>>>>>>word_4<<<<<<<<<<<<<<<<<<<", word_4);
    console.log(">>>>>>>>>>>>>>>>meaning<<<<<<<<<<<<<<<<<<<", meaning);
    console.log(">>>>>>>>>>>>>>>>answer<<<<<<<<<<<<<<<<<<<", answer);
    console.log(">>>>>>>>>>>>>>>>lessonId<<<<<<<<<<<<<<<<<<<", lessonId);
    await createNormalQuiz(word_1, word_2, word_3, word_4, meaning, answer, lessonId);
    res.redirect('/normalQuiz');
}

// Get Update Page
const getUpdateTopicPage = async (req, res) => {
    let topicId = req.params.id;
    let topic = await findTopicById(topicId);
    res.render('updateTopic.ejs', { topicUpdate: topic });
}
const getUpdateLessonPage = async (req, res) => {
    let lessonId = req.params.id;
    let lesson = await findLessonById(lessonId);
    let topic = await getAllTopics();
    res.render('updateLesson.ejs', { lessonUpdate: lesson, listTopics: topic });
}
const getUpdateVoiceQuizPage = async (req, res) => {
    let voiceQuizId = req.params.id;
    let voiceQuiz = await findVoiceQuizById(voiceQuizId);
    let lesson = await getAllLessons();
    res.render('updateVoiceQuiz.ejs', { voiceQuizUpdate: voiceQuiz, listLessons: lesson });
}
const getUpdateNormalQuizPage = async (req, res) => {
    let normalQuizId = req.params.id;
    let normalQuiz = await findNormalQuizById(normalQuizId);
    let lesson = await getAllLessons();
    res.render('updateNormalQuiz.ejs', { normalQuizUpdate: normalQuiz, listLessons: lesson });
}


// Post Update
const postUpdateTopic = async (req, res) => {
    let { name, topic, topicId } = req.body;
    [image] = await GetPhotoFromTopicById(topicId);
    oldPhoto = image.photo;
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        //[image] = await GetPhotoFromTopicById(topicId);
        photo = image.photo;
    }
    else {
        photo = req.file.filename;
    }
    console.log(">>> photo: ", photo)
    await updateTopicById(name, photo, topicId);
    if (oldPhoto != photo) {
        let link = '../DACN_BACKEND/src/public/images/topics/' + oldPhoto;
        fs.unlink(link, (err) => {
            if (err) {
                throw err;
            }
            console.log("Delete Image Topic successfully.");
        });
    }
    res.redirect('/topic');
}
const postUpdateLesson = async (req, res) => {
    let { lessonId, name, topic_name } = req.body;
    let topic = await findTopicByName(topic_name);
    let topicId = topic.id;
    console.log(">>>>>>>>>>>>>>>>lessonId<<<<<<<<<<<<<<<<<<<", lessonId);
    console.log(">>>>>>>>>>>>>>>>name<<<<<<<<<<<<<<<<<<<", name);
    console.log(">>>>>>>>>>>>>>>>topic_name<<<<<<<<<<<<<<<<<<<", topic_name);
    console.log(">>>>>>>>>>>>>>>>topicId<<<<<<<<<<<<<<<<<<<", topicId);
    await updateLessonById(name, lessonId);
    res.redirect('/lesson');
}
const postUpdateVoiceQuiz = async (req, res) => {
    let { voiceQuizId, answer, meaning } = req.body;
    // let lesson = await findLessonByName(lesson_name);
    // let lessonId = lesson.id;
    await updateVoiceQuizById(voiceQuizId, answer, meaning);
    res.redirect('/voiceQuiz');
}
const postUpdateNormalQuiz = async (req, res) => {
    let { normalQuizId, word_1, word_2, word_3, word_4, meaning, answer, lesson_name } = req.body;
    let lesson = await findLessonByName(lesson_name);
    let lessonId = lesson.id;
    console.log(">>>>>>>>>>>>>>>>word_1<<<<<<<<<<<<<<<<<<<", word_1);
    console.log(">>>>>>>>>>>>>>>>word_2<<<<<<<<<<<<<<<<<<<", word_2);
    console.log(">>>>>>>>>>>>>>>>word_3<<<<<<<<<<<<<<<<<<<", word_3);
    console.log(">>>>>>>>>>>>>>>>word_4<<<<<<<<<<<<<<<<<<<", word_4);
    console.log(">>>>>>>>>>>>>>>>meaning<<<<<<<<<<<<<<<<<<<", meaning);
    console.log(">>>>>>>>>>>>>>>>answer<<<<<<<<<<<<<<<<<<<", answer);
    console.log(">>>>>>>>>>>>>>>>lessonId<<<<<<<<<<<<<<<<<<<", lessonId);
    console.log(">>>>>>>>>>>>>>>>normalQuizId<<<<<<<<<<<<<<<<<<<", normalQuizId);
    await updateNormalQuizById(word_1, word_2, word_3, word_4, meaning, answer, lessonId, normalQuizId);
    res.redirect('/normalQuiz');
}


module.exports = {
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

}
