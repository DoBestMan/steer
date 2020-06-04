import Checkbox from './Checkbox';

export default {
  component: CheckboxDefault,
  title: 'Global/Checkbox',
};

export function CheckboxDefault() {
  return <Checkbox checked={false} />;
}
