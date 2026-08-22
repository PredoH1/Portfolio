import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const profileRef = doc(db, "settings", "profile");

const DEFAULT_PROFILE = {
  bio: "",
  servicesOffered: [],
  socialLinks: { instagram: "", github: "", linkedin: "", whatsapp: "" },
};

export async function get() {
  const snap = await getDoc(profileRef);
  return snap.exists() ? snap.data() : DEFAULT_PROFILE;
}

export function update(data) {
  return setDoc(profileRef, data, { merge: true });
}
