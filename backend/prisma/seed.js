const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding user...");

  // Kiểm tra user tồn tại
  const exists = await prisma.user.findFirst({
    where: { email: "admin@gmail.com" }
  });

  if (exists) {
    console.log("User admin đã tồn tại, bỏ qua seeding.");
    return;
  }

  const hashedPwd = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      userName: "admin",
      fullName: "Administrator",
      spamZalo: 0,
      email: "admin@gmail.com",
      password: hashedPwd,
      role: 1,
      status: 0,
      avatarUrl: "",
    },
  });

  console.log("======Đã tạo tài khoản admin thành công=======");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });