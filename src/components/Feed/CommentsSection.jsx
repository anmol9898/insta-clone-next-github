"use client";
import { app } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Moment from "react-moment";
import Image from "next/image";
import { useEffect, useState } from "react";

const CommentsSection = ({ id }) => {
  const { data: session } = useSession();
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const db = getFirestore(app);

  // comments fetch
  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "comments"),orderBy("timestamp","desc")), (snapshot) => {
      setComments(snapshot.docs);
    });
    // console.log(comments);
  }, [db, id]);

  async function postCommentHandler(e) {
    e.preventDefault();
    const commentToPost = commentInput;
    setCommentInput("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToPost,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    })
      .then(() => console.log("added document success!"))
      .catch((err) => console.log(err));
  }
  return (
    <>
      {comments.length > 0 && (
        <div className="mx-6 p-2 overflow-y-scroll max-h-28 space-y-2">
          {comments?.map((comment, id) => (
            <div className="flex justify-between  items-center gap-2" key={id}>
              <div className="flex flex-1 gap-2 items-center truncate">
                <Image
                  src={comment.data().userImage}
                  height={15}
                  width={30}
                  alt="profile"
                  className="rounded-full object-cover border p-[2px]"
                />
                <h2 className="font-semibold">{comment.data().username}</h2>
                <p className="text-md">{comment.data().comment}</p>
              </div>
              <Moment fromNow className="text-s text-gray-400 w-fit">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex gap-2 p-3" onSubmit={postCommentHandler}>
          <Image
            src={session?.user?.image}
            height={20}
            width={30}
            alt="profile"
            className="rounded-full object-contain ring"
          />
          <input
            type="text"
            placeholder="Enter your comment..."
            className="flex-1 outline-none pl-2"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            disabled={commentInput.trim() === ""}
            className="text-blue-600 font-semibold disabled:opacity-40"
            type="submit"
          >
            Send
          </button>
        </form>
      )}
    </>
  );
};

export default CommentsSection;
