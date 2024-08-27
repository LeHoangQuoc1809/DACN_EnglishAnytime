const connection = require('../config/database');


// Get DATA
const getAllUsers = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM USER`);
    console.log("đã getAllUsers");
    return results;
}
const getAllSkills = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM SKILL`);
    console.log("đã getAllSkills");
    return results;
}
const getAllTopics = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM TOPIC`);
    console.log("đã getAllTopics");
    return results;
}
const getAllSkill_Topic = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM SKILL_TOPIC`);
    console.log("đã getAllSkill_Topic");
    return results;
}
const getTopicBySkillId = async (skillId) => {
    let [results, fields] = await connection.query(`SELECT topic.id,topic.name,topic.photo
    FROM topic JOIN skill_topic on topic.id=skill_topic.topic_id 
    WHERE skill_topic.skill_id=?;`, [skillId]);
    console.log("đã getTopicBySkillId");
    return results;
}
const getSkillByTopicId = async (topicId) => {
    let [results, fields] = await connection.query(`SELECT skill.id,skill.name
    FROM skill JOIN skill_topic on skill.id=skill_topic.skill_id 
    WHERE skill_topic.topic_id=?;`, [topicId]);
    console.log("đã getSkillByTopicId");
    return results;
}
const getAllTopicListening = async () => {
    let [results, fields] = await connection.query(`SELECT topic.id,topic.name,topic.photo
    FROM topic JOIN skill_topic on topic.id=skill_topic.topic_id 
    WHERE skill_topic.skill_id=1;`);
    console.log("đã getAllTopicListening");
    return results;
}
const getAllTopicSpeaking = async () => {
    let [results, fields] = await connection.query(`SELECT topic.id,topic.name,topic.photo
    FROM topic JOIN skill_topic on topic.id=skill_topic.topic_id 
    WHERE skill_topic.skill_id=2;`);
    console.log("đã getAllTopicSpeaking");
    return results;
}
const getAllTopicSpeakingUnduplicated = async () => {
    let [results, fields] = await connection.query(`SELECT * from topic
    WHERE topic.id in (SELECT DISTINCT lesson.topic_id 
                        FROM lesson 
                        WHERE lesson.skill_id = 2);`);
    console.log("đã getAllTopicSpeakingUnduplicated");
    return results;
}
const getAllTopicReading = async () => {
    let [results, fields] = await connection.query(`SELECT topic.id,topic.name,topic.photo
    FROM topic JOIN skill_topic on topic.id=skill_topic.topic_id 
    WHERE skill_topic.skill_id=3;`);
    console.log("đã getAllTopicReading");
    return results;
}
const getAllTopicWriting = async () => {
    let [results, fields] = await connection.query(`SELECT topic.id,topic.name,topic.photo
    FROM topic JOIN skill_topic on topic.id=skill_topic.topic_id 
    WHERE skill_topic.skill_id=4;`);
    console.log("đã getAllTopicWriting");
    return results;
}
const GetPhotoFromTopicById = async (topicId) => {
    let results = await connection.query(`SELECT photo  FROM TOPIC  WHERE id = ?`, [topicId]);
    let photo = results && results.length > 0 ? results[0] : {};
    console.log("đã GetPhotoFromTopicById");
    return photo;
}
const getAllLessons = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM LESSON`);
    console.log("đã getAllLessons");
    return results;
}
const getAllVoiceQuizs = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM VOICE_QUIZ`);
    console.log("đã getAllVoiceQuizs");
    return results;
}
const getAllMultipleChoiceQuizs = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM MULTIPLE_CHOICE_QUIZ`);
    console.log("đã getAllMultipleChoiceQuizs");
    return results;
}
const getAllDescriptionQuizs = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM DESCRIPTION_QUIZ`);
    console.log("đã getAllDescriptionQuizs");
    return results;
}
const getAllLettersIntoWordsQuizs = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM LETTERS_INTO_WORDS_QUIZ`);
    console.log("đã getAllLettersIntoWordsQuizs");
    return results;
}
const getAllNormalQuizs = async () => {
    let [results, fields] = await connection.query(`SELECT * FROM MULTIPLE_CHOICE_QUIZ`);
    console.log("đã getAllNormalQuizs");
    return results;
}
const getLessonByTopicId = async (topicId) => {
    let [results, fields] = await connection.query(`SELECT * FROM LESSON WHERE topic_id = ?`, [topicId]);
    console.log("đã getLessonByTopicId");
    return results;
}
const getLessonBySkillId = async (skillId) => {
    let [results, fields] = await connection.query(`SELECT * FROM LESSON WHERE skill_id = ?`, [skillId]);
    console.log("đã getLessonBySkillId");
    return results;
}
const getLessonByTopicId_SkillId = async (topicId, skillId) => {
    let [results, fields] = await connection.query(`SELECT * FROM LESSON WHERE topic_id = ? AND skill_id = ?`, [topicId, skillId]);

    console.log("đã getLessonByTopicId_SkillId");
    return results;
}
const getIDLessonByTopicId = async (topicId) => {
    let [results, fields] = await connection.query(`SELECT ID FROM LESSON WHERE topic_id = ?`, [topicId]);
    console.log("đã getIDLessonByTopicId");
    return results;
}
const getAllVoiceQuizByLessonId = async (lessonId) => {
    let [results, fields] = await connection.query(`SELECT voice_quiz.*
    FROM voice_quiz JOIN lesson_voice_quiz on voice_quiz.id = lesson_voice_quiz.voice_quiz_id
    WHERE lesson_voice_quiz.lesson_id=?`, [lessonId]);
    console.log("đã getAllVoiceQuizByLessonId");
    return results;
}
const getAllDescriptionQuizByLessonId = async (lessonId) => {
    let [results, fields] = await connection.query(`SELECT description_quiz.*
    FROM description_quiz JOIN lesson_description_quiz on description_quiz.id = lesson_description_quiz.description_quiz_id
    WHERE lesson_description_quiz.lesson_id=?`, [lessonId]);
    console.log("đã getAllDescriptionQuizByLessonId");
    return results;
}
const getAllMultipleChoiceQuizByLessonId = async (lessonId) => {
    let [results, fields] = await connection.query(`SELECT multiple_choice_quiz.*
    FROM multiple_choice_quiz JOIN lesson_multiple_choice_quiz on multiple_choice_quiz.id = lesson_multiple_choice_quiz.multiple_choice_quiz_id
     WHERE lesson_multiple_choice_quiz.lesson_id=?`, [lessonId]);
    console.log("đã getAllMultipleChoiceQuizByLessonId");
    return results;
}
const getAllLettersIntoWordsQuizByLessonId = async (lessonId) => {
    let [results, fields] = await connection.query(`SELECT letters_into_words_quiz.*
    FROM letters_into_words_quiz JOIN lesson_letters_into_words_quiz on letters_into_words_quiz.id = lesson_letters_into_words_quiz.letters_into_words_quiz_id
    WHERE lesson_letters_into_words_quiz.lesson_id=?`, [lessonId]);
    console.log("đã getAllLettersIntoWordsQuizByLessonId");
    return results;
}
const getNormalQuizByLessonId = async (lessonId) => {
    let [results, fields] = await connection.query(`SELECT * FROM MULTIPLE_CHOICE_QUIZ WHERE lesson_id  = ?`, [lessonId]);
    console.log("đã getNormalQuizByLessonId");
    return results;
}
const getUserByEmail = async (email) => {
    let [results] = await connection.query(`SELECT * FROM USER  WHERE email = ?`, [email]);
    let user = results && results.length > 0 ? results[0] : {};
    console.log("đã getUserByEmail");
    return user;
}
const getProgressByUserIDSkillIDTopicID = async (user_id, skill_id, topic_id) => {
    let [results] = await connection.query(`SELECT * FROM PROGRESS WHERE user_id=? AND skill_id=? AND topic_id=?`, [user_id, skill_id, topic_id]);
    let progress = results && results.length > 0 ? results[0] : {};
    console.log("đã getProgressByUserIDSkillIDTopicID");
    return progress;
}
const getProgressByCurrentLesson = async (current_lesson) => {
    let [results] = await connection.query(`SELECT * FROM PROGRESS WHERE current_lesson=?`, [current_lesson]);
    let progress = results && results.length > 0 ? results[0] : {};
    console.log("đã getProgressByCurrentLesson");
    return progress;
}
const getLastIdVoiceQuiz = async () => {
    let [results] = await connection.query(`SELECT id FROM voice_quiz ORDER BY id DESC LIMIT 1;`);
    let idLast = results && results.length > 0 ? results[0] : {};
    console.log("đã getLastIdVoiceQuiz");
    return idLast;
}
const getIdBatKyDenLastIdVoiceQuiz = async (id) => {
    let [results] = await connection.query(`SELECT id FROM voice_quiz WHERE id >=?`, [id]);
    //let idLast = results && results.length > 0 ? results[0] : {};
    console.log("đã getIdBatKyDenLastIdVoiceQuiz");
    return results;
}
// Find DATA
const findTopicByIdFromLesson = async (topicId) => {
    let [results, fields] = await connection.query(`SELECT * FROM LESSON WHERE topic_id = ?`, [topicId]);
    let topic = results && results.length > 0 ? results[0] : {};
    console.log("đã findTopicByIdFromLesson");
    return topic;
}
const findTopicById = async (topicId) => {
    let [results, fields] = await connection.query(`SELECT * FROM TOPIC  WHERE id = ?`, [topicId]);
    let topic = results && results.length > 0 ? results[0] : {};
    console.log("đã findTopicById");
    return topic;
}
const findTopicByName = async (topicName) => {
    let [results, fields] = await connection.query(`SELECT * FROM TOPIC  WHERE name = ?`, [topicName]);
    let topic = results && results.length > 0 ? results[0] : {};
    console.log("đã findTopicByName");
    return topic;
}
const findLessonById = async (lessonId) => {
    let [results, fields] = await connection.query(`SELECT * FROM LESSON  WHERE id = ?`, [lessonId]);
    let lesson = results && results.length > 0 ? results[0] : {};
    console.log("đã findLessonById");
    return lesson;
}
const findLessonByName = async (lessonName) => {
    let [results, fields] = await connection.query(`SELECT * FROM LESSON  WHERE name = ?`, [lessonName]);
    let lesson = results && results.length > 0 ? results[0] : {};
    console.log("đã findLessonByName");
    return lesson;
}
const findVoiceQuizById = async (voiceQuizId) => {
    let [results, fields] = await connection.query(`SELECT * FROM VOICE_QUIZ  WHERE id = ?`, [voiceQuizId]);
    let voiceQuiz = results && results.length > 0 ? results[0] : {};
    console.log("đã findVoiceQuizById");
    return voiceQuiz;
}
const findNormalQuizById = async (normalQuizId) => {
    let [results, fields] = await connection.query(`SELECT * FROM MULTIPLE_CHOICE_QUIZ  WHERE id = ?`, [normalQuizId]);
    let normalQuiz = results && results.length > 0 ? results[0] : {};
    console.log("đã findNormalQuizById");
    return normalQuiz;
}

// Create DATA
const createUser = async (email, full_name, password, photo) => {
    let [results, fields] = await connection.query(`INSERT INTO USER (email, full_name, password, photo) VALUES (?, ?, ?, ?)`,
        [email, full_name, password, photo]);
    console.log("đã createUser");
}
const createTopic = async (name, photo) => {
    let [results, fields] = await connection.query(`INSERT INTO TOPIC (name, photo) VALUES (?, ?)`, [name, photo]);
    console.log("đã createTopic");
}
const createLesson = async (name, topicId, skillId) => {
    let [results, fields] = await connection.query(`INSERT INTO LESSON (name, topic_id, skill_id) VALUES (?, ?, ?)`, [name, topicId, skillId]);
    console.log("đã createLesson");
}
const createVoiceQuiz = async (answer, meaning) => {
    let [results, fields] = await connection.query(`INSERT INTO VOICE_QUIZ (answer, meaning) VALUES (?, ?)`, [answer, meaning]);
    console.log("đã createVoiceQuiz");
}
const createMultipleChoiceQuiz = async (word_1, word_2, word_3, word_4, meaning, answer) => {
    let [results, fields] = await connection.query(`INSERT INTO MULTIPLE_CHOICE_QUIZ (word_1, word_2, word_3, word_4, meaning, answer) VALUES (?, ?, ?, ?, ?, ?)`, [word_1, word_2, word_3, word_4, meaning, answer]);
    console.log("đã createMultipleChoiceQuiz");
}
const createDescriptionQuiz = async (word_1, word_2, meaning, answer, description) => {
    let [results, fields] = await connection.query(`INSERT INTO DESCRIPTION_QUIZ (word_1, word_2, meaning, answer, description) VALUES (?, ?, ?, ?, ?)`,
        [word_1, word_2, meaning, answer, description]);
    console.log("đã createDescriptionQuiz");
}
const createLettersIntoWordsQuiz = async (answer, meaning) => {
    let [results, fields] = await connection.query(`INSERT INTO LETTERS_INTO_WORDS_QUIZ (answer, meaning) VALUES (?, ?)`,
        [answer, meaning]);
    console.log("đã createLettersIntoWordsQuiz");
}
const createNormalQuiz = async (word_1, word_2, word_3, word_4, meaning, answer, lessonId) => {
    let [results, fields] = await connection.query(`INSERT INTO MULTIPLE_CHOICE_QUIZ (word_1, word_2, word_3, word_4, meaning, answer, lesson_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [word_1, word_2, word_3, word_4, meaning, answer, lessonId]);
    console.log("đã createNormalQuiz");
}
const createProgress = async (user_id, skill_id, topic_id, current_lesson) => {
    let [results, fields] = await connection.query(`INSERT INTO PROGRESS (user_id, skill_id, topic_id, current_lesson) VALUES (?, ?, ?, ?)`,
        [user_id, skill_id, topic_id, current_lesson]);
    console.log("đã createProgress");
}
const createSkillTopic = async (skill_id, topic_id) => {
    let [results, fields] = await connection.query(`INSERT INTO SKILL_TOPIC (skill_id, topic_id) VALUES (?, ?)`,
        [skill_id, topic_id]);
    console.log("đã createSkillTopic");
}
const createLessonVoiceQuiz = async (lesson_id, voice_quiz_id) => {
    let [results, fields] = await connection.query(`INSERT INTO LESSON_VOICE_QUIZ (lesson_id, voice_quiz_id) VALUES (?, ?)`,
        [lesson_id, voice_quiz_id]);
    console.log("đã createLessonVoiceQuiz");
}
// Delete DATA
const deleteTopicById = async (topicId) => {
    let [results, fields] = await connection.query(`DELETE FROM TOPIC WHERE id = ?`, [topicId]);
    console.log("đã deleteTopicById");
}
const deleteProgressByTopicIc_SkillId = async (topicId, skillId) => {
    let [results, fields] = await connection.query(`DELETE FROM PROGRESS WHERE topic_id = ? AND skill_id = ?`, [topicId, skillId]);
    console.log("đã deleteProgressByTopicIc_SkillId");
}
const deleteSkill_TopicByTopicIc_SkillId = async (topicId, skillId) => {
    let [results, fields] = await connection.query(`DELETE FROM SKILL_TOPIC WHERE topic_id = ? AND skill_id = ?`, [topicId, skillId]);
    console.log("đã deleteSkill_TopicByTopicIc_SkillId");
}
const deleteLessonById = async (lessonId) => {
    let [results, fields] = await connection.query(`DELETE FROM LESSON WHERE id = ?`, [lessonId]);
    console.log("đã deleteLessonById");
}
const deleteVoiceQuizById = async (voiceQuizId) => {
    let [results, fields] = await connection.query(`DELETE FROM VOICE_QUIZ WHERE id = ?`, [voiceQuizId]);
    console.log("đã deleteVoiceQuizById");
}
const deleteVoiceQuizVoiceQuizfromLESSON_VOICE_QUIZById = async (id, lessonId) => {
    let [results, fields] = await connection.query(`DELETE FROM LESSON_VOICE_QUIZ WHERE voice_quiz_id = ? AND lesson_id=?`, [id, lessonId]);
    console.log("đã deleteVoiceQuizVoiceQuizfromLESSON_VOICE_QUIZById");
}
const deleteNormalQuizById = async (normalQuizId) => {
    let [results, fields] = await connection.query(`DELETE FROM MULTIPLE_CHOICE_QUIZ WHERE id = ?`, [normalQuizId]);
    console.log("đã deleteVoiceQuizById");
}


// Update DATA
const updateUserByEmail = async (email, full_name, fileName) => {
    let [results, fields] = await connection.query(`UPDATE USER SET full_name=?, photo=? WHERE email=?`,
        [full_name, fileName, email]);
    console.log("đã updateUserByEmail");
}
const updateUserPassword = async (email, new_password) => {
    let [results, fields] = await connection.query(`UPDATE USER SET password=? WHERE email=?`,
        [new_password, email]);
    console.log("đã updateUserPassword");
}
const updateTopicById = async (name, photo, topicId) => {
    let [results, fields] = await connection.query(`UPDATE TOPIC SET name=?, photo=? WHERE id=?`, [name, photo, topicId]);
    console.log("đã updateTopicById");
}
const updateLessonById = async (name, lessonId) => {
    let [results, fields] = await connection.query(`UPDATE LESSON SET name=? WHERE id=?`, [name, lessonId]);
    console.log("đã updateLessonById");
}
const updateVoiceQuizById = async (voiceQuizId, answer, meaning) => {
    let [results, fields] = await connection.query(`UPDATE VOICE_QUIZ SET answer=?, meaning=? WHERE id=?`, [answer, meaning, voiceQuizId]);
    console.log("đã updateVoiceQuizById");
}
const updateNormalQuizById = async (word_1, word_2, word_3, word_4, meaning, answer, lessonId, normalQuizId) => {
    let [results, fields] = await connection.query(`UPDATE MULTIPLE_CHOICE_QUIZ SET word_1=?, word_2=?, word_3=?, word_4=?, meaning=?, answer=?, lesson_id=? WHERE id=?`,
        [word_1, word_2, word_3, word_4, meaning, answer, lessonId, normalQuizId]);
    console.log("đã updateNormalQuizById");
}
const updateProgress = async (user_id, skill_id, topic_id, current_lesson) => {
    let [results, fields] = await connection.query(`UPDATE PROGRESS SET current_lesson=? WHERE user_id=? AND skill_id=? AND topic_id=?`,
        [current_lesson, user_id, skill_id, topic_id]);
    console.log("đã updateProgress");
}
const updateSkillTopic = async (skill_id, topic_id) => {
    // let [results, fields] = await connection.query(`UPDATE SKILL_TOPIC SET skill_id=?, topic_id=?`,
    //     [skill_id, topic_id]);
}

module.exports = {
    // Get DATA
    getAllUsers, getAllSkills, getAllTopics, getAllSkill_Topic, getTopicBySkillId, getSkillByTopicId, getAllTopicListening,
    getAllTopicSpeaking, getAllTopicSpeakingUnduplicated, getAllTopicReading, getAllTopicWriting, GetPhotoFromTopicById, getAllLessons,
    getAllVoiceQuizs, getAllMultipleChoiceQuizs, getAllDescriptionQuizs,
    getAllLettersIntoWordsQuizs, getAllNormalQuizs, getLessonByTopicId, getLessonBySkillId, getLessonByTopicId_SkillId,
    getIDLessonByTopicId, getAllVoiceQuizByLessonId, getAllDescriptionQuizByLessonId, getAllMultipleChoiceQuizByLessonId,
    getAllLettersIntoWordsQuizByLessonId, getNormalQuizByLessonId, getUserByEmail,
    getProgressByUserIDSkillIDTopicID, getProgressByCurrentLesson, getLastIdVoiceQuiz, getIdBatKyDenLastIdVoiceQuiz,

    // Find DATA
    findTopicByIdFromLesson, findTopicById, findTopicByName, findLessonById, findLessonByName, findVoiceQuizById, findNormalQuizById,

    // Create DATA
    createUser, createTopic, createLesson, createVoiceQuiz, createMultipleChoiceQuiz, createDescriptionQuiz, createLettersIntoWordsQuiz,
    createNormalQuiz, createProgress, createSkillTopic, createLessonVoiceQuiz,

    // Delete DATA
    deleteTopicById, deleteProgressByTopicIc_SkillId, deleteSkill_TopicByTopicIc_SkillId, deleteLessonById,
    deleteVoiceQuizById, deleteVoiceQuizVoiceQuizfromLESSON_VOICE_QUIZById, deleteNormalQuizById,

    // Update DATA
    updateUserByEmail, updateUserPassword, updateTopicById, updateLessonById, updateVoiceQuizById, updateNormalQuizById, updateProgress, updateSkillTopic

}