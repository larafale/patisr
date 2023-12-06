import { db, tables } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    // if (!user || user.role !== "admin")
    //   return new Response(null, { status: 403 });

    const categories = await db.select().from(tables.categories);

    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
