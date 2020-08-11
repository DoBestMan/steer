import dynamic from 'next/dynamic';

const FeedbackDynamic = dynamic(() => import('./Feedback'), {
  ssr: false,
});

export default FeedbackDynamic;
