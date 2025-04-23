import md from "./SigilWheelProcess.md";

export function SigilWheelProcess(language: string, origin: string, dreamseerGaze: string) {
  return md.replaceAll("{{{language}}}", language).replace("{{{origin}}}", origin).replace("{{{DreamseerGaze}}}", dreamseerGaze);
}
