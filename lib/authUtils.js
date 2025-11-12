import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const logoutUser = async (router) => {
  try {
    await signOut(auth);
    router.push("/home"); // redirect to login after logout
  } catch (err) {
    alert("Logout failed: " + err.message);
  }
};
