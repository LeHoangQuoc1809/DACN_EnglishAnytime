const connection = require('../config/database');
const fs = require('fs');
const fse = require('fs-extra');
const bcrypt = require('bcrypt');
const {
    // Get DATA
    getAllUsers, getAllSkills, getAllTopics, getAllSkill_Topic, getTopicBySkillId, getSkillByTopicId, getAllLessons,
    getAllVoiceQuizs,
    getLessonByTopicId, getLessonBySkillId, getLessonByTopicId_SkillId, getIDLessonByTopicId,
    getAllVoiceQuizByLessonId, getAllDescriptionQuizByLessonId, getAllMultipleChoiceQuizByLessonId,
    getAllLettersIntoWordsQuizByLessonId,
    getNormalQuizByLessonId,
    getUserByEmail, getProgressByUserIDSkillIDTopicID, getProgressByCurrentLesson, getLastIdVoiceQuiz, getIdBatKyDenLastIdVoiceQuiz,


    // Find DATA
    findTopicById, findTopicByIdFromLesson,

    // Create DATA
    createUser, createVoiceQuiz, createMultipleChoiceQuiz, createDescriptionQuiz, createLettersIntoWordsQuiz,
    createProgress, createSkillTopic, createLessonVoiceQuiz,

    // Delete DATA
    deleteTopicById, deleteProgressByTopicIc_SkillId, deleteSkill_TopicByTopicIc_SkillId, deleteLessonById,
    deleteVoiceQuizById, deleteVoiceQuizVoiceQuizfromLESSON_VOICE_QUIZById, deleteNormalQuizById,

    // Update DATA
    updateUserByEmail, updateUserPassword, updateProgress, updateSkillTopic


} = require('../services/CRUDService');
const { isNull } = require('util');
const { log } = require('console');


// Get DATA
const APIGetAllUsers = async (req, res) => {
    // http
    // 404 501
    // json/xml => object
    let results = await getAllUsers();
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllSkills = async (req, res) => {
    let results = await getAllSkills();
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllTopics = async (req, res) => {
    let results = await getAllTopics();
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetTopicBySkillId = async (req, res) => {
    let skillId = req.params.id;
    let results = await getTopicBySkillId(skillId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetSkillByTopicId = async (req, res) => {
    let topicId = req.params.id;
    let results = await getSkillByTopicId(topicId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllLessons = async (req, res) => {
    let results = await getAllLessons();
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllVoiceQuizs = async (req, res) => {
    let results = await getAllVoiceQuizs();
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetLessonByTopicId = async (req, res) => {
    let topicId = req.params.id;
    let results = await getLessonByTopicId(topicId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetLessonByTopicId_SkillId = async (req, res) => {
    let { topicId, skillId } = req.params;
    console.log('>>>>>>>>>>>>>>>>>>req.params<<<<<<<<<<<<<<<<<<', req.params);
    console.log('>>>>>>>>>>>>>>>>>>topicId<<<<<<<<<<<<<<<<<<', topicId);
    console.log('>>>>>>>>>>>>>>>>>>skillId<<<<<<<<<<<<<<<<<<', skillId);
    let results = await getLessonByTopicId_SkillId(topicId, skillId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllLessonsOfTopcId = async (req, res) => {
    let { topicId } = req.params;
    console.log('>>>>>>>>>>>>>>>>>>req.params<<<<<<<<<<<<<<<<<<', req.params);
    console.log('>>>>>>>>>>>>>>>>>>topicId<<<<<<<<<<<<<<<<<<', topicId);
    let results = await getLessonByTopicId(topicId);
    console.log('>>>>>>>>>>>>>>>>>>results<<<<<<<<<<<<<<<<<<', results);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllLessonsOfSkillId = async (req, res) => {
    let { skillId } = req.params;
    console.log('>>>>>>>>>>>>>>>>>>req.params<<<<<<<<<<<<<<<<<<', req.params);
    console.log('>>>>>>>>>>>>>>>>>>skillId<<<<<<<<<<<<<<<<<<', skillId);
    let results = await getLessonBySkillId(skillId);
    console.log('>>>>>>>>>>>>>>>>>>results<<<<<<<<<<<<<<<<<<', results);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetIDLessonByTopicId = async (req, res) => {
    let topicId = req.params.id;
    let results = await getIDLessonByTopicId(topicId);
    console.log('>>>>>>>>>>>>>>>>>>results<<<<<<<<<<<<<<<<<<', results);
    // results = [ { ID: 26 }, { ID: 27 }, { ID: 28 }, { ID: 29 }, { ID: 30 } ]
    let idList = results.map(item => item.ID);
    console.log('>>>>>>>>>>>>>>>>>>idList<<<<<<<<<<<<<<<<<<', idList);
    // idList = [ 26, 27, 28, 29, 30 ]
    return res.status(200).json({
        message: 'OK',
        data: idList
    })
}
const APIGetAllVoiceQuizByLessonId = async (req, res) => {
    let lessonId = req.params.id;
    let results = await getAllVoiceQuizByLessonId(lessonId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllDescriptionQuizByLessonId = async (req, res) => {
    let lessonId = req.params.id;
    let results = await getAllDescriptionQuizByLessonId(lessonId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllMultipleChoiceQuizByLessonId = async (req, res) => {
    let lessonId = req.params.id;
    let results = await getAllMultipleChoiceQuizByLessonId(lessonId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetAllLettersIntoWordsQuizByLessonId = async (req, res) => {
    let lessonId = req.params.id;
    let results = await getAllLettersIntoWordsQuizByLessonId(lessonId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetNormalQuizByLessonId = async (req, res) => {
    let lessonId = req.params.id;
    let results = await getNormalQuizByLessonId(lessonId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}
const APIGetUserForLogin = async (req, res) => {
    let { email, password } = req.query;
    console.log('>>>>>>>>>>>>>>>>>>email<<<<<<<<<<<<<<<<<<', email);
    console.log('>>>>>>>>>>>>>>>>>>password<<<<<<<<<<<<<<<<<<', password);
    if (!email || !password) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    let user = await getUserByEmail(email);
    console.log(">>>>>>>>>>>>user>>>>>>>>>>>>>>", user);
    console.log(">>>>>>>>>>>>user.password>>>>>>>>>>>>>>", user.password);
    try {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return res.status(200).json({
                message: 'OK',
                data: user
            })
        }
        else {
            return res.status(200).json({
                message: 'wrong Password or Email'
            })
        }
    } catch (error) {
        return res.status(200).json({
            message: 'wrong Password or Email'
        })
    }

}
const APIGetUserByEmail = async (req, res) => {
    let email = req.params.email;
    console.log('>>>>>>>>>>>>>>>>>>email<<<<<<<<<<<<<<<<<<', email);
    if (!email) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        let user = await getUserByEmail(email);
        console.log(">>>>>>>>>>>>user>>>>>>>>>>>>>>", user);
        if (Object.keys(user).length !== 0) {
            return res.status(200).json({
                message: 'OK',
                data: user
            })
        }
        else {
            return res.status(200).json({
                message: 'User does not exist'
            })
        }
    } catch (error) {
        return res.status(200).json({
            message: 'User does not exist'
        })
    }

}
const APIGetProgressByUserIDSkillIDTopicID = async (req, res) => {
    let { user_id, skill_id, topic_id } = req.query;
    console.log('>>>>>>>>>>>>>>>>>>user_id<<<<<<<<<<<<<<<<<<', user_id);
    console.log('>>>>>>>>>>>>>>>>>>skill_id<<<<<<<<<<<<<<<<<<', skill_id);
    console.log('>>>>>>>>>>>>>>>>>>topic_id<<<<<<<<<<<<<<<<<<', topic_id);
    if (!user_id || !skill_id || !topic_id) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        let progress = await getProgressByUserIDSkillIDTopicID(user_id, skill_id, topic_id);
        console.log(">>>>>>>>>>>>progress>>>>>>>>>>>>>>", progress);
        if (Object.keys(progress).length !== 0) {
            return res.status(200).json({
                message: 'OK',
                data: progress
            })
        }
        else {
            return res.status(200).json({
                message: 'Progress does not exist'
            })
        }
    } catch (error) {
        return res.status(200).json({
            message: 'Progress does not exist'
        })
    }

}
const APIGetProgressByCurrentLesson = async (req, res) => {
    let { current_lesson } = req.params;
    console.log('>>>>>>>>>>>>>>>>>>current_lesson<<<<<<<<<<<<<<<<<<', current_lesson);
    console.log('>>>>>>>>>>>>>>>>>>req.params<<<<<<<<<<<<<<<<<<', req.params);
    if (!current_lesson) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        let progress = await getProgressByCurrentLesson(current_lesson);
        console.log(">>>>>>>>>>>>progress>>>>>>>>>>>>>>", progress);
        if (Object.keys(progress).length !== 0) {
            return res.status(200).json({
                message: 'OK',
                data: progress
            })
        }
        else {
            return res.status(200).json({
                message: 'Progress does not exist',
                data: progress
            })
        }
    } catch (error) {
        return res.status(200).json({
            message: 'Progress does not exist',
            data: progress
        })
    }

}
// Find DATA
const APIFindTopicFromLesson = async (req, res) => {
    let topicId = req.params.id;
    if (!topicId) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    let results = await findTopicByIdFromLesson(topicId);
    return res.status(200).json({
        message: 'OK',
        data: results
    })
}


// Create DATA
const APICreateNewUser = async (req, res) => {
    let { email, full_name, password, photo } = req.body;
    console.log('>>>>>>>>>>>>>>>>>>email<<<<<<<<<<<<<<<<<<', email);
    console.log('>>>>>>>>>>>>>>>>>>full_name<<<<<<<<<<<<<<<<<<', full_name);
    console.log('>>>>>>>>>>>>>>>>>>password<<<<<<<<<<<<<<<<<<', password);
    console.log('>>>>>>>>>>>>>>>>>>photo<<<<<<<<<<<<<<<<<<', photo);
    console.log('>>>>>>>>>>>>>>>>>>req.body<<<<<<<<<<<<<<<<<<', req.body);
    const hash = await bcrypt.hash(password, 13);
    if (!email || !full_name || !hash || !photo) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        await createUser(email, full_name, hash, photo);
        // getAll Skill_Topic
        let Skill_Topic = await getAllSkill_Topic();
        console.log('>>>>>>>>>>>>>>>>>>Skill_Topic<<<<<<<<<<<<<<<<<<', Skill_Topic);
        console.log('>>>>>>>>>>>>>>>>>>Skill_Topic.length<<<<<<<<<<<<<<<<<<', Skill_Topic.length);
        // add data vào PROGRESS với user_id=email, skill_id=Skill_Topic[index].skill_id, topic_id=Skill_Topic[index].topic_id, current_lesson=-1
        for (let index = 0; index < Skill_Topic.length; index++) {
            console.log('>>>>>>>>>>>>>>>>>>user_id<<<<<<<<<<<<<<<<<<', email);
            console.log('>>>>>>>>>>>>>>>>>>skill_id<<<<<<<<<<<<<<<<<<', Skill_Topic[index].skill_id);
            console.log('>>>>>>>>>>>>>>>>>>topic_id<<<<<<<<<<<<<<<<<<', Skill_Topic[index].topic_id);
            console.log('>>>>>>>>>>>>>>>>>>current_lesson<<<<<<<<<<<<<<<<<<', -1);
            console.log('====================================================================================');
            await createProgress(email, Skill_Topic[index].skill_id, Skill_Topic[index].topic_id, -1);
            console.log(`Đã create PROGRESS với user_id: ${email}, skill_id: ${Skill_Topic[index].skill_id}, topic_id: ${Skill_Topic[index].id}, current_lesson: -1`);
        }
        //
        return res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(200).json({
            message: 'Email already exists'
        })
    }
}
const APICreateVoiceQuiz = async (req, res) => {
    let { data } = req.body;
    if (!data) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    let tieuDe = false;
    let err = false;
    data.forEach((item, index) => {
        if (index == 0) {
            if (item[0] || item[1]) {
                if (item[0] == 'answer' && item[1] == 'meaning') {
                    tieuDe = true;
                    return;
                }
            }
            else {
                err = true;
                return;
            }
        }
        else {
            if (!item[0] || !item[1]) {
                err = true;
                return;
            }
        }
    });
    if (!err && tieuDe) {
        try {
            await Promise.all(data.slice(1).map(async (item, index) => {
                if (item[0] || item[1]) {
                    await createVoiceQuiz(item[0], item[1]);
                }
            }));
            return res.status(200).json({
                message: 'OK'
            })
        } catch (error) {
            return res.status(200).json({
                message: 'ERROR'
            })
        }
    }
    else {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
}
const APICreateMultipleChoiceQuiz = async (req, res) => {
    let { data } = req.body;
    if (!data) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    let tieuDe = false;
    let err = false;
    data.forEach((item, index) => {
        if (index == 0) {
            if (item[0] || item[1] || item[2] || item[3] || item[4] || item[5]) {
                if (item[0] == 'word_1' && item[1] == 'word_2' && item[2] == 'word_3'
                    && item[3] == 'word_4' && item[4] == 'meaning' && item[5] == 'answer') {
                    tieuDe = true;
                    return
                }
            }
            else {
                err = true;
                return
            }
        }
        else {
            if (!item[0] || !item[1] || !item[2] || !item[3] || !item[4] || !item[5]) {
                err = true;
                return
            }
        }
    });
    if (!err && tieuDe) {
        try {
            await Promise.all(data.slice(1).map(async (item, index) => {
                if (item[0] || item[1] || item[2] || item[3] || item[4] || item[5]) {
                    await createMultipleChoiceQuiz(item[0], item[1], item[2], item[3], item[4], item[5]);
                }
            }));
            return res.status(200).json({
                message: 'OK'
            })
        } catch (error) {
            return res.status(200).json({
                message: 'ERROR'
            })
        }
    }
    else {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
}
const APICreateDescriptionQuiz = async (req, res) => {
    let { data } = req.body;
    if (!data) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    console.log(data);
    let tieuDe = false;
    let err = false;
    data.forEach((item, index) => {
        if (index == 0) {
            if (item[0] || item[1] || item[2] || item[3] || item[4]) {
                if (item[0] == 'word_1' && item[1] == 'word_2' && item[2] == 'meaning'
                    && item[3] == 'answer' && item[4] == 'description') {
                    tieuDe = true;
                    return
                }
            }
            else {
                err = true;
                return
            }
        }
        else {
            if (!item[0] || !item[1] || !item[2] || !item[3] || !item[4]) {
                err = true;
                return;
            }
        }
    });
    if (!err && tieuDe) {
        try {
            await Promise.all(data.slice(1).map(async (item, index) => {
                if (item[0] || item[1] || item[2] || item[3] || item[4]) {
                    await createDescriptionQuiz(item[0], item[1], item[2], item[3], item[4]);
                }
            }));
            return res.status(200).json({
                message: 'OK'
            })
        } catch (error) {
            return res.status(200).json({
                message: 'ERROR'
            })
        }
    }
    else {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
}
const APICreateLettersIntoWordsQuiz = async (req, res) => {
    let { data } = req.body;
    if (!data) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    let tieuDe = false;
    let err = false;
    data.forEach((item, index) => {
        if (index == 0) {
            if (item[0] || item[1]) {
                if (item[0] == 'answer' && item[1] == 'meaning') {
                    tieuDe = true;
                    return
                }
            }
            else {
                err = true;
                return
            }
        }
        else {
            if (!item[0] || !item[1]) {
                err = true;
                return;
            }
        }
    });
    if (!err && tieuDe) {
        try {
            await Promise.all(data.slice(1).map(async (item, index) => {
                if (item[0] || item[1]) {
                    await createLettersIntoWordsQuiz(item[0], item[1]);
                }
            }));
            return res.status(200).json({
                message: 'OK'
            })
        } catch (error) {
            return res.status(200).json({
                message: 'ERROR'
            })
        }
    }
    else {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
}
const APICreateLeesonVoiceQuiz = async (req, res) => {
    let { topicId, lessonId, data } = req.body;
    let idLast = await getLastIdVoiceQuiz();
    console.log('=======idLast======', idLast.id);
    if (!topicId || !lessonId || !data) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    let tieuDe = false;
    let err = false;
    data.forEach((item, index) => {
        if (index == 0) {
            if (item[0] || item[1]) {
                if (item[0] == 'answer' && item[1] == 'meaning') {
                    tieuDe = true;
                    return;
                }
            }
            else {
                err = true;
                return;
            }
        }
        else {
            if (!item[0] || !item[1]) {
                err = true;
                return;
            }
        }
    });
    if (!err && tieuDe) {
        try {
            await Promise.all(data.slice(1).map(async (item, index) => {
                if (item[0] || item[1]) {
                    await createVoiceQuiz(item[0], item[1]);
                }
            }));
            // chạy lần đầu tiên sẽ không có idLast.id
            console.log('======idLast.id=======', idLast.id);
            if (!idLast.id) {
                idLast.id = -1;
            }
            console.log('======idLast.id=======', idLast.id);
            console.log('=======lessonId======', lessonId);
            let list = await getIdBatKyDenLastIdVoiceQuiz(idLast.id + 1); // idLast.id
            // Danh sách chứa các ID
            var idList = [];
            // Lặp qua mảng các đối tượng và thêm ID vào danh sách
            list.forEach(function (obj) {
                idList.push(obj.id);
            });
            console.log('======idList=======', idList);
            await Promise.all(
                idList.map(async (item, index) => {
                    try {
                        console.log('======item=======', item);
                        await createLessonVoiceQuiz(lessonId, item);
                    } catch (error) {
                        // Xử lý lỗi ở đây, ví dụ:
                        console.error(`Error creating lesson for item ${item}:`, error);
                        // Trả về một giá trị null hoặc undefined để cho biết rằng lỗi đã được xử lý và tiếp tục chờ đợi các promise còn lại.
                        return null; // hoặc return undefined;
                    }
                })
            );
            // await Promise.all(idList.map(async (item, index) => {
            //     console.log('======item=======', item);
            //     await createLessonVoiceQuiz(lessonId, item);
            // }));
            return res.status(200).json({
                message: 'OK'
            })
        } catch (error) {
            return res.status(200).json({
                message: 'ERROR'
            })
        }
    }
    else {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
}


// Update DATA
const APIUpdateUserByEmail = async (req, res) => {
    let { email, full_name, photo } = req.body;
    console.log('>>>>>>>>>>>>>>>>>>email<<<<<<<<<<<<<<<<<<', email);
    console.log('>>>>>>>>>>>>>>>>>>full_name<<<<<<<<<<<<<<<<<<', full_name);
    console.log('>>>>>>>>>>>>>>>>>>photo<<<<<<<<<<<<<<<<<<', photo);
    // Tạo tên tập tin duy nhất
    const fileName = `user-${email}.jpg`;
    if (photo !== '') {
        // xử lý hình ảnh của user
        var realFile = Buffer.from(photo, "base64");
        // Xác định đường dẫn tập tin
        const filePath = `././src/public/images/users/${fileName}`;
        // Ghi dữ liệu vào tập tin
        fse.writeFileSync(filePath, realFile, "utf8");
    }
    if (!email || !full_name || !fileName) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        await updateUserByEmail(email, full_name, fileName);
        return res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(200).json({
            message: 'ERROR'
        })
    }
}
const APIUpdateUserPassword = async (req, res) => {
    let { email, current_password, new_password } = req.body;
    console.log('>>>>>>>>>>>>>>>>>>email<<<<<<<<<<<<<<<<<<', email);
    console.log('>>>>>>>>>>>>>>>>>>current_password<<<<<<<<<<<<<<<<<<', current_password);
    console.log('>>>>>>>>>>>>>>>>>>new_password<<<<<<<<<<<<<<<<<<', new_password);
    console.log('>>>>>>>>>>>>>>>>>>req.body<<<<<<<<<<<<<<<<<<', req.body);
    if (!email || !current_password || !new_password) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        let user = await getUserByEmail(email);
        console.log(">>>>>>>>>>>>user>>>>>>>>>>>>>>", user);
        if (Object.keys(user).length !== 0) {
            const isValid = await bcrypt.compare(current_password, user.password);
            if (isValid) {
                const hash = await bcrypt.hash(new_password, 13);
                console.log('>>>>>>>>>>>>>>>>>>hash<<<<<<<<<<<<<<<<<<', hash);
                await updateUserPassword(email, hash);
                return res.status(200).json({
                    message: 'OK',
                })
            }
            return res.status(200).json({
                message: 'Wrong Password'
            })
        }
        else {
            return res.status(200).json({
                message: 'User does not exist'
            })
        }
    } catch (error) {
        return res.status(200).json({
            message: 'ERROR'
        })
    }
}
const APIUpdateProgress = async (req, res) => {
    let { user_id, skill_id, topic_id, current_lesson } = req.body;
    console.log('>>>>>>>>>>>>>>>>>>user_id<<<<<<<<<<<<<<<<<<', user_id);
    console.log('>>>>>>>>>>>>>>>>>>skill_id<<<<<<<<<<<<<<<<<<', skill_id);
    console.log('>>>>>>>>>>>>>>>>>>topic_id<<<<<<<<<<<<<<<<<<', topic_id);
    console.log('>>>>>>>>>>>>>>>>>>current_lesson<<<<<<<<<<<<<<<<<<', current_lesson);
    console.log('>>>>>>>>>>>>>>>>>>req.body<<<<<<<<<<<<<<<<<<', req.body);
    if (!user_id || !skill_id || !topic_id || !current_lesson) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        await updateProgress(user_id, skill_id, topic_id, current_lesson);
        return res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(200).json({
            message: 'ERROR'
        })
    }

}
const APIUpdateSkillTopic = async (req, res) => {
    // let { user_id, topic_id, current_lesson } = req.body;
    // console.log('>>>>>>>>>>>>>>>>>>user_id<<<<<<<<<<<<<<<<<<', user_id);
    // console.log('>>>>>>>>>>>>>>>>>>topic_id<<<<<<<<<<<<<<<<<<', topic_id);
    // console.log('>>>>>>>>>>>>>>>>>>current_lesson<<<<<<<<<<<<<<<<<<', current_lesson);
    // console.log('>>>>>>>>>>>>>>>>>>req.body<<<<<<<<<<<<<<<<<<', req.body);
    // if (!user_id || !topic_id || !current_lesson) {
    //     return res.status(200).json({
    //         message: 'Missing required params'
    //     })
    // }
    try {
        // getAll skill
        let skills = await getAllSkills();
        // getAll topic
        let topics = await getAllTopics();
        // add data vào SKILL_TOPIC với skill_id=skills[index].id, topic_id=topics[i].id
        for (let index = 0; index < skills.length; index++) {
            for (let i = 0; i < topics.length; i++) {
                skill_id = skills[index].id;
                topic_id = topics[i].id;
                console.log('>>>>>>>>>>>>>>>>>>skill_id<<<<<<<<<<<<<<<<<<', skill_id);
                console.log('>>>>>>>>>>>>>>>>>>topic_id<<<<<<<<<<<<<<<<<<', topic_id);
                await createSkillTopic(skill_id, topic_id);
            }
            console.log('>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<');
        }
        //
        return res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(200).json({
            message: 'ERROR'
        })
    }

}
const APIUpdateChangeSkill = async (req, res) => {
    let { topicId, skillListOld, skills } = req.body;
    console.log('>>>>>>>>>>>>>>>>>>topicId<<<<<<<<<<<<<<<<<<', topicId);
    console.log('>>>>>>>>>>>>>>>>>>skillListOld<<<<<<<<<<<<<<<<<<', skillListOld);
    console.log('>>>>>>>>>>>>>>>>>>skills<<<<<<<<<<<<<<<<<<', skills);
    console.log('>>>>>>>>>>>>>>>>>>req.body<<<<<<<<<<<<<<<<<<', req.body);
    // tạo danh sách skill id cũ
    // Parse chuỗi JSON thành một mảng đối tượng
    const skillList = JSON.parse(skillListOld);
    // Sử dụng Array.map() để trích xuất danh sách các ID
    const idListOld = skillList.map(skill => skill.id);
    console.log('>>>>>>>>>>>>>>>>>>idListOld<<<<<<<<<<<<<<<<<<', idListOld);
    // tạo danh sách skill id mới
    const idListNew = [];
    if (skills) {
        if (typeof skills === 'string') {
            if (skills == 'Listening') {
                idListNew.push(1);
            } else if (skills == 'Speaking') {
                idListNew.push(2);
            } else if (skills == 'Reading') {
                idListNew.push(3);
            } else if (skills == 'Writing') {
                idListNew.push(4);
            }
        } else {
            skills.forEach((skill, index) => {
                if (skill == 'Listening') {
                    idListNew.push(1);
                } else if (skill == 'Speaking') {
                    idListNew.push(2);
                } else if (skill == 'Reading') {
                    idListNew.push(3);
                } else if (skill == 'Writing') {
                    idListNew.push(4);
                }
            });
        }
    }
    console.log('>>>>>>>>>>>>>>>>>>idListNew<<<<<<<<<<<<<<<<<<', idListNew);

    if (idListOld.length == 0 && idListNew.length == 0) {
        // không chọn thì không change
        console.log('không chọn thì không change');
    } else if (idListOld.length == 0 && idListNew.length > 0) {
        // thêm skill cho topic
        console.log('thêm skill cho topic');
        try {
            let users = await getAllUsers();
            for (let index = 0; index < idListNew.length; index++) {
                // thêm dòng dữ liệu đó trong bảng SKILL_TOPIC
                await createSkillTopic(idListNew[index], topicId);
                console.log(`Đã thêm SKILL_TOPIC với skill_id: ${idListNew[index]} và topic_id: ${topicId}`);
                for (let i = 0; i < users.length; i++) {
                    await createProgress(users[i].email, idListNew[index], topicId, -1);
                    console.log(`Đã create PROGRESS với user_id: ${users[i].email}, skill_id: ${idListNew[index]}, topic_id: ${topicId}, current_lesson: -1`);
                }
            }
            return res.status(200).json({
                message: 'OK'
            })
        } catch (error) {
            return res.status(200).json({
                message: 'ERROR'
            })
        }
    } else if (idListOld.length > 0 && idListNew.length == 0) {
        // xóa skill cho topic 
        console.log('xóa skill cho topic');
        try {
            for (let index = 0; index < idListOld.length; index++) {
                // xóa dòng dữ liệu đó tại bảng SKILL_TOPIC
                await deleteProgressByTopicIc_SkillId(topicId, idListOld[index]);
                console.log(`Đã xóa PROGRESS với topic_id: ${topicId}, skill_id: ${idListOld[index]}`);
                await deleteSkill_TopicByTopicIc_SkillId(topicId, idListOld[index]);
                console.log(`Đã xóa SKILL_TOPIC với skill_id: ${idListOld[index]} và topic_id: ${topicId}`);
            }
            return res.status(200).json({
                message: 'OK'
            })
        } catch (error) {
            return res.status(200).json({
                message: 'ERROR'
            })
        }
    } else if (idListOld.length > idListNew.length || idListOld.length < idListNew.length || idListOld.length == idListNew.length) {
        // thay đổi: có thể thêm hoặc xóa hoặc vừa thêm vừa xóa hoặc không làm gì cả
        console.log('thay đổi có thể thêm hoặc xóa hoặc vừa thêm vừa xóa hoặc không làm gì cả');
        try {
            let users = await getAllUsers();
            for (let index = 0; index < idListNew.length; index++) {
                if (!idListOld.includes(idListNew[index])) {
                    await createSkillTopic(idListNew[index], topicId);
                    console.log(`Đã thêm SKILL_TOPIC với skill_id: ${idListNew[index]} và topic_id: ${topicId}`);
                    for (let i = 0; i < users.length; i++) {
                        await createProgress(users[i].email, idListNew[index], topicId, -1);
                        console.log(`Đã create PROGRESS với user_id: ${users[i].email}, skill_id: ${idListNew[index]}, topic_id: ${topicId}, current_lesson: -1`);
                    }
                }
            }
            for (let index = 0; index < idListOld.length; index++) {
                if (!idListNew.includes(idListOld[index])) {
                    await deleteProgressByTopicIc_SkillId(topicId, idListOld[index]);
                    console.log(`Đã xóa PROGRESS với topic_id: ${topicId}, skill_id: ${idListOld[index]}`);
                    await deleteSkill_TopicByTopicIc_SkillId(topicId, idListOld[index]);
                    console.log(`Đã xóa SKILL_TOPIC với skill_id: ${idListOld[index]} và topic_id: ${topicId}`);
                }
            }
            return res.status(200).json({
                message: 'OK'
            })
        } catch (error) {
            return res.status(200).json({
                message: 'ERROR'
            })
        }
    }
}
// Delete DATA
const APIDeleteTopicFromSkill_TopicByTopicId_SkillId = async (req, res) => {
    let { topicId, skillId } = req.params;
    let skillList = ['Listening', 'Speaking', 'Reading', 'Writing'];
    let skillName = skillList[skillId - 1];
    console.log('>>>>>>>>>>>>>>>>>>topicId<<<<<<<<<<<<<<<<<<', topicId);
    console.log('>>>>>>>>>>>>>>>>>>skillId<<<<<<<<<<<<<<<<<<', skillId);
    console.log('>>>>>>>>>>>>>>>>>>skillList<<<<<<<<<<<<<<<<<<', skillList);
    console.log('>>>>>>>>>>>>>>>>>>skillName<<<<<<<<<<<<<<<<<<', skillName);
    let topic = await findTopicById(topicId);
    let photo = topic.photo;
    let link = '../DACN_BACKEND/src/public/images/topics/' + photo;
    console.log('>>>>>>>>>>>>>>>>>>link<<<<<<<<<<<<<<<<<<', link);
    if (!topicId || !skillId) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        let lesson = await getLessonByTopicId_SkillId(topicId, skillId);
        console.log('>>>>>>>>>>>>>>>>>>lesson<<<<<<<<<<<<<<<<<<', lesson);
        if (lesson.length == 0) {
            console.log('>>>>>>>>>>>>>>>>>>lesson.length<<<<<<<<<<<<<<<<<<', lesson.length);
            // tức là không tồn tại dòng dữ liệu tại bảng LESSON, có thể xóa được
            // xóa dòng dữ liệu đó tại bảng PROGRESS
            await deleteProgressByTopicIc_SkillId(topicId, skillId);
            // xóa dòng dữ liệu đó tại bảng SKILL_TOPIC
            await deleteSkill_TopicByTopicIc_SkillId(topicId, skillId);
            console.log(`Đã xóa topic: ${topicId} ra khỏi skill: ${skillId}`);
            return res.status(200).json({
                message: `Đã xóa ${topic.name} ra khỏi ${skillName}`
            });
        }
        else {
            console.log('>>>>>>>>>>>>>>>>>>Có bài học làm sao xóa<<<<<<<<<<<<<<<<<<');
            return res.status(500).json({
                message: `Không thể xóa ${topic.name} ra khỏi ${skillName} vì đã tồn tại bài học`
            });
        }
        // await deleteTopicById(topicId);
        // // delete image from images
        // fs.unlink(link, (err) => {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log("Delete File successfully.");
        // });
        // return res.status(200).json({
        //     message: 'OK'
        // })
    } catch (error) {
        return res.status(500).json({
            message: `Không thể xóa ${topic.name} ra khỏi ${skillName} vì đã tồn tại bài học`
        });
    }
}
const APIDeleteProgressByTopicId_SkillId = async (req, res) => {
    let { topicId, skillId } = req.params;
    console.log('>>>>>>>>>>>>>>>>>>topicId<<<<<<<<<<<<<<<<<<', topicId);
    console.log('>>>>>>>>>>>>>>>>>>skillId<<<<<<<<<<<<<<<<<<', skillId);
    let topic = await findTopicById(topicId);
    let photo = topic.photo;
    let link = '../DACN_BACKEND/src/public/images/topics/' + photo;
    console.log('>>>>>>>>>>>>>>>>>>link<<<<<<<<<<<<<<<<<<', link);
    if (!topicId || !skillId) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        let lesson = await getLessonByTopicId_SkillId(topicId, skillId);
        console.log('>>>>>>>>>>>>>>>>>>lesson<<<<<<<<<<<<<<<<<<', lesson);
        if (lesson.length == 0) {
            // tức là không tồn tại dòng dữ liệu tại bảng LESSON, có thể xóa được
            // xóa dòng dữ liệu đó tại bảng PROGRESS


        }
        else {

        }
        // await deleteTopicById(topicId);
        // // delete image from images
        // fs.unlink(link, (err) => {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log("Delete File successfully.");
        // });
        // return res.status(200).json({
        //     message: 'OK'
        // })
    } catch (error) {
        return res.status(500).json({
            message: "Could not delete TOPIC with id=" + topicId
        });
    }
}
const APIDeleteLessonById = async (req, res) => {
    let lessonId = req.params.id;
    if (!lessonId) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        let progress = await getProgressByCurrentLesson(lessonId);
        console.log('>>>>>>>>>>>>>>>>>>progress<<<<<<<<<<<<<<<<<<', progress);
        if (Object.keys(progress).length == 0) {
            await deleteLessonById(lessonId);
            return res.status(200).json({
                message: 'OK'
            })
        }
        else {
            return res.status(500).json({
                message: "Could not delete LESSON with id=" + lessonId
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Could not delete LESSON with id=" + lessonId
        });
    }
}
const APIDeleteVoiceQuizById = async (req, res) => {
    let voiceQuizId = req.params.id;
    console.log(">>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<", voiceQuizId);
    if (!voiceQuizId) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        await deleteVoiceQuizById(voiceQuizId);
        return res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(500).json({
            message: "Could not delete VOICE QUIZ with id=" + voiceQuizId
        });
    }
}
const APIDeleteVoiceQuizfromLESSON_VOICE_QUIZById_lessonId = async (req, res) => {
    const { id, lessonId } = req.params;
    console, log('====id======', id)
    console, log('====lessonId======', lessonId)
    if (!lessonId || !id) {
        return res.status(400).json({
            message: 'Missing required params'
        })
    }
    try {
        await deleteVoiceQuizVoiceQuizfromLESSON_VOICE_QUIZById(id, lessonId);
        return res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(500).json({
            message: "Could not delete VOICE QUIZ with id=" + voiceQuizId
        });
    }
}
const APIDeleteNormalQuizById = async (req, res) => {
    let normalQuizId = req.params.id;
    console.log(">>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<", normalQuizId);
    if (!normalQuizId) {
        return res.status(200).json({
            message: 'Missing required params'
        })
    }
    try {
        await deleteNormalQuizById(normalQuizId);
        return res.status(200).json({
            message: 'OK'
        })
    } catch (error) {
        return res.status(500).json({
            message: "Could not delete NORMAL QUIZ with id=" + normalQuizId
        });
    }
}




module.exports = {
    // Get DATA
    APIGetAllUsers, APIGetAllSkills, APIGetAllTopics, APIGetTopicBySkillId, APIGetSkillByTopicId, APIGetAllLessons, APIGetAllVoiceQuizs,
    APIGetLessonByTopicId, APIGetLessonByTopicId_SkillId, APIGetAllLessonsOfTopcId, APIGetAllLessonsOfSkillId, APIGetIDLessonByTopicId,
    APIGetAllVoiceQuizByLessonId, APIGetAllDescriptionQuizByLessonId, APIGetAllMultipleChoiceQuizByLessonId,
    APIGetAllLettersIntoWordsQuizByLessonId, APIGetNormalQuizByLessonId,
    APIGetUserForLogin, APIGetUserByEmail, APIGetProgressByUserIDSkillIDTopicID, APIGetProgressByCurrentLesson,

    // Find DATA
    APIFindTopicFromLesson,

    // Create DATA
    APICreateNewUser, APICreateVoiceQuiz, APICreateMultipleChoiceQuiz, APICreateDescriptionQuiz, APICreateLettersIntoWordsQuiz,
    APICreateLeesonVoiceQuiz,

    // Update DATA
    APIUpdateUserByEmail, APIUpdateUserPassword, APIUpdateProgress, APIUpdateSkillTopic, APIUpdateChangeSkill,

    // Delete DATA
    APIDeleteTopicFromSkill_TopicByTopicId_SkillId, APIDeleteProgressByTopicId_SkillId, APIDeleteLessonById,
    APIDeleteVoiceQuizById, APIDeleteVoiceQuizfromLESSON_VOICE_QUIZById_lessonId, APIDeleteNormalQuizById,

}