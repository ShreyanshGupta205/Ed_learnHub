const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const prisma = new PrismaClient()

async function main() {
  const password = "Password123!"
  const hashed = await bcrypt.hash(password, 10)

  const student = await prisma.user.upsert({
    where: { email: "student1@example.com" },
    update: { role: "student", password: hashed, name: "Student Demo" },
    create: {
      name: "Student Demo",
      email: "student1@example.com",
      role: "student",
      password: hashed,
    },
  })

  console.log("✅ Student account successfully created/updated!")
  console.log("Email:", student.email)
  console.log("Password:", password)
}

main().catch(console.error).finally(() => prisma.$disconnect())
