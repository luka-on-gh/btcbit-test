import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (data.email === "taken@email.com") {
      return NextResponse.json({
        message: "Email address already taken!",
      });
    } else {
      return NextResponse.json({
        token: "auth_token",
      });
    }
  } catch (e) {
    console.error(e);
  }
}
