"use client";

import { Suspense } from "react";
import ChooseRoleInner from "./role-inner";

export default function ChooseRolePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChooseRoleInner />
    </Suspense>
  );
}
