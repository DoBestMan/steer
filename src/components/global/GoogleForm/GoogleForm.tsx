import { useBreakpoints } from '~/hooks/useBreakpoints';

export interface GoogleFormProps {
  formId: string;
  height?: number;
  mobileHeight?: number;
}
function GoogleForm({ ...props }: GoogleFormProps) {
  const { isMobile } = useBreakpoints();
  return (
    <iframe
      src={`https://docs.google.com/forms/d/e/${props.formId}/viewform?embedded=true`}
      width="100%"
      frameBorder="0"
      height={isMobile ? props.mobileHeight : props.height}
    >
      Loading…
    </iframe>
  );
}

export default GoogleForm;
