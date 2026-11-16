import { createCipheriv,createDecipheriv,randomBytes,createHash } from 'node:crypto';
import { authenticator } from 'otplib';
function key(){const hex=process.env.MFA_ENCRYPTION_KEY;if(!hex||!/^[0-9a-fA-F]{64}$/.test(hex)) throw new Error('MFA_ENCRYPTION_KEY must be 64 hex chars');return Buffer.from(hex,'hex');}
export function encrypt(s:string){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key(),iv);const enc=Buffer.concat([cipher.update(s,'utf8'),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),enc]).toString('base64');}
export function decrypt(s:string){const b=Buffer.from(s,'base64'),iv=b.subarray(0,12),tag=b.subarray(12,28),data=b.subarray(28),dec=createDecipheriv('aes-256-gcm',key(),iv);dec.setAuthTag(tag);return Buffer.concat([dec.update(data),dec.final()]).toString('utf8');}
export function generateSecret(){return authenticator.generateSecret();}
export function verifyCode(secret:string,code:string){return /^\d{6}$/.test(code)&&authenticator.check(code,secret);}
export function recoveryHash(s:string){return createHash('sha256').update(s.trim().toUpperCase()).digest('hex');}
