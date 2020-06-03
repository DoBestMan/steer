import Checkbox from './Checkbox';

export default {
  component: CheckboxDefault,
  title: 'Checkbox',
};

export function CheckboxDefault() {
  return <Checkbox checked={false} />;
}
