import { NextResponse } from "next/server";
import data from "@/data.json"

export async function GET(request:Request, context:any){
   const {params} = context;
   const pizza = data.pizzas.filter(x => params.pizzaId === x.id.toString());
   return NextResponse.json({
    pizza,
   });
}