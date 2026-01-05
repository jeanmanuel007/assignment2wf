
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase.js";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  // User may need email confirmation.
  // Sign in either way.
  return new Response(null, {
    status: 303,
    headers: { Location: "/signin" },
  });
};
