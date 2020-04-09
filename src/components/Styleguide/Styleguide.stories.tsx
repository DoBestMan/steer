import { typography } from '~/styles/global/typography.styles';

export default {
  title: 'Styleguide',
};

export function Text() {
  return (
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
  );
}
