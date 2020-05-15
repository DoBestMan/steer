import styles from './SearchSection.styles';

export interface SearchItem {
  id: string;
  text: string;
}

interface Props {
  eyebrow?: string | JSX.Element;
  onClick: (searchText: SearchItem) => void;
  searchItems: SearchItem[];
  sectionIndex?: number;
  selectedItemIndex?: [number, number];
}

function SearchSection({
  eyebrow,
  onClick,
  searchItems,
  sectionIndex,
  selectedItemIndex = [0, -1],
}: Props) {
  const handleClick = (item: SearchItem) => () => {
    onClick(item);
  };

  return (
    <div>
      {eyebrow && <h5 css={styles.eyebrow}>{eyebrow}</h5>}
      <ul>
        {searchItems.map((item, index) => {
          const isSelected =
            sectionIndex === selectedItemIndex[0] &&
            index === selectedItemIndex[1];

          return (
            <li css={styles.listItem} key={item.id}>
              <button
                css={[styles.itemButton, isSelected && styles.isSelected]}
                onClick={handleClick(item)}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchSection;
