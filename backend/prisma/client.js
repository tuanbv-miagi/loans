const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // log truy vấn cực rõ
});

module.exports = prisma;
