import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const logoutUser = async (router) => {
  try {
    await signOut(auth);
    router.replace("/"); 
  } catch (err) {
    alert("Logout failed: " + err.message);
  }
};
