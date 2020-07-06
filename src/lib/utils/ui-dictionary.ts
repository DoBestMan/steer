import { doubleBraces } from './regex';
import { sanitizeHTML } from './sanitizer';
import { InterpolationType, UIData, UIType } from './ui-dictionary.common';

function interpolationFn(
  templateString: string,
  templateVars: InterpolationType,
) {
  return templateString.replace(doubleBraces, function (n: string): string {
    let replaced: string = n;

    for (const [key, value] of Object.entries(templateVars)) {
      // Unescape: dangerous!
      if (`{{- ${key}}}` === n) {
        replaced = String(value);
      }
      // Should sanitize by default
      else if (`{{${key}}}` === n) {
        replaced = sanitizeHTML(String(value));
      }
    }

    return replaced;
  });
}

/*
 * Retrieves the value of a UI string from a key.
 * All the strings are centralized in `~/assets/ui-dictionary/ui.json`.
 * Use ui('path.to.key', {key: value}) to retrieve the computed value from the original json.
 * You can also have dynamic values with the {{value}} notation.
 */
export function ui(
  key: string,
  interpolationParams?: InterpolationType,
): string {
  const keys = key.split('.');
  let currentObject: UIType | {} | string | number = UIData;
  let answer: string = key;

  keys.forEach((k, i) => {
    if (typeof keys[i] !== 'undefined') {
      const result = (currentObject as UIType)[k];

      if (typeof result !== 'undefined') {
        if (typeof keys[i + 1] !== 'undefined') {
          const nextKey = keys[i + 1];

          if (typeof (result as UIType)[nextKey] !== 'undefined') {
            // there's a next level
            currentObject = result;
          }
        } else if (typeof result !== 'object') {
          // we have a winner
          answer = String(result);
        }
      }
    }
  });

  // Interpolation
  if (typeof interpolationParams !== 'undefined') {
    answer = interpolationFn(answer, interpolationParams);
  }

  return answer;
}
