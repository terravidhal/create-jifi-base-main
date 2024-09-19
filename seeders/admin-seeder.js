//const db = require('../configs/database.config');
//const UserModel = require("../src/models/user.model");
const { configs } = require('../configs/app.config');
const authService = require('../src/services/auth/auth.service');


/*
async function seedAdmin5() {
    // Connect to the database
    if (configs.use('database')) db.connect(configs.getDatabase());
    
    try {
  
        // Create admin credentials
        const data = {
          name: configs.getValue('NAME_ADMIN'),
          email: configs.getValue('EMAIL_ADMIN'),
          password: configs.getValue('PASSWORD_ADMIN'),
          confirmPassword: configs.getValue('PASSWORD_ADMIN'),
          role: configs.getValue('ROLE_ADMIN'),
        };

        //used as a basis by the "generateOTP" function to create a 'token'
        const token = { type: 'numeric', length: 6 }; 

        // Check if admin already exists
        const findUser = await UserModel.findOne({ email: new RegExp(data.email, 'i')});
        if (findUser) {
          console.log("admin already exists");
          process.exit(1);
        }

        const password = await authService.hash(data.password);
        const confirmation_token = authService.generateOTP(token);

        data.confirmation_token = confirmation_token;
        data.password = password;

        // Create admin user
        const user = await authService.create(data);
        if (user.error == true) {
           console.log("Error creating admin user:",user.message);
           process.exit(1);
        } 

    } catch (err) {
      console.error("Error creating admin user:", err);
      process.exit(1); // Exit process with failure code
    }
  
    // Close the database connection
    db.disconnect();
  }
*/


  async function seedAdmin() {
    // ...
   // const seedersService = authService.getInstance();
   const data = {
    name: configs.getValue('NAME_ADMIN'),
    email: configs.getValue('EMAIL_ADMIN'),
    password: configs.getValue('PASSWORD_ADMIN'),
    confirmPassword: configs.getValue('PASSWORD_ADMIN'),
    role: configs.getValue('ROLE_ADMIN'),
  };
  
    const result = await authService.register(data);
    if (result.error) {
      console.log("Error creating admin seeder:", result.message);
      process.exit(1);
    }
  
    console.log("admin Seeders created successfully");
  }

// Execute the admin seeder
seedAdmin().then(() => {
  console.log("Admin seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding admin:", err);
  process.exit(1);
});