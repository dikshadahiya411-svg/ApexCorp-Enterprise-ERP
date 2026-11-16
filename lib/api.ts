import { NextResponse } from 'next/server';
import { currentUser } from './auth';
import { db } from './db';
import type { User } from '@prisma/client';
export const json=(data:unknown,status=200)=>NextResponse.json(data,{status});
export const fail=(message:string,status=400)=>json({error:message},status);
export async function requireUser():Promise<User|null> { return currentUser(); }
export async function securityEvent(actorId:string|undefined,kind:string,detail:string){await db.securityEvent.create({data:{actorId,kind,detail}});}
export function err(e:unknown){ console.error('API failure',e); return fail('Unable to complete request',500); }
