import { auth } from "./firebase";
import { getUserRole } from "./firestore";

export const checkUserAccess = async (requiredRole, router) => {
  return new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) {
        router.push("/login");
        resolve(false);
      } else {
        const role = await getUserRole(u.uid);
        if (role !== requiredRole) {
          router.push("/not-authorized");
          resolve(false);
        } else resolve(true);
      }
      unsub();
    });
  });
};
