-- Database Schema definition for GDVerse

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    college VARCHAR(150),
    bio TEXT,
    skills VARCHAR(255),
    overall_score INT DEFAULT 70,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS topics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    duration VARCHAR(50),
    max_participants INT DEFAULT 6,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS discussion_rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic_id BIGINT,
    room_name VARCHAR(100) NOT NULL,
    duration INT DEFAULT 15,
    max_participants INT DEFAULT 6,
    is_public BOOLEAN DEFAULT TRUE,
    password VARCHAR(50),
    ai_moderator BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES topics(id)
);

CREATE TABLE IF NOT EXISTS performance_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    topic_name VARCHAR(255) NOT NULL,
    duration_spent VARCHAR(50),
    speakers_count INT,
    score INT NOT NULL,
    badge_awarded VARCHAR(100),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS ai_feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    history_id BIGINT NOT NULL,
    grammar_score INT NOT NULL,
    fluency_score INT NOT NULL,
    relevance_score INT NOT NULL,
    vocabulary_score INT NOT NULL,
    strengths TEXT,
    weaknesses TEXT,
    corrections TEXT,
    improvement_tips TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (history_id) REFERENCES performance_history(id)
);
