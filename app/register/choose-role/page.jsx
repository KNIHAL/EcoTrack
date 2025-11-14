"use client";

import { Suspense } from "react";
import ChooseRoleClient from "./ChooseRoleClient";

export default function ChooseRolePage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ChooseRoleClient />
    </Suspense>
  );
}
