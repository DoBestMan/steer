import React from 'react';

// Components
import Layout from '~/components/global/Layout/Layout';

// Styles
import { typography } from '~/styles/global/typography.styles';

function Styleguide() {
  return (
    <Layout>
      <div>
        <p css={typography.jumboHeadline}>Jumbo Headline</p>
        <p css={typography.primaryHeadline}>Primary Headline</p>
        <p css={typography.secondaryHeadline}>Secondary Headline</p>
        <p css={typography.tertiaryHeadline}>Tertiary Headline</p>
        <p css={typography.subhead}>Subhead</p>
        <p css={typography.eyebrow}>Eyebrow</p>
        <p css={typography.bodyCopy}>Body Copy</p>
        <p css={typography.smallCopy}>Small Copy</p>
      </div>
    </Layout>
  );
}

export default Styleguide;
