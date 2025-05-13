import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_user_account_balances");

    if (error) {
      console.error("Error al obtener la cuenta:", error);
      return NextResponse.json(
        { error: "Error al obtener datos de la cuenta" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error inesperado:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
