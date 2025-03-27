"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-bold">Сообщение отправлено</h3>
        <p className="mb-6 text-muted-foreground">
          Спасибо за ваше обращение! Наши специалисты свяжутся с вами в
          ближайшее время.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>
          Отправить еще сообщение
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Имя <span className="text-destructive">*</span>
          </Label>
          <Input id="name" placeholder="Введите ваше имя" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Компания</Label>
          <Input id="company" placeholder="Название вашей компании" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Телефон <span className="text-destructive">*</span>
          </Label>
          <Input id="phone" placeholder="+7 (XXX) XXX-XX-XX" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">
          Тема обращения <span className="text-destructive">*</span>
        </Label>
        <Select required>
          <SelectTrigger id="subject">
            <SelectValue placeholder="Выберите тему обращения" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">Общие вопросы</SelectItem>
            <SelectItem value="order">Заказ продукции</SelectItem>
            <SelectItem value="partnership">Сотрудничество</SelectItem>
            <SelectItem value="support">Техническая поддержка</SelectItem>
            <SelectItem value="other">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Сообщение <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Введите ваше сообщение"
          rows={5}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Отправка..." : "Отправить сообщение"}
      </Button>
    </form>
  );
}
