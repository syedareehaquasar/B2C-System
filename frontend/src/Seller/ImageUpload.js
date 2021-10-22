import React, { useState } from "react";
import { storage, ref, getDownloadURL, uploadBytesResumable } from "../firebase";

const FileUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState();
  const [progress, setProgress] = useState();
  const handelChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handelUpload = () => {
    const storageRef = ref(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress("Upload is " + progress + "% done");
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
        });
      }
    );
  };

  console.log("image :", image);

  return (
    <div>
      <br />
      <input type="file" name="" id="" onChange={handelChange} />
      <button onClick={handelUpload}>Upload</button>
      <br />
      {progress}
      <br />
      <img src={url} alt="firebase-img" />
    </div>
  );
};

export default FileUpload;
