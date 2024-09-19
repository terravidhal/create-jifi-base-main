const { configs } = require('../configs/app.config');
const authService = require('../src/services/auth/auth.service'); 




  async function seedManager() {
   const data = {
    name: configs.getValue('NAME_MANAGER'),
    email: configs.getValue('EMAIL_MANAGER'),
    password: configs.getValue('PASSWORD_MANAGER'),
    confirmPassword: configs.getValue('PASSWORD_MANAGER'),
    role: configs.getValue('ROLE_MANAGER'),
  };
  
    const result = await authService.register(data);
    if (result.error) {
      console.log("Error creating manager seeder:", result.message);
      process.exit(1);
    }
  
    console.log("manager Seeders created successfully");
  }

// Execute the manager seeder
seedManager().then(() => {
  console.log("Manager seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding manager:", err);
  process.exit(1);
});