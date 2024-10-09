import axios from "axios";
import { axiosInstance } from "..";
import { headers } from "next/headers";

export async function GET() {
  const headersList = headers();
  const token = headersList.get("authorization");

  try {
    const res = await axiosInstance.get("/users/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
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
