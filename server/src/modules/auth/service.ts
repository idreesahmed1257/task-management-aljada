import bcrypt from 'bcryptjs';
import { Admin } from './model';
import { signToken } from '../../config/jwt';
import { AppError } from '../../utils/AppError';

export async function loginAdmin(email: string, password: string): Promise<string> {
  const admin = await Admin.findOne({ email: email.toLowerCase() });
  if (!admin) throw AppError.unauthorized('Invalid credentials');

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) throw AppError.unauthorized('Invalid credentials');

  return signToken({ adminId: admin._id.toString(), email: admin.email });
}

export async function getAdminById(id: string) {
  const admin = await Admin.findById(id).select('-passwordHash');
  if (!admin) throw AppError.unauthorized('Admin not found');
  return admin;
}
