import { site } from "@/config/site";

export const telHref = (phone: string = site.contact.phone) =>
  `tel:${phone.replace(/[^+\d]/g, "")}`;

export const mailtoHref = (email: string = site.contact.email) =>
  `mailto:${email}`;

export const kakaoHref = () => site.contact.kakaoUrl;

export const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
