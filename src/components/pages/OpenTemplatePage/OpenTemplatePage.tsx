import Meta from '~/components/global/Meta/Meta';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import EditorialModules from '~/components/modules/EditorialModules/EditorialModules';
import ModuleBreadcrumbs from '~/components/modules/EditorialModules/modules/ModuleBreadcrumbs/ModuleBreadcrumbs';
import { navigationPaddingTop } from '~/components/modules/Nav/Nav.styles';
import { PageData } from '~/data/models/SiteOpenTemplate';

import { styles } from './OpenTemplatePage.styles';

type OpenTemplatePageProps = {
  pageData: PageData;
};

function OpenTemplatePage({ pageData }: OpenTemplatePageProps) {
  return (
    <div css={[styles.openTemplatePageContainer, navigationPaddingTop]}>
      {pageData.metadata && pageData.metadata.meta && (
        <Meta {...pageData.metadata.meta} />
      )}
      {pageData.breadcrumbs && (
        <ModuleBreadcrumbs breadcrumbs={pageData.breadcrumbs} />
      )}
      {pageData.header && (
        <EditorialHeaders
          moduleData={pageData.header}
          moduleType={pageData.header.type}
        />
      )}
      {pageData.modules &&
        pageData.modules.length &&
        pageData.modules.map((module, id) => (
          <EditorialModules
            key={`${module.type}_${id}`}
            moduleData={module}
            moduleType={module.type}
          />
        ))}
    </div>
  );
}

export default OpenTemplatePage;
