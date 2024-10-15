// middleware.js
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance } from "./app/api";

export async function middleware(request: NextRequest) {
  const reqPath = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;
  const accessToken = request.cookies.get("token")?.value;

  if (reqPath === "/" || reqPath === "/login" || reqPath === "/dashboard") {
    // 不會有 / route 只有 /login 和 /dashboard

    try {
      await axiosInstance.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (reqPath === "/dashboard") {
        return NextResponse.next();
      }
      return NextResponse.redirect(`${origin}/dashboard`);
    } catch (e) {
      console.log(e, "??");
      if (reqPath === "/login") {
        return NextResponse.next();
      }
      // error
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  // 處理 API 呼叫
  if (reqPath.startsWith("/api/")) {
    // 在這裡添加你的 API 處理邏輯
    // console.log(`Handling API call: ${reqPath}`);
  }

  // 對於其他路徑,不做任何處理
  return NextResponse.next();
}

// only handle theses paths
export const config = {
  matcher: ["/", "/login", "/dashboard", "/api/:path*"],
};
