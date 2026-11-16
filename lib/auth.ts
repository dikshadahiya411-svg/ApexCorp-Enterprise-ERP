import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { db } from './db';
const cookieName = 'apex_session';
function secret() { const value=process.env.AUTH_SECRET; if(!value || value.length<32) throw new Error('AUTH_SECRET must contain at least 32 characters'); return new TextEncoder().encode(value); }
export async function createSession(userId:string, mfaPassed:boolean) {
 const token=await new SignJWT({uid:userId,mfa:mfaPassed}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('12h').sign(secret());
 (await cookies()).set(cookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:43200});
}
export async function getSession() {
 const token=(await cookies()).get(cookieName)?.value;
 if(!token) return null;
 try { const {payload}=await jwtVerify(token,secret()); if(typeof payload.uid!=='string') return null; return {userId:payload.uid,mfaPassed:payload.mfa===true}; } catch { return null; }
}
export async function currentUser() {
 const session=await getSession(); if(!session) return null;
 const user=await db.user.findUnique({where:{id:session.userId}});
 if(!user || !user.active || !session.mfaPassed || (user.mfaEnabled && !session.mfaPassed)) return null;
 return user;
}
export async function clearSession() {(await cookies()).delete(cookieName);}
