import TrackingResultContainer from '~/components/pages/TrackingResult/TrackingResult.container';
import { TrackingContextProvider } from '~/components/pages/TrackingResult/TrackingResult.context';

function Tracking() {
  return (
    <TrackingContextProvider>
      <TrackingResultContainer />
    </TrackingContextProvider>
  );
}

export default Tracking;
