import { ReactType } from 'react';

import {
  SiteHeaderModule,
  SiteHeaderTypes,
} from '~/data/models/SiteHeaderModule';

import ModuleHeaderArticle from './modules/ModuleHeaderArticle/ModuleHeaderArticle';
import ModuleHeaderLanding from './modules/ModuleHeaderLanding/ModuleHeaderLanding';

type EditorialHeadersProps = {
  moduleData: SiteHeaderModule;
  moduleType: SiteHeaderTypes;
};

function EditorialHeaders({ moduleType, moduleData }: EditorialHeadersProps) {
  const moduleMap: Record<string, ReactType> = {
    SiteModuleHeaderArticle: ModuleHeaderArticle,
    SiteModuleHeaderLanding: ModuleHeaderLanding,
  };
  const Component = moduleType ? moduleMap[moduleType] : null;

  if (!Component) {
    return null;
  }

  return <Component {...moduleData} />;
}

export default EditorialHeaders;
