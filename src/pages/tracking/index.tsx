import TrackingPage from '~/components/pages/TrackingPage/TrackingPage';
import { TrackingContextProvider } from '~/components/pages/TrackingResult/TrackingResult.context';

function Tracking() {
  return (
    <TrackingContextProvider>
      <TrackingPage />
    </TrackingContextProvider>
  );
}

export default Tracking;
