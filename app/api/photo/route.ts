import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '../../chatgpt-auth';
import {getDb} from '../../../db';
import {records} from '../../../db/schema';
import {and,eq} from 'drizzle-orm';
export async function GET(req:Request){const u=await getChatGPTUser();if(!u)return new Response(null,{status:401});const id=new URL(req.url).searchParams.get('id')||'';const row=await getDb().select().from(records).where(and(eq(records.id,id),eq(records.userId,u.userId))).get();if(!row?.photoKey)return new Response(null,{status:404});const obj=await env.BUCKET?.get(row.photoKey);if(!obj)return new Response(null,{status:404});return new Response(obj.body,{headers:{'Content-Type':'image/jpeg','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});}
