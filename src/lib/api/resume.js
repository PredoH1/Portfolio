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

const techIconsRef = collection(db, "techIcons");
const certificatesRef = collection(db, "certificates");

export async function listTechIcons() {
  const snap = await getDocs(query(techIconsRef, orderBy("order")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function addTechIcon(data) {
  return addDoc(techIconsRef, data);
}

export function updateTechIcon(id, data) {
  return updateDoc(doc(db, "techIcons", id), data);
}

export function removeTechIcon(id) {
  return deleteDoc(doc(db, "techIcons", id));
}

export async function listCertificates() {
  const snap = await getDocs(query(certificatesRef, orderBy("order")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export function addCertificate(data) {
  return addDoc(certificatesRef, data);
}

export function updateCertificate(id, data) {
  return updateDoc(doc(db, "certificates", id), data);
}

export function removeCertificate(id) {
  return deleteDoc(doc(db, "certificates", id));
}
