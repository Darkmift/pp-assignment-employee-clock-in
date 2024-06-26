// custom.d.ts
import { JwtDecodedPayload } from '@/auth/auth.types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtDecodedPayload; // Make `user` optional to avoid issues in routes not using this property
    }
  }
}
