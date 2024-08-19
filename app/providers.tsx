// app/providers.tsx

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="mx-auto h-auto  min-h-screen w-full max-w-6xl px-0 py-20 sm:py-32 md:px-6 lg:px-8 lg:py-40">
      {children}
    </NextUIProvider>
  );
}
