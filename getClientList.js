import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseDb.js";

// get all client from clientlist collection in firebase db
// for each client, get the smartPage and categoryPage urls
const querySnapshot = await getDocs(collection(db, "clientList"));
const querySnapshotIds = querySnapshot.docs.map((doc) => doc.data());

const getClientList = async () => {
  const clientList = await querySnapshotIds;
  return clientList;
};

export default getClientList;
