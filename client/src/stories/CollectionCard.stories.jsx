const CollectionCard = require("../pages/Search/components/CollectionCard.jsx");

export default {
  component: CollectionCard,
  title: "CollectionCard",
};

export const Default = {
  args: {
    collection: {
      collectionId: 3,
      collectionName: "Nature",
      collectionDescription: "Nature vibes with vibrent colors.",
      coverPhoto: 203,
      userId: 5,
      createdAt: "2024-01-21T09:59:28.000Z",
      updatedAt: "2024-01-21T09:59:28.000Z",
      User: {
        fullName: "Kaveesha Sewwandi",
        userId: 5,
        firstName: "Kaveesha",
        lastName: "Sewwandi",
        location: "Colombo, Sri Lanka",
        Bio: "I'm a software engineer",
        profilePic: null,
        personalSite: null,
        createdAt: "2024-01-05T06:10:59.000Z",
        updatedAt: "2024-01-05T06:10:59.000Z",
        UserAuth: {
          userName: "kaveesha.sew",
          email: "kaveesha.sewwandi@gmail.com",
        },
      },
      Photo: {
        photoId: 203,
        userId: 3,
        photoUrl:
          "https://csg1003200203c04e96.blob.core.windows.net/photo-shav/1705815739978_16605e1f-af98-495c-a590-c1460f6b9c28_photo_Dynamic Cityscapes_1705815586321.jpg",
        resizedPhotoUrl: "",
        photoTitle: "Historical Wonders",
        photoDes: "A testament to the power of observation and perspective.",
        photoSize: 3565158,
        photoResolution: "4677x7012",
        capturedFrom: "Unknown",
        location: "Unknown",
        createdAt: "2024-01-21T05:45:36.000Z",
        updatedAt: "2024-01-21T05:45:36.000Z",
      },
    },
  },
};
