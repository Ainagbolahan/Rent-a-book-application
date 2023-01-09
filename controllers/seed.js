const bcrypt = require("bcryptjs");

const { User } = require("../models/user.model");

const seedSuperAdmin = async () => {
    const superAdmin = await User.findOne({ email: "superadmingee@gmail.com",
    });
    
    if (superAdmin) {
        return console.log("Admin super admin already created");
        
    }
        seededAdmin = await User({
            isAdmin: true,
            password: process.env.ADMINPASSWORD,
            username: "Admin1",
            email: "superadmingee@gmail.com",
            fullName: "Admin Owner",
            phone: "String",
            
        });
    
    seededAdmin.save();
        console.log("Super Admin created with email" + seededAdmin.toJSON().email);
        return seededAdmin
};

seedSuperAdmin();

// module.exports = {seedSuperAdmin}
