
// components/RedirectToAuth.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectToAuth() {
    const router = useRouter();

    useEffect(() => {
        // Redirigir a /auth
        router.push("/auth");
    }, [router]);

    return null; // No necesita renderizar nada
}
