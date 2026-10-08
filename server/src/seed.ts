import bcrypt from 'bcryptjs';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { Admin } from './modules/auth/model';

async function seed() {
  await connectDatabase();
  const existing = await Admin.findOne({ email: env.ADMIN_EMAIL });
  if (existing) {
    console.log('[seed] Admin already exists');
    process.exit(0);
  }
  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
  await Admin.create({ email: env.ADMIN_EMAIL, passwordHash });
  console.log(`[seed] Admin created: ${env.ADMIN_EMAIL}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('[seed] Error:', err);
  process.exit(1);
});
