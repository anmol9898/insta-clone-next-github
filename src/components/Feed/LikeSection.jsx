"use client";

import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const LikeSection = ({ id }) => {
  const { data: session } = useSession();
  const [hasLiked, setHasLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);

  //   how many likes for this post-id stored in db
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  //   if this user has already liked or not
  useEffect(() => {
    if (likes.findIndex((like) => like.id === session?.user?.uid) !== -1) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [likes]);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  }
  return (
    <>
      {session && (
        <div className="flex items-center gap-2 p-3 cursor-pointer mr-2 ">
          {hasLiked ? (
            <FaHeart
              onClick={likePost}
              className="text-red-500 text-3xl hover:scale-125 transition-transform duration-200 ease-out"
            />
          ) : (
            <FaRegHeart
              onClick={likePost}
              className="text-3xl hover:scale-125 transition-transform duration-200 ease-out"
            />
          )}
          {likes.length > 0 && (
            <div className="font-semibold">
              <span className="mr-2">{likes.length}</span>
              {likes.length === 1 ? "like" : "likes"}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LikeSection;
