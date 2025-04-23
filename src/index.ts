import type { LanguageModel } from "ai";
import { generateObject } from "ai";
import { z } from "zod";
import { DreamseerGaze } from "./prompt/DreamseerGaze";
import { FinalizeTransmutation } from "./prompt/FinalizeTransmutation";
import { SigilWheelProcess } from "./prompt/SigilWheelProcess";

/**
 * Represents the response structure returned by the TriLingua translation function.
 * This object contains the results of a three - step translation process.
 */
export interface TriLinguaResponse {
  /**
   * The result of the first pass of the translation process, obtained from the DreamseerGaze process.
   */
  first_pass: string;
  /**
   * An array of strings that lists the issues found in the first pass of the translation process, identified by the SigilWheelProcess.
   */
  issues: Array<string>;
  /**
   * The final optimized translation result, produced by the FinalizeTransmutation process.
   */
  result: string;
}

/**
 * Performs a three-step translation process using the provided language model.
 *
 * This function implements a three-step translation method. First, it uses the `DreamseerGaze` process to obtain an initial translation result.
 * Then, it employs the `SigilWheelProcess` to check for issues in the initial translation.
 * Finally, it uses the `FinalizeTransmutation` process to optimize the translation based on the previous two steps.
 *
 * @param model - The language model to be used for the translation process.
 * @param language - The target language for the translation.
 * @param prompt - The input text to be translated.
 * @returns A promise that resolves to a `TriLinguaResponse` object containing the initial translation result, a list of issues found in the initial translation, and the final optimized translation result.
 */
export async function TriLingua(model: LanguageModel, language: string, prompt: string): Promise<TriLinguaResponse> {
  // 三步翻译法中的第一步：执行 DreamseerGaze 流程，获取初步翻译结果。
  // 调用 generateObject 函数，传入模型、返回数据的模式、系统提示信息和用户输入的提示信息。
  const dreamseerGazeResult = await generateObject({
    model,
    schema: z.object({
      result: z.string(),
    }),
    system: DreamseerGaze(language),
    prompt,
  });
  // 三步翻译法中的第二步：执行 SigilWheelProcess 流程，检查初步翻译结果中存在的问题。
  // 调用 generateObject 函数，传入模型、返回数据的模式、系统提示信息和由用户输入原文及直接翻译结果组成的提示信息。
  const sigilWheelProcessResult = await generateObject({
    model,
    schema: z.object({
      issues: z.array(z.string()),
    }),
    system: SigilWheelProcess(language),
    prompt: [
      `用户输入原文：${prompt}`,
      `直接翻译结果: ${dreamseerGazeResult.object.result}`,
    ].join("\n\n"),
  });

  // 三步翻译法中的第三步：执行 FinalizeTransmutation 流程，根据前两步的结果进行最终的翻译优化。
  // 调用 generateObject 函数，传入模型、返回数据的模式、系统提示信息和包含前两步结果的提示信息
  const finalizeTransmutationResult = await generateObject({
    model,
    schema: z.object({
      result: z.string(),
    }),
    system: FinalizeTransmutation(language),
    prompt: [
      `直接翻译版本: ${dreamseerGazeResult.object.result}`,
      `第一次翻译的问题清单: ${sigilWheelProcessResult.object.issues.join(";")}`,
    ].join("\n\n"),
  });

  return {
    first_pass: dreamseerGazeResult.object.result,
    issues: sigilWheelProcessResult.object.issues,
    result: finalizeTransmutationResult.object.result,
  };
}
