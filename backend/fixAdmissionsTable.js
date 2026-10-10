// backend/fixAdmissionsTable.js
import sequelize from './config/db.js';

const fix = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to DB');

    // Drop the old Admissions table
    await sequelize.query('DROP TABLE IF EXISTS Admissions');
    console.log('🗑️  Dropped old Admissions table');

    // Recreate it with the new schema from your model
    const { Admission } = await import('./models/index.js');
    await Admission.sync({ force: true });
    console.log('✅ Recreated Admissions table with new schema');

    await sequelize.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    console.error(err);
    process.exit(1);
  }
};

fix();