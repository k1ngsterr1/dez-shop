"use client";

import React, { useState } from "react";
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
import { sendContactForm } from "@/entities/user/api/post/form.api";

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContactForm({ name, company, email, phone, subject, message });
      setIsSubmitted(true);
      // опционально: очистить форму
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Ошибка при отправке формы", err);
      // можно показать пользователю сообщение об ошибке
    } finally {
      setIsSubmitting(false);
    }
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
          <Input
            id="name"
            name="name"
            placeholder="Введите ваше имя"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Компания</Label>
          <Input
            id="company"
            name="company"
            placeholder="Название вашей компании"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">
            Телефон <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+7 (XXX) XXX-XX-XX"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">
          Тема обращения <span className="text-destructive">*</span>
        </Label>
        <Select
          name="subject"
          value={subject}
          onValueChange={setSubject}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите тему обращения" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Общие вопросы">Общие вопросы</SelectItem>
            <SelectItem value="Заказ продукции">Заказ продукции</SelectItem>
            <SelectItem value="Сотрудничество">Сотрудничество</SelectItem>
            <SelectItem value="Техническая поддержка">
              Техническая поддержка
            </SelectItem>
            <SelectItem value="Другое">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Сообщение <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Введите ваше сообщение"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Отправка..." : "Отправить сообщение"}
      </Button>
    </form>
  );
}
