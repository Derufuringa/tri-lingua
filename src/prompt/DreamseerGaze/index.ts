import md from "./DreamseerGaze.md";

export function DreamseerGaze(language: string, origin: string) {
  return md.replaceAll("{{{language}}}", language).replace("{{{origin}}}", origin);
}
