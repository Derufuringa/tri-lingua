import md from "./FinalizeTransmutation.md";

export function FinalizeTransmutation(language: string, dreamseerGaze: string, sigilWheelProcess: string) {
  return md
    .replaceAll("{{{language}}}", language)
    .replace("{{{DreamseerGaze}}}", dreamseerGaze)
    .replace("{{{SigilWheelProcess}}}", sigilWheelProcess);
}
