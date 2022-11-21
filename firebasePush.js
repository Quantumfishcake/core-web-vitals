import {
  collection,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
  getDocs,
  addDoc
} from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { db, storage } from "./firebaseDb.js";

const firebasePush = async (result) => {

  // get list of all firebase collection documents
  const querySnapshot = await getDocs(collection(db, "clients"));
  const querySnapshotIds = querySnapshot.docs.map((doc) => doc.id);

  const storageRef = ref(storage, result.clientName);


  let Timestamp = +new Date();

  uploadString(storageRef, result.smartPageScore.reportHtml).then(
    (snapshot) => {
      console.log("Uploaded a base64url string!");
    }
  );

    await addDoc(collection(db, "scores"), {
      smart_page_score: result.smartPageScore.score,
      category_page_score: result.categoryPageScore.score,
      date: Timestamp,
      client_id: result.client_id,
    });

    // await addDoc(collection(db, "categorypagescores"), {
    //   score: result.categoryPageScore.score,
    //   date: Timestamp,
    //   client_id: result.client_id,
    // });


  // // if client is not in db, add the client and scores
  // if (!querySnapshotIds.includes(result.clientName)) {
  //   const docRef = doc(db, "clients", result.clientName);
  //   await setDoc(docRef, {
  //     smartPageScore: [{ date: Timestamp, score: result.smartPageScore.score }],
  //     categoryPageScore: [
  //       { date: Timestamp, score: result.categoryPageScore.score },
  //     ],
  //   });
  // } else {
  //   // if client is in db, update the scores
  //   const docRef = doc(db, "clients", result.clientName);
  //   await updateDoc(docRef, {
  //     smartPageScore: arrayUnion({
  //       date: Timestamp,
  //       score: result.smartPageScore.score,
  //     }),
  //     categoryPageScore: arrayUnion({
  //       date: Timestamp,
  //       score: result.categoryPageScore.score,
  //     }),
  //   });
  // }


};

export default firebasePush;



