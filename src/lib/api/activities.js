import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";

const colRef = collection(db, "activities");

export async function list() {
  const snap = await getDocs(query(colRef, orderBy("order")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function add(data) {
  return addDoc(colRef, data);
}

export function update(id, data) {
  return updateDoc(doc(db, "activities", id), data);
}

export function remove(id) {
  return deleteDoc(doc(db, "activities", id));
}
