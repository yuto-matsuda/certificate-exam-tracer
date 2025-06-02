import styles from '..//styles/list.module.scss';

export function DotList({
    color,
    children
}: {
    color: 'blue' | 'orange' | 'black'
    children: React.ReactNode
}) {
  return (
    <ul 
      className={
        `${styles.dotList} 
          ${color === 'orange' && styles.orange}
          ${color === 'blue'   && styles.blue}
          ${color === 'black'  && styles.black}
      `} >
      {children}
    </ul>
  );
}

export function KatakanaList({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ul className={styles.katakanaList}>
            {children}
        </ul>
    );
}

export function ListItem({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <li>{children}</li>
    );
}