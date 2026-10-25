import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ kindeAuth: string }> }
) {
    const params = await props.params;
    return handleAuth()(request, { params });
}