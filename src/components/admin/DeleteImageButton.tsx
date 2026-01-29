"use client";

import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { deleteArtworkImage } from "@/app/actions/artwork";
import { useTransition } from "react";

export function DeleteImageButton({ imageId }: { imageId: number }) {
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            type="button"
            variant="destructive"
            size="icon"
            className="h-8 w-8"
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    await deleteArtworkImage(imageId);
                });
            }}
        >
            <Trash2 className="w-4 h-4" />
        </Button>
    );
}
