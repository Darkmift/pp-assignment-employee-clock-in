import { JwtDecodedPayload } from '@/auth/auth.types';
import { Request } from 'express';

export default function extractUserDataFromRequest(
  req: Request,
): JwtDecodedPayload {
  return {
    id: req.user.id,
    natid: req.user.natid,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
  };
}
