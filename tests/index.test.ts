import { createOpenAI } from "@ai-sdk/openai";
import { expect, it } from "vitest";
import { z } from "zod";
// eslint-disable-next-line antfu/no-import-dist
import { run } from "../dist";

const zodSchema = z.object({
  first_pass: z.string(),
  issues: z.array(z.string()),
  result: z.string(),
});

it("run", async () => {
  const model = createOpenAI({
    compatibility: "strict",
    baseURL: import.meta.env.VITE_BASE_URL,
    apiKey: import.meta.env.VITE_API_KEY,
  });
  const response = await run(
    model("qwen-2.5-max"),
    "Japanese",
    "Large language models (LLMs) can generate text in response to a prompt, which can contain instructions and information to process. For example, you can ask a model to come up with a recipe, draft an email, or summarize a document.",
  );
  console.log(response);
  const result = zodSchema.safeParse(response);
  expect(result.success).toBe(true);
});
