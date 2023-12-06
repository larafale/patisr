import { z } from "zod";
import { eq } from "drizzle-orm";

import { db, tables } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { userSchema } from "@/lib/specs";

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
});

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  const { params } = routeContextSchema.parse(context);

  const user = await getCurrentUser();
  if (!user || params.userId !== user.id)
    return new Response(null, { status: 403 });

  const body = await req.json();
  //@ts-ignore
  const { data, error } = await createProduct(body);
  if (error) return Response.json(error, { status: 422 });
  return Response.json(data, { status: 200 });
}
