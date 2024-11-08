-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstClientName" TEXT NOT NULL,
    "secondClientName" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'lorem ipsum dolor sit amet curn lorem ipsum',
    "comment" INTEGER NOT NULL DEFAULT 15,
    "clientCount" INTEGER NOT NULL DEFAULT 12,
    "status" TEXT NOT NULL DEFAULT 'incomplete'
);
INSERT INTO "new_Task" ("clientCount", "comment", "description", "firstClientName", "id", "secondClientName") SELECT "clientCount", "comment", "description", "firstClientName", "id", "secondClientName" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
