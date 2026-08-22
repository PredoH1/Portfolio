import { db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore";

const colRef = collection(db, "projects");

export async function list() {
  const snap = await getDocs(query(colRef, orderBy("order")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function get(id) {
  const snap = await getDoc(doc(db, "projects", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export function add(data) {
  return addDoc(colRef, data);
}

export function update(id, data) {
  return updateDoc(doc(db, "projects", id), data);
}

export function remove(id) {
  return deleteDoc(doc(db, "projects", id));
}
