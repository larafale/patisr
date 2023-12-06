import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`(strftime('%s', 'now'))`
  ),
});

export const categories = sqliteTable("categories", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  img: text("img"),
});

export const products = sqliteTable("products", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull().default(0),
  categoryId: text("category_id")
    .notNull()
    .references(() => categories.id),
});

// export type Category = typeof categories.$inferSelect
// export type Product = typeof products.$inferSelect