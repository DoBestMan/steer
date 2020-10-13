import { InterpolationType, UIData, UIType } from './ui-dictionary.common';

function interpolationJSXFn(
  templateString: string,
  templateVars: InterpolationType,
): JSX.Element {
  const valuesInTemplate = templateString.match(/{{(.*?)}}/g);

  if (!valuesInTemplate || !valuesInTemplate.length) {
    return <> {templateString} </>;
  }

  const aSnippet: Array<string | number | JSX.Element> = [];
  let currentIdx = 0;

  valuesInTemplate?.forEach((key) => {
    const idx = templateString.indexOf(key);
    const idxEnd = idx + key.length;

    // add previous snippet
    aSnippet.push(templateString.substr(currentIdx, idx - currentIdx));

    // clear key
    key = key
      .replace('{{-', '')
      .replace('{{', '')
      .replace('}}', '')
      .replace(/ /g, '');

    // add value
    aSnippet.push(templateVars[key]);

    // update currentIdx
    currentIdx = idxEnd;
  });

  // finish the sentence
  if (currentIdx < templateString.length) {
    aSnippet.push(templateString.substr(currentIdx));
  }

  return (
    <>
      {aSnippet.map((item) => {
        return item;
      })}
    </>
  );
}

/*
 * Retrieves the value of a UI string from a key.
 * All the strings are centralized in `~/assets/ui-dictionary/ui.json`.
 * Use ui('path.to.key', {key: value}) to retrieve the computed value from the original json.
 * You can also have dynamic values with the {{value}} notation.
 */
export function uiJSX(
  key: string,
  interpolationParams?: InterpolationType,
): JSX.Element {
  const keys = key.split('.');
  let currentObject:
    | UIType
    | Record<string, unknown>
    | boolean
    | string
    | number = UIData;
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

  let element = <> {answer} </>;

  // Interpolation
  if (typeof interpolationParams !== 'undefined') {
    element = interpolationJSXFn(answer, interpolationParams);
  }

  return element;
}
