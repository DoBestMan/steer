import HomeHeader from '~/components/modules/HomeHeader/HomeHeader';

import Layout from '~/components/global/Layout/Layout';
import { SiteHero } from '~/data/models/SiteHero';
import { SiteInsights } from '~/data/models/SiteInsights';
import { SiteReviews } from '~/data/models/SiteReviews';
import { typography } from '~/styles/typography.styles';

interface Props {
  serverData: {
    siteHero: SiteHero;
    siteInsights: SiteInsights;
    siteReviews: SiteReviews;
  };
}

function HomePage({ serverData }: Props) {
  // TODO: Request from client with personalization data
  // https://simpletire.atlassian.net/browse/WCS-92
  const { siteHero, siteInsights, siteReviews } = serverData;

  return (
    <Layout>
      <div>
        <h1 css={typography.jumboHeadline}>STEER</h1>
        <HomeHeader {...siteHero} />

        <h2>{siteInsights.title}</h2>
        <p>{siteInsights.body}</p>
        <ul>
          {siteInsights.siteInsightList.map((siteInsightItem) => (
            <li key={siteInsightItem.id}>{siteInsightItem.title}</li>
          ))}
        </ul>

        <h2>{siteReviews.title}</h2>
        <p>{siteReviews.body}</p>
        <ul>
          {siteReviews.siteReviewList.map((siteReviewItem) => (
            <li key={siteReviewItem.id}>{siteReviewItem.title}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default HomePage;
