-- CreateTable
CREATE TABLE "Answer" (
    "AnswerText" TEXT NOT NULL,
    "SurveyID" INTEGER NOT NULL,
    "UserID" INTEGER NOT NULL,
    "QuestionID" INTEGER NOT NULL,

    PRIMARY KEY ("SurveyID", "UserID", "QuestionID")
);

-- CreateTable
CREATE TABLE "Question" (
    "questiontext" TEXT NOT NULL,
    "questionid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Survey" (
    "SurveyID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Description" TEXT
);
