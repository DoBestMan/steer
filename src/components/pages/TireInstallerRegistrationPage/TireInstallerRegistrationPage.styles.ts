import { BORDERS, MQ, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';

export const styles: StylesMap = {
  attachImageInput: {
    left: 0,
    opacity: 0,
    position: 'absolute',
    zIndex: Z_INDEX.BEHIND,
  },
  attachImageStyles: [
    disableGlobalFocus,
    {
      maxWidth: '254px',
    },
  ],
  attachImageToastMessage: {
    display: 'none',
    [MQ.L]: {
      display: 'flex',
      marginTop: SPACING.SIZE_20,
      maxWidth: '300px',
    },
  },
  btnSubmit: {
    justifyContent: 'center',
    marginTop: SPACING.SIZE_20,
    width: '100%',
  },
  checkBoxSection: {
    ['label']: {
      marginBottom: SPACING.SIZE_20,

      [':last-of-type']: {
        marginBottom: 0,
      },
    },
  },
  flex1: {
    flex: '1',
  },
  flexFull: {
    flexBasis: '100%',
  },
  group: {
    paddingTop: SPACING.SIZE_20,
  },
  groupBottomBorder: {
    paddingBottom: SPACING.SIZE_60,
    paddingTop: SPACING.SIZE_20,
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
  },
  hourSection: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  paddingTop60: {
    paddingTop: SPACING.SIZE_60,
  },
  relative: {
    position: 'relative',
  },
  spacingBottom20: {
    marginBottom: SPACING.SIZE_20,
  },
  spacingBottom40: {
    marginBottom: SPACING.SIZE_40,
  },
  spacingBottom60: {
    marginBottom: SPACING.SIZE_60,
  },
  spacingSides20: {
    margin: `0 ${SPACING.SIZE_20}px`,
  },
  spacingTop60: {
    marginTop: SPACING.SIZE_60,
  },
  toastMessage: {
    [MQ.L]: {
      position: 'absolute',
      bottom: '-80px',
    },
  },
};
