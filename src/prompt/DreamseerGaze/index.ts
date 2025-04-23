import md from "./DreamseerGaze.md";

export function DreamseerGaze(language: string) {
  return md.replaceAll("{{{language}}}", language);
}
