import { test, expect } from "@playwright/test";

const HOST = "http://localhost:3000";

test("should receive articles data from GET /aritlces", async ({ request }) => {
  const articles = await request.get(`${HOST}/articles`);
  expect(articles.ok()).toBeTruthy();

  const data = await articles.json();
  expect(data).toContainEqual(
    expect.objectContaining({
      id: 0,
      title: "Halo World",
    })
  );
});

test("should create a article to POST /aritlces", async ({ request }) => {
  const mockData: Record<string, any> = {
    id: 10,
    title: "Test from e2e",
  };

  const articles = await request.post(`${HOST}/articles`, mockData);
  expect(articles.ok()).toBeTruthy();

  const data = await articles.json();
  expect(data).toContainEqual(expect.objectContaining(mockData));
});
