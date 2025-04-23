import md from "./SigilWheelProcess.md";

export function SigilWheelProcess(language: string) {
  return md.replaceAll("{{{language}}}", language);
}
