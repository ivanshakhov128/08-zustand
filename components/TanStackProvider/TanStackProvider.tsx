"use client";

import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
  dehydratedState?: DehydratedState | null;
}

export default function TanStackProvider({ children, dehydratedState }: Props) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
////Temporary
