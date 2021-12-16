import styles from "./Users.module.css";
import { useState, useEffect, useCallback } from "react";
import { GetUsers } from "../../api/index";
import Card from "../../components/Card";
import Loader from "../../components/Loader";

function Users() {
  // users
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  // error & loading
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // get users
  useEffect(() => {
    GetUsers(page)
      .then((data) => {
        data.map((user) => setUsers((prev) => [...prev, user]));
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY + 1 >= document.body.scrollHeight) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {error ? (
        <h1>error</h1>
      ) : (
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div className={styles.users}>
              {users.map((user) => (
                <Card
                  key={user.id}
                  id={user.id}
                  image={user.imageUrl}
                  name={user.name}
                  lastName={user.lastName}
                  prefix={user.prefix}
                  title={user.title}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
