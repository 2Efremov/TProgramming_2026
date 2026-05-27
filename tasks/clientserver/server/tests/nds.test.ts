import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../src/nds";

describe("НДС калькулятор", () => {
  it("Выделить НДС 20% из суммы 120000", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/api/calc")
      .query({ amount: 120000, rate: 20, mode: "extract" });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      totalWithVat: 120000,
      vatAmount: 20000,
      withoutVat: 100000,
      rate: 20,
      mode: "extract"
    });
  });
  it("Начислить НДС 20% на сумму 100000", async () => {
    const app = createApp();
    const response = await request(app)
      .get("/api/calc")
      .query({ amount: 100000, rate: 20, mode: "plus" });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      withoutVat: 100000,
      vatAmount: 20000,
      totalWithVat: 120000,
      rate: 20,
      mode: "plus"
    });
  });
});