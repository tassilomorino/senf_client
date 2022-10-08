import React, { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Icon, Button, Input, Typography } from "senf-atomic-design-system";
import dayjs from "dayjs";

import { storage, db, auth } from "../firebase";
import Img from "../images/icons/icon-192.png";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (user?.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img, user?.avatarPath]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user?.avatarPath));

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return user ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img
            src={user.avatar || Img}
            alt="avatar"
          />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Icon icon="bulb" />
              </label>
              {user.avatar ? (
                <Icon
                  leadingIcon="bulb"
                  onClick={deleteImage}
                />
              ) : null}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{user.handle}</h3>
          <p>{user.email}</p>
          <hr />
          <Typography variant="bodyBg">
            Joined on:
            {dayjs(user.createdAt).format("DD.MM.YYYY")}
          </Typography>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
