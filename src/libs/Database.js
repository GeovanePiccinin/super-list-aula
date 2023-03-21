import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItems(list) {
  return AsyncStorage.getItem(list).then((response) => {
    if (response) {
      return Promise.resolve(JSON.parse(response));
    } else return Promise.resolve([]);
  });
}

export async function getItem(list, id) {
  const savedItems = await getItems(list);
  return savedItems.find((item) => item.id === id);
}

export async function saveItem(list, listItem, id) {
  console.log("save item called");

  listItem.id = id ? id : new Date().getTime();
  const savedItems = await getItems(list);

  if (id) {
    const index = await savedItems.findIndex((item) => item.id === id);
    savedItems[index] = listItem;
  } else {
    savedItems.push(listItem);
  }

  console.log("saved items", savedItems);

  return AsyncStorage.setItem(list, JSON.stringify(savedItems));
}

export async function deleteItem(list, id) {
  let savedItems = await getItems(list);
  const index = await savedItems.findIndex((item) => item.id === id);
  savedItems.splice(index, 1);
  return AsyncStorage.setItem(list, JSON.stringify(savedItems));
}
