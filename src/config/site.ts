/**
 * SEO and theme configuration
 */

import type { SEOConfig, ThemeConfig } from "../types";

export const seo: SEOConfig = {
  title: "Cinasi | Centro de Investigación",
  description:
    "Centro de Investigación Clínica y Coordinación de Estudios Farmacéuticos.",
  keywords: [
    "Cinasi",
    "Investigación Clínica",
    "Farmacéutica",
    "Pisa",
    "Estudios Clínicos",
    "México",
  ],
};

export const theme: ThemeConfig = {
  // Azul Marino Pisa (Color Principal) - Usado en botones y acentos fuertes
  primaryColor: "#002F6C",

  // Gris muy oscuro/Azul noche (Color de fondo de terminal/ventanas en modo oscuro)
  // Le da un toque más serio que el negro puro.
  secondaryColor: "#0F172A",

  // Azul Cielo/Cyan (Color de acento/selección)
  // Un tono más claro para resaltar enlaces o elementos activos sin perder la gama azul.
  accentColor: "#0099CC",
};
