"use server";

import { LinksService } from "@/features/links/services/links.service";
import { redirect } from "next/navigation";

export async function trackAndRedirectAction(linkId: string, url: string) {
    await LinksService.trackClick(linkId);
    redirect(url);
}
