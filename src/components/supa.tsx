import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase.from("articles").select("*");

  if (error) {
    return <pre>{error.message}</pre>;
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
