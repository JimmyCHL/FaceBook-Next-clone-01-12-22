import React, { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  CameraIcon,
  EmojiHappyIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

const InputBox = () => {
  const { data: session, status } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value.trim()) return;

    await addDoc(collection(db, "posts"), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    }).then((docRef) => {
      if (imageToPost) {
        const storageRef = ref(storage, `posts/${docRef.id}`);

        uploadString(storageRef, imageToPost, "data_url").then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url) => {
              updateDoc(doc(db, "posts", docRef.id), {
                postImage: url,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
    inputRef.current.value = "";
    removeImage();

    console.log("image and post uploaded successfully.");
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        {session && (
          <Image
            className="rounded-full"
            src={session.user.image}
            width={40}
            height={40}
            layout="fixed"
            alt=""
          />
        )}
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 w-[100px] flex-1 px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`what's on your mind, ${session?.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col hover:backdrop-brightness-110 transition-all duration-150 hover:scale-105 cursor-pointer ease-out"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex flex-col xs:flex-row justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-blue-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            accept="image/gif, image/png, image/jpeg, image/jpg"
            hidden
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
