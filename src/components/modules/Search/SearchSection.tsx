import styles from './SearchSection.styles';

export interface SearchItem {
  id: string;
  text: string;
}

interface Props {
  eyebrow: string | JSX.Element;
  onClick: (searchText: string) => void;
  searchItems: SearchItem[];
}

function SearchSection({ eyebrow, onClick, searchItems }: Props) {
  const handleClick = (searchText: string) => () => {
    onClick(searchText);
  };

  return (
    <div>
      <h5 css={styles.eyebrow}>{eyebrow}</h5>
      <ul>
        {searchItems.map((item) => (
          <li key={item.id} css={styles.listItem}>
            <button css={styles.itemButton} onClick={handleClick(item.text)}>
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchSection;
