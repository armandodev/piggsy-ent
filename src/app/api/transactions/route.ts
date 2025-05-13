import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error al obtener las transacciones:", error);
      return NextResponse.json(
        { error: "Error al obtener datos de las transacciones" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error inesperado:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
