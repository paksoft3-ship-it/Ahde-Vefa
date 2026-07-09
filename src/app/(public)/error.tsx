"use client";

import { ErrorState } from "@/components/ui/States";
import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page py-24">
      <ErrorState
        action={
          <Button variant="primary" onClick={reset}>
            Tekrar Dene
          </Button>
        }
      />
    </div>
  );
}
