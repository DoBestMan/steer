# Utils

## ui-dictionary

Retrieves the value of a UI string from a key.

All the strings are centralized in `~/assets/ui-dictionary/ui.json`.

Use `ui('path.to.key', {key: value})` to retrieve the computed value from the original json.
You can also use interpolated values with the `{{value}}` notation.

Example:

```json
{
  "homepage": {
    "title": "My title",
    "description": "This is a description: {{description}}",
    "anInterpolation": "An {{ interpolation}}",
    "aDangerousInterpolation": "A dangerous {{- interpolation}}"
  }
}
```

```jsx
import { ui } from 'utils/ui-dictionary';

function HomePage() {
  return (
    <div>
      {/* Outputs "My title" */}
      <p>{ui('homepage.title')}</p>
      {/* Outputs "This is a description: awesome!" */}
      <p>{ui('homepage.description', { description: 'awesome!' })}</p>
    </div>
  );
}
```

---

If, for a given path, a value is not found, the initial key will be returned.

```jsx
import { ui } from 'utils/ui-dictionary';

function HomePage() {
  return (
    <div>
      {/* Outputs "homepage.doesntExist" */}
      <p>{ui('homepage.doesntExist')}</p>
    </div>
  );
}
```

---

The interpolated values are sanitized by default, using an HTML sanitizer, on both client and server side.
For the server side, it uses React.renderToString() on a temporary React element.

You can skip the sanitizeHTML step by using the {{- value}} notation, but be careful about unescaped values!

```jsx
import { ui } from 'utils/ui-dictionary';

function HomePage() {
  return (
    <div>
      {/* Outputs "An &lt;p&gt;Interpolation&lt;/p&gt;" */}
      <p>
        {ui('homepage.anInterpolation', {
          interpolation: '<p>Interpolation</p>',
        })}
      </p>

      {/* Outputs "A dangerous <p>Interpolation</p>" */}
      <p>
        {ui('homepage.aDangerousInterpolation', {
          interpolation: '<p>Interpolation</p>',
        })}
      </p>
    </div>
  );
}
```
