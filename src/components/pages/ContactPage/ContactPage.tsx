import Meta from '~/components/global/Meta/Meta';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import EditorialModules from '~/components/modules/EditorialModules/EditorialModules';
import ModuleBreadcrumbs from '~/components/modules/EditorialModules/modules/ModuleBreadcrumbs/ModuleBreadcrumbs';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';

import {
  customerSupportForm,
  pageDownData,
  pageUpperData,
} from './ContactPage.mock';
import { styles } from './ContactPage.styles';
import CustomerSupportForm from './CustomerSupportForm/CustomerSupportForm';

function ContactPage() {
  return (
    <div
      css={[styles.openTemplatePageContainer, navigationBreadcrumbPaddingTop]}
    >
      {pageUpperData.metadata && pageUpperData.metadata.meta && (
        <Meta {...pageUpperData.metadata.meta} />
      )}
      {pageUpperData.breadcrumbs && (
        <ModuleBreadcrumbs breadcrumbs={pageUpperData.breadcrumbs} />
      )}
      {pageUpperData.header && (
        <EditorialHeaders
          moduleData={pageUpperData.header}
          moduleType={pageUpperData.header.type}
        />
      )}
      {pageUpperData.modules &&
        pageUpperData.modules.length &&
        pageUpperData.modules.map((module, index) => (
          <EditorialModules
            key={`${module.type}_${index}`}
            moduleData={module}
            moduleType={module.type}
          />
        ))}
      <CustomerSupportForm
        selections={
          customerSupportForm.items as Array<{
            label: string;
            value: string;
          }>
        }
      />
      {pageDownData.modules &&
        pageDownData.modules.length &&
        pageDownData.modules.map((module, index) => (
          <EditorialModules
            key={`${module.type}_${index}`}
            moduleData={module}
            moduleType={module.type}
          />
        ))}
    </div>
  );
}

export default ContactPage;
