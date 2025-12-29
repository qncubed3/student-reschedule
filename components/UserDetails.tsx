import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <pre className="text-sm bg-gray-100 rounded p-4 overflow-auto">
      {JSON.stringify(data.claims, null, 2)}
    </pre>
  );
}
