import Coach from './coach';
import { requireChatGPTUser } from './chatgpt-auth';
export const dynamic = 'force-dynamic';
export default async function Home() { await requireChatGPTUser('/'); return <Coach/>; }
