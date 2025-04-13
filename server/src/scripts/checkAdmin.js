const { User } = require("../models");

async function checkAdmin() {
  try {
    const admin = await User.findOne({
      where: {
        username: "jovid12",
      },
    });

    if (admin) {
      console.log("Admin user found:", {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      });
    } else {
      console.log("Admin user not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

checkAdmin();
