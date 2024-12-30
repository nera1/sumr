function sortMetadataArrayByCreationDate(array) {
  array.sort((prev, next) => {
    return new Date(prev.created) - new Date(next.created);
  });
}

function createDictionaryAndIDs(array) {
  const dictionary = {};
  const idList = [];
  for (const index in array) {
    array[index].id = index;
    dictionary[index] = array[index];
    idList.push(index);
  }
  return { dictionary, idList };
}

function createTagMap(array) {
  const tagMap = {};
  for (const item of array) {
    const tagList = item["tags"];
    if (tagList !== undefined) {
      for (let tag of tagList) {
        tag = tag.toLowerCase();
        tag = encodeURIComponent(tag);
        const id = item["id"];
        if (tagMap[tag] == undefined) {
          tagMap[tag] = [id];
        } else {
          tagMap[tag].push(id);
        }
      }
    }
  }
  return tagMap;
}

function createTitleList(array) {
  const titleList = [];
  for (const item of array) {
    const title = item["title"];
    if (title) {
      titleList.push({
        id: item["id"],
        title: title,
        category: item["category"],
        preview: item["preview"] || null,
        created: item["created"],
      });
    }
  }
  return titleList.reverse();
}

function createCategoryMap(array) {
  const categoryMap = {};
  const categoryOriginalMap = {};
  for (const item of array) {
    let category = item["category"];
    const categoryOriginal = category;
    if (category) {
      const id = item["id"];
      category = category.toLowerCase();
      category = encodeURIComponent(category);
      if (categoryMap[category]) {
        categoryMap[category].push(id);
      } else {
        categoryMap[category] = [id];
      }
      if (!categoryOriginalMap[category]) {
        categoryOriginalMap[category] = categoryOriginal;
      }
    }
  }
  return { categoryOriginalMap, categoryMap };
}

function yamlHeaderStringGenerator(yaml) {
  const seperator = "---";
  return `${seperator}\n${yaml}${seperator}\n`;
}

function yamlHeaderStringGenerator(yaml) {
  const seperator = "---";
  return `${seperator}\n${yaml}${seperator}`;
}

module.exports = {
  sortMetadataArrayByCreationDate,
  createDictionaryAndIDs,
  createTagMap,
  createTitleList,
  createCategoryMap,
  yamlHeaderStringGenerator,
};
