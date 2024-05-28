import React from "react";

function useEditPhoto({ selectedPhoto }) {
  const [tags, setTags] = React.useState(["tag1", "tag2", "tag3"]);
  const [photo, setPhoto] = React.useState({
    photoTitle: selectedPhoto.photoTitle,
    location: selectedPhoto.location,
    photoDes: selectedPhoto.photoDes,
    capturedFrom: selectedPhoto.capturedFrom,
  });

  return { tags, photo };
}

export default useEditPhoto;
