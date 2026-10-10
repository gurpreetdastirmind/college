import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dialect = process.env.DB_DIALECT || 'sqlite';

let sequelize;

if (dialect === 'sqlite') {
  const backendRoot = path.resolve(__dirname, '..');
  const dbStorage = process.env.DB_STORAGE
    ? path.resolve(backendRoot, process.env.DB_STORAGE)
    : path.join(backendRoot, 'database.sqlite');

  console.log(`📁 SQLite file: ${dbStorage}`);

  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbStorage,
    logging: false,
    define: { timestamps: true, underscored: false },
  });
} else if (process.env.DATABASE_URL) {
  // ✅ Neon / Render / Railway style connection string
  console.log('🌐 Connecting via DATABASE_URL (Postgres)');

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Neon requires SSL
      },
    },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    define: { timestamps: true, underscored: false },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect,
      logging: false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
      define: { timestamps: true, underscored: false },
    }
  );
}

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected (${dialect})`);

    // Never use alter:true in production — it breaks on Neon
    const syncOptions = process.env.NODE_ENV === 'production' ? {} : (dialect === 'sqlite' ? {} : { alter: true });
    await sequelize.sync(syncOptions);
    console.log('✅ Models synced');
  } catch (err) {
    console.error('❌ DB connection failed:');
    console.error(err);
    if (err.errors) {
      err.errors.forEach((e) => console.error(`   → [${e.type}] ${e.path}: ${e.message}`));
    }
    process.exit(1);
  }
};

export { sequelize };
export default sequelize;