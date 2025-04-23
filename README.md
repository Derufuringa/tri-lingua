# @derufuringa/tri-lingua

A three-step translation framework for LLM-powered localization

## Installation

```bash
npm install @derufuringa/tri-lingua
# or
yarn add @derufuringa/tri-lingua
# or
pnpm add @derufuringa/tri-lingua
```

## Usage

```typescript
import { TriLingua } from "@derufuringa/tri-lingua";

// Three-step translation process
const result = await TriLingua(
  yourModel,
  "Japanese",
  "The quick brown fox jumps over the lazy dog"
);
```

## API Reference

`TriLingua(model: LanguageModel, language: string, prompt: string): Promise<TriLinguaResponse>`

Parameters :

- model : LanguageModel instance from AI SDK
- language : Target language (ISO 639-1 code or full name)
- prompt : Source text to translate
  Response Object :

```typescript
interface TriLinguaResponse {
  first_pass: string; // Initial translation
  issues: string[]; // Identified quality issues
  result: string; // Optimized final translation
}
```

## Three-Step Process

- `DreamseerGaze` - Generates initial translation using target language patterns
- `SigilWheelProcess` - Analyzes translation quality and identifies issues
- `FinalizeTransmutation` - Produces optimized translation incorporating feedback

## Compatibility

Works with any AI SDK language model implementing the LanguageModel interface:

- OpenAI
- Anthropic
- Gemini
- Llama
- Mistral
- ...

## License

MIT © Rikka
