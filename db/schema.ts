import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const records = sqliteTable('coach_records', {
 id:text('id').primaryKey(),userId:text('user_id').notNull(),kind:text('kind').notNull(),day:text('day').notNull(),data:text('data').notNull(),photoKey:text('photo_key'),createdAt:integer('created_at').notNull(),
},t=>[index('coach_user_day').on(t.userId,t.day)]);
