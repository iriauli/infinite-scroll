import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card(props) {
  const { id, image, name, lastName, prefix, title } = props;

  return (
    <div className={styles.card}>
      <Link to={`/user/${id}`} asd={name}>
        <div className={styles.image}>
          <img src={`${image}/v=${id}`} alt="img" />
        </div>
        <div className={styles.info}>
          <h3>
            {prefix} {name} {lastName}
          </h3>
          <p>{title}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
