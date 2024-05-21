const { it, describe, expect } = require("@jest/globals");
const RelatedPhotos = require("../relatedPhotos.class");

describe("RelatedPhotos", () => {
  it("should return a array of photo objects", async () => {
    // create a RelatedPhoto instant
    const relatedPhoto = new RelatedPhotos(1, {}, 20, 0);
    // call the getRelatedPhotos method
    const photos = await relatedPhoto.getRelatedPhotos();
    // expect the return value to be an array
    expect(photos).toBeInstanceOf(Array);
  });

  it("should return an error when invalid photo id is given", async () => {
    const relatedPhotos = new relatedPhotos(1000, {}, 20, 0);
    const photos = await relatedPhotos.getRelatedPhotos();
    expect(photos).toEqual({ error: "Photo does not exist" });
  });
});
