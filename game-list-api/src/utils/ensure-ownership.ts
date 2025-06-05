import { UnauthorizedError } from '@/domain/errors/unauthorized-error';

export function ensureOwnership(resourceUserId: string, currentUserId: string) {
  if (resourceUserId !== currentUserId) {
    throw new UnauthorizedError();
  }
}
