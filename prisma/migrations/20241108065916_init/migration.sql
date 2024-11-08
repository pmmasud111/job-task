-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstClientName" TEXT NOT NULL,
    "secondClientName" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'lorem ipsum dolor sit amet curn lorem ipsum',
    "comment" INTEGER NOT NULL DEFAULT 15,
    "clientCount" INTEGER NOT NULL DEFAULT 12
);

-- CreateTable
CREATE TABLE "files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL
);
