import type { IncomingMessage, ServerResponse } from 'http';
import mongoose from 'mongoose';
import { env } from './config/env';
import app from './app';

let connected = false;

async function ensureDb(): Promise<void> {
  if (connected && mongoose.connection.readyState === 1) return;
  await mongoose.connect(env.MONGODB_URI);
  connected = true;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  await ensureDb();
  (app as unknown as (req: IncomingMessage, res: ServerResponse) => void)(req, res);
}
