import Meta from '~/components/global/Meta/Meta';
import EditorialHeaders from '~/components/modules/EditorialHeaders/EditorialHeaders';
import EditorialModules from '~/components/modules/EditorialModules/EditorialModules';
import ModuleBreadcrumbs from '~/components/modules/EditorialModules/modules/ModuleBreadcrumbs/ModuleBreadcrumbs';
import { navigationBreadcrumbPaddingTop } from '~/components/modules/Nav/Nav.styles';

import {
  contactPageDownData,
  contactPageUpperData,
  customerSupportFormData,
} from './ContactPage.data';
import { styles } from './ContactPage.styles';
import CustomerSupportForm from './CustomerSupportForm/CustomerSupportForm';

function ContactPage() {
  return (
    <div
      css={[styles.openTemplatePageContainer, navigationBreadcrumbPaddingTop]}
    >
      {contactPageUpperData.metadata && contactPageUpperData.metadata.meta && (
        <Meta {...contactPageUpperData.metadata.meta} />
      )}
      {contactPageUpperData.breadcrumbs && (
        <ModuleBreadcrumbs breadcrumbs={contactPageUpperData.breadcrumbs} />
      )}
      {contactPageUpperData.header && (
        <EditorialHeaders
          moduleData={contactPageUpperData.header}
          moduleType={contactPageUpperData.header.type}
        />
      )}
      {contactPageUpperData.modules &&
        contactPageUpperData.modules.length &&
        contactPageUpperData.modules.map((module, index) => (
          <EditorialModules
            key={`${module.type}_${index}`}
            moduleData={module}
            moduleType={module.type}
          />
        ))}
      <CustomerSupportForm
        selections={
          customerSupportFormData.items as Array<{
            label: string;
            value: string;
          }>
        }
      />
      {contactPageDownData.modules &&
        contactPageDownData.modules.length &&
        contactPageDownData.modules.map((module, index) => (
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
