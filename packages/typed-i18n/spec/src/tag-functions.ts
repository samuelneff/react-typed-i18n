import { FormatXMLElementFn, PrimitiveType } from 'intl-messageformat';
import { createMultiProxy } from 'utikity';

export function createTagFunctionWrapper(locale: string) {

  const tagFunctions: Record<string, FormatXMLElementFn<string>> = {
    lower(chunks: string[]) {
      return chunks.join('').toLocaleLowerCase(locale);
    },
    upper(chunks: string[]) {
      return chunks.join('').toLocaleUpperCase(locale);
    }
  };

  return function wrapWithTagFunctionsImpl(props: unknown): Record<string, PrimitiveType | FormatXMLElementFn<string>> {
    return createMultiProxy(
      props,
      tagFunctions
    );
  }
}
