import styles from "./SingleUser.module.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { GetSingleUser, GetUserFriends } from "../../api";
import Card from "../../components/Card";
import Loader from "../../components/Loader";

function SingleUser() {
  const params = useParams();
  const userId = params.id;

  // user info
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState([]);
  const [company, setCompany] = useState([]);

  // user friends
  const lastUserId = useRef();
  const [userFriends, setUserFriends] = useState([]);
  const [pages, setPages] = useState(1);

  // error & loading
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // get single user info
  useEffect(() => {
    GetSingleUser(userId)
      .then((data) => {
        setUser(data);
        setAddress(data.address);
        setCompany(data.company);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [userId]);

  // get user friends
  useEffect(() => {
    GetUserFriends({ userId, pages })
      .then((data) => {
        if (userId === lastUserId.current) {
          setUserFriends((prev) => [...prev, ...data]);
        } else {
          window.scrollTo(0, 0);
          lastUserId.current = userId;
          setUserFriends(data);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [pages, userId]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY + 1 >= document.body.scrollHeight) {
      setPages((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const { prefix, name, lastName, title, email, ip, jobArea, jobType } = user;

  return (
    <div>
      {error ? (
        <h1>Error</h1>
      ) : (
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div className={styles.details}>
              <div className={styles.about}>
                <div className={styles.photo}>
                  <img src={`${user.imageUrl}/v=${userId}`} alt="img" />
                </div>
                <div className={styles.info}>
                  <h2>Info</h2>
                  <div className={styles.infoContent}>
                    <h3>
                      {prefix} {name} {lastName}
                    </h3>
                    <p>{title}</p>
                    <p>
                      <span>Email: </span>
                      {email}
                    </p>
                    <p>
                      <span>IP Address: </span>
                      {ip}
                    </p>
                    <p>
                      <span>Job Area: </span>
                      {jobArea}
                    </p>
                    <p>
                      <span>Job Type: </span>
                      {jobType}
                    </p>
                  </div>
                </div>
                <div className={styles.address}>
                  <h2>Address</h2>
                  <div className={styles.addressContent}>
                    <h3>
                      {company.name} {company.suffix}
                    </h3>
                    <p>
                      <span>City: </span>
                      {address.city}
                    </p>
                    <p>
                      <span>Country: </span>
                      {address.country}
                    </p>
                    <p>
                      <span>State: </span>
                      {address.state}
                    </p>
                    <p>
                      <span>Street Adress: </span>
                      {address.streetAddress}
                    </p>
                    <p>
                      <span>ZIP: </span>
                      {address.zipCode}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h1>Friends:</h1>
                <div className={styles.friends}>
                  {userFriends.map((userFriend) => (
                    <Card
                      key={userFriend.id}
                      id={userFriend.id}
                      image={userFriend.imageUrl}
                      name={userFriend.name}
                      lastName={userFriend.lastName}
                      prefix={userFriend.prefix}
                      title={userFriend.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SingleUser;
