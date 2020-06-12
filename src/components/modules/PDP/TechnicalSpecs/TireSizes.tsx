import Link from '~/components/global/Link/Link';
import { LINK_THEME } from '~/lib/constants';

import { SizeOption } from './TechnicalSpecs';
import styles from './TireSizes.styles';

interface Props {
  options: SizeOption[];
}

function Sizes({ options }: Props) {
  return (
    <ul css={styles.container}>
      {options.map((item, idx) => (
        <li key={idx} css={styles.option}>
          <div css={styles.optionHeader}>
            <Link
              href={item.link}
              theme={LINK_THEME.DARK_HIGHLIGHTED}
              css={styles.label}
            >
              {item.label}
            </Link>
            <p css={styles.price}>{item.price}</p>
          </div>
          <table>
            <thead css={styles.screenReadersVisibleOnly}>
              <tr>
                <th css={styles.specHeaderCell} scope="col">
                  Label
                </th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {item.specs.map((spec, idx) => (
                <tr key={idx}>
                  <th css={styles.specHeaderCell} scope="row">
                    {spec.label}
                  </th>
                  <td aria-label={spec.label}>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  );
}

export default Sizes;
