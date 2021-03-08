import { ReactType } from 'react';

import { SiteModuleTypes } from '~/data/models/SiteModuleTypes';
import { OpenTemplateModules } from '~/data/models/SiteOpenTemplate';

import ModuleAccordion from './modules/ModuleAccordion/ModuleAccordion';
import ModuleArticleListWithFeatured from './modules/ModuleArticleListWithFeatured/ModuleArticleListWithFeatured';
import ModuleButtonGrid from './modules/ModuleButtonGrid/ModuleButtonGrid';
import ModuleCircularIllustrationCarousel from './modules/ModuleCircularIllustrationCarousel/ModuleCircularIllustrationCarousel';
import ModuleDataTableVertical from './modules/ModuleDataTableVertical/ModuleDataTableVertical';
import ModuleFeedback from './modules/ModuleFeedback/ModuleFeedback';
import ModuleGoogleForm from './modules/ModuleGoogleForm/ModuleGoogleForm';
import ModuleGraphicGrid from './modules/ModuleGraphicGrid/ModuleGraphicGrid';
import ModuleImage from './modules/ModuleImage/ModuleImage';
import ModuleLinkList from './modules/ModuleLinkList/ModuleLinkList';
import ModuleMarkdown from './modules/ModuleMarkdown/ModuleMarkdown';
import ModulePDPInstallation from './modules/ModulePDPInstallation/ModulePDPInstallation';
import ModulePromotionCards from './modules/ModulePromotionCards/ModulePromotionCards';
import ModuleQuote from './modules/ModuleQuote/ModuleQuote';
import ModuleReview from './modules/ModuleReview/ModuleReview';
import ModuleSearchByBoard from './modules/ModuleSearchByBoard/ModuleSearchByBoard';
import ModuleSeparator from './modules/ModuleSeparator/ModuleSeparator';
import ModuleSimpleSnapButton from './modules/ModuleSimpleSnapButton/ModuleSimpleSnapButton';
import ModuleSiteLinkWithLabel from './modules/ModuleSiteLinkWithLabel/ModuleSiteLinkWithLabel';
import ModuleTextList from './modules/ModuleTextList/ModuleTextList';
import ModuleTireSearchBillboard from './modules/ModuleTireSearchBillboard/ModuleTireSearchBillboard';
import ModuleYouTubeVideo from './modules/ModuleYouTubeVideo/ModuleYouTubeVideo';

type EditorialModulesProps = {
  moduleData: OpenTemplateModules;
  moduleType: SiteModuleTypes;
};

function EditorialModules({ moduleType, moduleData }: EditorialModulesProps) {
  const moduleMap: Record<string, ReactType> = {
    SiteImage: ModuleImage,
    SiteModuleAccordion: ModuleAccordion,
    SiteModuleArticleListWithFeatured: ModuleArticleListWithFeatured,
    SiteModuleButtonGrid: ModuleButtonGrid,
    SiteModuleCircularIllustrationCarousel: ModuleCircularIllustrationCarousel,
    SiteModuleDataTableVertical: ModuleDataTableVertical,
    SiteModuleFeedback: ModuleFeedback,
    SiteModuleGoogleForm: ModuleGoogleForm,
    SiteModuleGraphicGrid: ModuleGraphicGrid,
    SiteModuleLinkList: ModuleLinkList,
    SiteModuleLinkWithLabel: ModuleSiteLinkWithLabel,
    SiteModuleMarkdown: ModuleMarkdown,
    SiteModulePDPInstallation: ModulePDPInstallation,
    SiteModulePromotionCards: ModulePromotionCards,
    SiteModuleQuote: ModuleQuote,
    SiteModuleReview: ModuleReview,
    SiteModuleSearchByBoard: ModuleSearchByBoard,
    SiteModuleSeparator: ModuleSeparator,
    SiteModuleSimpleSnapButton: ModuleSimpleSnapButton,
    SiteModuleTextList: ModuleTextList,
    SiteModuleTireSearchBillboard: ModuleTireSearchBillboard,
    SiteYouTubeVideo: ModuleYouTubeVideo,
  };
  const Component = moduleType ? moduleMap[moduleType] : null;

  if (!Component) {
    return null;
  }

  return <Component {...moduleData} />;
}

export default EditorialModules;
