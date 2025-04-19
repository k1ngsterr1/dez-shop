import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Mail, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Вход в аккаунт",
  description: "Войдите в свой аккаунт для доступа к персональным функциям",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] p-4">
      <Card className="w-full max-w-md border-border/40 bg-card shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Вход в аккаунт
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Введите ваш email и пароль для входа
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                className="pl-10 bg-background/50 border-input"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Пароль
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                Забыли пароль?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-10 bg-background/50 border-input"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="remember"
              className="text-sm font-normal text-muted-foreground"
            >
              Запомнить меня
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Войти
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
