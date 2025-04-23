import md from "./FinalizeTransmutation.md";

export function FinalizeTransmutation(language: string) {
  return md.replaceAll("{{{language}}}", language);
}
