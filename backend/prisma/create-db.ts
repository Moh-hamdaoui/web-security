import fs from "node:fs";
import path from "node:path";
import initSqlJs from "sql.js";

const dbPath = path.join(process.cwd(), "prisma", "dev.db");

async function main() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE "User" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "email" TEXT NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "displayName" TEXT NOT NULL,
      "phone" TEXT,
      "role" TEXT NOT NULL DEFAULT 'customer',
      "isAdmin" BOOLEAN NOT NULL DEFAULT false,
      "internalNote" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL
    );

    CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

    CREATE TABLE "Vehicle" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "ownerId" INTEGER NOT NULL,
      "brand" TEXT NOT NULL,
      "model" TEXT NOT NULL,
      "plateNumber" TEXT NOT NULL,
      "vin" TEXT NOT NULL,
      "mileage" INTEGER NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL,
      CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );

    CREATE TABLE "RepairOrder" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "userId" INTEGER NOT NULL,
      "vehicleId" INTEGER NOT NULL,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "status" TEXT NOT NULL,
      "totalPrice" REAL NOT NULL,
      "internalStatus" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL,
      CONSTRAINT "RepairOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
      CONSTRAINT "RepairOrder_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );

    CREATE TABLE "Note" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "body" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE "Comment" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "orderId" INTEGER NOT NULL,
      "userId" INTEGER NOT NULL,
      "content" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Comment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RepairOrder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
      CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
    );
  `);

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  fs.writeFileSync(dbPath, Buffer.from(db.export()));
  db.close();
}

main();
