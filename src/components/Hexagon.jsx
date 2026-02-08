import styles from './Hexagon.module.css';

export default function Hexagon({ children, backgroundColor, width = '2rem', height = '2.25rem', size }) {
  return (
    <div 
      className={styles.container}
      style={{ 
        backgroundColor: backgroundColor,
        width: size || width,
        height: size || height
      }}
    >
      {children}
    </div>
  );
}