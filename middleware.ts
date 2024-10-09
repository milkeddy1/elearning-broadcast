// middleware.js
import { NextRequest, NextResponse } from "next/server";
import { axiosInstance, clientAxiosInstance } from "./app/api";

export async function middleware(request: NextRequest, response: NextResponse) {
  const reqPath = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;
  const accessToken = request.cookies.get("token")?.value;

  if (reqPath === "/" || reqPath === "/login" || reqPath === "/dashboard") {
    // 不會有 / route 只有 /login 和 /dashboard

    try {
      const res = await axiosInstance.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("verify response:", res);
      if (reqPath === "/dashboard") {
        return NextResponse.next();
      }
      return NextResponse.redirect(`${origin}/dashboard`);
    } catch (e) {
      console.log(e, "error");

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

    // axiosInstance.defaults.headers["Authorization"] = localStorage.getItem("accessToken");

    console.log(`Handling API call: ${reqPath}`);
    // 你可以在這裡進行身份驗證或其他 API 相關的處理
    // 如果需要,你可以修改請求或響應
    // const response = NextResponse.next()
    // response.headers.set('x-custom-header', 'some-value')
    // return response
  }

  // 對於其他路徑,不做任何處理
  return NextResponse.next();
}

// only handle theses paths
export const config = {
  matcher: ["/", "/login", "/dashboard", "/api/:path*"],
};
