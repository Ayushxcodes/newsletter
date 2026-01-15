import { supabase } from "@/lib/supabase";

export default async function TestPage() {
  try {
    const { data, error } = await supabase.from("articles").select("*");

    if (error) {
      return <pre>Error: {error.message}</pre>;
    }

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  } catch (err) {
    return <pre>Supabase not configured: {(err as Error).message}</pre>;
  }
}
