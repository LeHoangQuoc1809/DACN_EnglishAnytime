DROP SCHEMA IF EXISTS `EnglishAnytime`;

CREATE SCHEMA IF NOT EXISTS `EnglishAnytime` DEFAULT CHARACTER SET utf8mb4;

USE `EnglishAnytime`;

-- Kỹ năng
CREATE TABLE SKILL (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(50)
);

-- Chủ đề
CREATE TABLE TOPIC (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(255),
photo varchar(255)
);

-- Kỹ năng - Chủ đề
CREATE TABLE SKILL_TOPIC  (
skill_id int NOT NULL,
topic_id int NOT NULL,
PRIMARY KEY(skill_id, topic_id)
);

-- Bài học
CREATE TABLE LESSON  (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(255),
topic_id int,
skill_id int
);

-- Người dùng
CREATE TABLE USER (
email varchar(100) NOT NULL PRIMARY KEY,
full_name varchar(255),
password varchar(255),
photo varchar(255)
);

-- Quá trình
CREATE TABLE TOPIC_PROGRESS  (
user_id varchar(100) NOT NULL,
topic_id int NOT NULL,
current_lesson int,
PRIMARY KEY(user_id, topic_id)
);

-- Câu hỏi
CREATE TABLE VOICE_QUIZ  (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
answer varchar(255),
meaning varchar(255)
);

-- Câu hỏi 
CREATE TABLE MULTIPLE_CHOICE_QUIZ  (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
word_1 varchar(255),
word_2 varchar(255),
word_3 varchar(255),
word_4 varchar(255),
meaning varchar(255),
answer int
);

-- Bài học - Câu hỏi
CREATE TABLE LESSON_VOICE_QUIZ  (
lesson_id int NOT NULL,
voice_quiz_id int NOT NULL,
PRIMARY KEY(lesson_id, voice_quiz_id)
);

CREATE TABLE LESSON_MULTIPLE_CHOICE_QUIZ  (
lesson_id int NOT NULL,
multiple_choice_quiz_id int NOT NULL,
PRIMARY KEY(lesson_id, multiple_choice_quiz_id)
);

ALTER TABLE SKILL_TOPIC 
ADD CONSTRAINT SKILL_TOPIC_skill_id_id FOREIGN KEY (skill_id) REFERENCES SKILL(id);

ALTER TABLE SKILL_TOPIC 
ADD CONSTRAINT SKILL_TOPIC_topic_id_id FOREIGN KEY (topic_id) REFERENCES TOPIC(id);

ALTER TABLE LESSON
ADD CONSTRAINT LESSON_topic_id_id FOREIGN KEY (topic_id) REFERENCES TOPIC(id);

ALTER TABLE LESSON
ADD CONSTRAINT LESSON_skill_id_id FOREIGN KEY (skill_id) REFERENCES SKILL(id);

ALTER TABLE TOPIC_PROGRESS
ADD CONSTRAINT TOPIC_PROGRESS_user_id_email FOREIGN KEY (user_id) REFERENCES USER(email);

ALTER TABLE TOPIC_PROGRESS
ADD CONSTRAINT TOPIC_PROGRESS_topic_id_id FOREIGN KEY (topic_id) REFERENCES TOPIC(id);

ALTER TABLE LESSON_VOICE_QUIZ 
ADD CONSTRAINT LESSON_VOICE_QUIZ_lesson_id_id FOREIGN KEY (lesson_id) REFERENCES LESSON(id);

ALTER TABLE LESSON_VOICE_QUIZ 
ADD CONSTRAINT LESSON_VOICE_QUIZ_voice_quiz_id_id FOREIGN KEY (voice_quiz_id) REFERENCES VOICE_QUIZ(id);

ALTER TABLE LESSON_MULTIPLE_CHOICE_QUIZ 
ADD CONSTRAINT LESSON_MULTIPLE_CHOICE_QUIZ_lesson_id_id FOREIGN KEY (lesson_id) REFERENCES LESSON(id);

ALTER TABLE LESSON_MULTIPLE_CHOICE_QUIZ 
ADD CONSTRAINT LESSON_MULTIPLE_CHOICE_QUIZ_multiple_choice_quiz_id_id FOREIGN KEY (multiple_choice_quiz_id) REFERENCES MULTIPLE_CHOICE_QUIZ(id);

INSERT INTO SKILL (name) VALUES
	 ('Listening'),
	 ('Speaking'),
	 ('Reading'),
	 ('Writing');

INSERT INTO TOPIC (name,photo) VALUES
	 ('Thể thao','topic-1703104872137.jpeg'),
	 ('Biển','topic-1703104897367.jpeg'),
	 ('Nhà Trọ','topic-1703104921356.jpeg'),
	 ('Vũ trụ','topic-1703104928825.jpg'),
	 ('Trải nghiệm trong quá khứ','topic-1703104936332.jpeg'),
	 ('Thương mại','topic-1703104943731.jpg'),
	 ('Quốc gia & Ngôn ngữ','topic-1703104951904.jpg'),
	 ('Đồ vật & Số đếm','topic-1703104963782.jpg'),
	 ('Ăn & Uống','topic-1703104973780.jpg'),
	 ('Thời gian & Lịch','topic-1703104981692.png'),
	 ('Du lịch','topic-1703104990707.jpg'),
	 ('Trường học','topic-1703105003083.jpg'),
	 ('Nhà ở','topic-1703105014604.jpg'),
	 ('Động vật','topic-1703105022707.jpg'),
	 ('Lãng mạng','topic-1703105030269.jpg'),
	 ('Khách sạn','topic-1703105037460.jpg'),
	 ('Giao thông công cộng','topic-1703105046837.jpg'),
	 ('Mua sắm','topic-1703105055709.jpg'),
	 ('Nhà hàng','topic-1703105067173.jpg'),
	 ('Trò chơi','topic-1703105076380.png'),
	 ('Giải trí','topic-1703105085164.jpg');
