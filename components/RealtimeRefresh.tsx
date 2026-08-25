"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Subscribes to Postgres changes on the given tables and refreshes the
 * current route when anything changes — so standings, winners and
 * announcements update live on attendees' phones without a manual reload.
 */
export function RealtimeRefresh({ tables }: { tables: string[] }) {
  const router = useRouter();
  const key = tables.join(",");

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel(`realtime:${key}`);

    for (const table of tables) {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => router.refresh()
      );
    }

    channel.subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return null;
}
