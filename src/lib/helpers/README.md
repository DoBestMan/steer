## Analytics

Analytics is a unique instance that injects the GTM script once, and provides methods for Google Optimize.

### How to get the result of an A/B testing experiment

```.js
import { useEffect } from 'react';

import { EXPERIMENTS } from '~/lib/constants';
import Optimize from '~/lib/helpers/analytics';

...

// Once the client has rendered,
// Get experiment value
useEffect(() => {
    const callback = (answer: boolean, _originalAnswer?: string) => {
      // answer is `true` if Variant, `false` if experiment not found (_originalAnswer === undefined) or default.
      setExperimentState(answer);
    };

    const experimentID = EXPERIMENTS.PATH.TO.EXPERIMENT.ID;
    const removeCall = Optimize.getExperiment({ experimentID, callback });

    return () => {
      removeCall();
    };
}, []);
```
