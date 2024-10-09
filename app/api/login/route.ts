import axios from "axios";
import { axiosInstance, xDomain } from "..";
import { cookies } from "next/headers";

export async function POST(request: Request, response: Response) {
  const req = await request.json();
  const { username, password } = req;

  try {
    const res = await axiosInstance.post(
      "/login",
      {
        username,
        password,
      },
      {
        headers: {
          "x-domain": xDomain,
        },
      },
    );

    cookies().set("token", res.data.accessToken);

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
