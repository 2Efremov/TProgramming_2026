import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();
  
  // Страница калькулятора
  app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  // API для расчёта НДС
  app.get("/api/calc", (req, res) => {
    const { amount, rate = 20, mode = "extract" } = req.query;
    
    const numAmount = parseFloat(amount as string);
    if (isNaN(numAmount)) {
      return res.status(400).json({ error: "Неверная сумма" });
    }
    
    const vatRate = parseFloat(rate as string) / 100;
    let result;
    
    if (mode === "extract") {
      // Выделить НДС из суммы
      const vat = numAmount * vatRate / (1 + vatRate);
      result = {
        totalWithVat: numAmount,
        vatAmount: Math.round(vat * 100) / 100,
        withoutVat: Math.round((numAmount - vat) * 100) / 100,
        rate: Number(rate),
        mode
      };
    } else {
      // Начислить НДС на сумму
      const vat = numAmount * vatRate;
      result = {
        withoutVat: numAmount,
        vatAmount: Math.round(vat * 100) / 100,
        totalWithVat: Math.round((numAmount + vat) * 100) / 100,
        rate: Number(rate),
        mode
      };
    }
    
    res.json(result);
  });
  
  return app;
}