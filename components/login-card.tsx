"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSnackbar } from "./snackbar-context";
import { useRouter } from "next/navigation";

export default function LoginCard() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  const login = async (data: { username: string; password: string }) => {
    const response = await axios.post("/api/login", data);
    return response.data;
  };

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      showSnackbar("登入成功！", "success");
      router.push("/");
    },
    onError: () => {
      showSnackbar("登入失敗！", "error");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutate({ username: account, password });
    return;

    setError("");

    // 這裡應該是實際的登入邏輯
    // 這只是一個示例，實際應用中應該調用 API 進行身份驗證
    if (account === "user@example.com" && password === "password") {
      console.log("登入成功");
    } else {
      setError("電子郵件或密碼不正確");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">莘莘學院</CardTitle>
        <CardDescription>請輸入您的帳號密碼以登入系統</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account">帳號</Label>
            <Input
              id="account"
              type="email"
              placeholder="shenlearn@gmail.com"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密碼</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>錯誤</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" loading={isPending}>
            登入
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
