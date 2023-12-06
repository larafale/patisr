import { db, tables } from "@/lib/db";
import { Category, Product, User, categorySchema, productSchema, userSchema } from "@/lib/specs";
import { serverError } from "@/lib/utils";
import { eq } from "drizzle-orm";

export const updateUser = async (data: User) => {
  try {
    data = userSchema.parse(data);
    data = (
      await db
        .update(tables.users)
        .set(data)
        .where(eq(tables.users.id, data.id))
        .returning()
    )[0] as User;

    return { data };
  } catch (error) {
    return serverError(error);
  }
};

export const createProduct = async (data: Product) => {
  try {
    data = productSchema.parse(data);
    data = (await db.insert(tables.products).values(data).returning())[0];
    return { data };
  } catch (error) {
    return serverError(error);
  }
};

export const updateProduct = async (data: Product) => {
  try {
    data = productSchema.parse(data);
    data = (
      await db
        .update(tables.products)
        .set(data)
        .where(eq(tables.products.id, data.id))
        .returning()
    )[0];
    return { data };
  } catch (error) {
    return serverError(error);
  }
};

export const createCategory = async (data: Category) => {
  try {
    data = categorySchema.parse(data);
    data = (await db.insert(tables.categories).values(data).returning())[0];
    return { data };
  } catch (error) {
    return serverError(error);
  }
};

export const updateCategory = async (data: Category) => {
  try {
    data = categorySchema.parse(data);
    data = (
      await db
        .update(tables.categories)
        .set(data)
        .where(eq(tables.categories.id, data.id))
        .returning()
    )[0];
    return { data };
  } catch (error) {
    return serverError(error);
  }
};
