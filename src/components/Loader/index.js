import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default Loader;
