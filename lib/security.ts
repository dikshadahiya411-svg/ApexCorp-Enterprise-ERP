import { Integrity, Role } from '@prisma/client';
export const levels: Record<Integrity,number> = {LOW:1,MEDIUM:2,HIGH:3};
export function canRead(subject:Integrity,object:Integrity) { return levels[object] >= levels[subject]; }
export function canWrite(subject:Integrity,object:Integrity) { return levels[subject] >= levels[object]; }
export function canManage(role:Role) { return role === 'ADMIN'; }
export function canApprove(role:Role) { return role === 'CHECKER' || role === 'FINANCE' || role === 'ADMIN'; }
