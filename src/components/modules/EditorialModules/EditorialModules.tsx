import { ReactType } from 'react';

import { SiteModuleTypes } from '~/data/models/SiteModuleTypes';
import { OpenTemplateModules } from '~/data/models/SiteOpenTemplate';

import ModuleAccordion from './modules/ModuleAccordion/ModuleAccordion';
import ModuleArticleListWithFeatured from './modules/ModuleArticleListWithFeatured/ModuleArticleListWithFeatured';
import ModuleDataTableVertical from './modules/ModuleDataTableVertical/ModuleDataTableVertical';
import ModuleFeedback from './modules/ModuleFeedback/ModuleFeedback';
import ModuleGraphicGrid from './modules/ModuleGraphicGrid/ModuleGraphicGrid';
import ModuleImage from './modules/ModuleImage/ModuleImage';
import ModuleLinkList from './modules/ModuleLinkList/ModuleLinkList';
import ModuleMarkdown from './modules/ModuleMarkdown/ModuleMarkdown';
import ModuleQuote from './modules/ModuleQuote/ModuleQuote';
import ModuleReview from './modules/ModuleReview/ModuleReview';
import ModuleSeparator from './modules/ModuleSeparator/ModuleSeparator';
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
    SiteModuleDataTableVertical: ModuleDataTableVertical,
    SiteModuleFeedback: ModuleFeedback,
    SiteModuleGraphicGrid: ModuleGraphicGrid,
    SiteModuleLinkList: ModuleLinkList,
    SiteModuleMarkdown: ModuleMarkdown,
    SiteModuleQuote: ModuleQuote,
    SiteModuleReview: ModuleReview,
    SiteModuleSeparator: ModuleSeparator,
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
