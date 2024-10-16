import axios from "axios";
import { axiosInstance } from "..";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // 取得 cookie
  const accessToken = request.cookies.get("token")?.value;
  const searchParams = request.nextUrl.searchParams;

  try {
    const res = await axiosInstance.get("/videos/search", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: searchParams,
    });

    return new Response(JSON.stringify(res.data), {
      status: res.status,
    });
  } catch (e) {
    if (axios.isAxiosError(e)) {
      //  e.response?.data will be like:
      // [ { code: 'E009403001', message: 'Student not existed' } ]
      return new Response(JSON.stringify({ error: e.response?.data[0] }), {
        status: e.status,
      });
    }
  }
}
