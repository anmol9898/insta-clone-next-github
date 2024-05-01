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

  // Fetch likes for this post-id from the database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });

    // Cleanup function
    return () => unsubscribe();
  }, [db, id]);

  // Check if the current user has already liked the post
  useEffect(() => {
    if (session && likes.some(like => like.id === session.user?.uid)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [session, likes]);

  // Like or unlike the post
  async function likePost() {
    if (session) {
      const likeRef = doc(db, "posts", id, "likes", session.user?.uid);
      if (hasLiked) {
        await deleteDoc(likeRef);
      } else {
        await setDoc(likeRef, {
          username: session.user?.username,
        });
      }
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
