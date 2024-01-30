function filterTagNames(tagsData) {
  const tagNames = [];
  tagsData.forEach((tag) => {
    tagNames.push(tag.Tag.tagName);
  });

  return tagNames;
}

module.exports = { filterTagNames };
