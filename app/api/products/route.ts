import { db, tables } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { createProduct } from "@/lib/crud";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    // if (!user || user.role !== "admin")
    //   return new Response(null, { status: 403 });

    const products = await db.select().from(tables.products);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  //@ts-ignore
  const { data, error } = await createProduct(body);
  if (error) return Response.json(error, { status: 422 });
  return Response.json(data, { status: 200 });
}

// const routeContextSchema = z.object({
//   params: z.object({
//     userId: z.string(),
//   }),
// });

// export async function POST(
//     req: Request,
//     context: z.infer<typeof routeContextSchema>
//   ) {
//     try {
//       // Validate the route context.
//       const { params } = routeContextSchema.parse(context);

//       const user = await getCurrentUser();
//       if (!user || params.userId !== user.id)
//         return new Response(null, { status: 403 });

//       const body = await req.json();
//       const payload = productSchema.parse(body);

//       await db
//         .update(tables.users)
//         .set(payload)
//         .where(eq(tables.users.id, params.userId));

//       return new Response(null, { status: 200 });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         return new Response(JSON.stringify(error.issues), { status: 422 });
//       }

//       return new Response(null, { status: 500 });
//     }
//   }
