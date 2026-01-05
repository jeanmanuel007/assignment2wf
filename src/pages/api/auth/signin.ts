import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase.js";

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  const accessToken = data.session?.access_token;
  const refreshToken = data.session?.refresh_token;

  if (accessToken) cookies.set("sb-access-token", accessToken, { path: "/" });
  if (refreshToken) cookies.set("sb-refresh-token", refreshToken, { path: "/" });

  return new Response(null, {
    status: 303,
    headers: { Location: "/dashboard" },
  });
};



