// app/api/auth/get-route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();  // No need to await here

  const token: string | null = cookieStore.get("access_token")?.value || null;

  return NextResponse.json<{ token: string | null }>({ token });
}
