
import { integer, pgTable, varchar, boolean, json } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
 
  email: varchar({ length: 255 }).notNull().unique(),
  subsciptionId:varchar(),
});
export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).notNull(),
  courseName: varchar({ length: 255 }),
  description: varchar({ length: 1000 }),
  category: varchar({ length: 255 }),
  n_chapters: integer().default(0),
  includeVideo:boolean().default(false),
  difficulty: varchar({ length: 255 }).default('Beginner'),
  courseJson:json(),
  userEmail: varchar({ length: 255 }).notNull().references(() => usersTable.email),
  bannerImageUrl:varchar().default(''),
  courseContent:json().default({})
});
export const enrollCourseTable=pgTable('enrollCourse', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid:varchar('cid').references(()=>coursesTable.cid),
  userEmail: varchar({ length: 255 }).notNull().references(() => usersTable.email),
  completedChapters: json().default({})
})