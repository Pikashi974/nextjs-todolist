import {
  createTask,
  deleteTask,
  getCategories,
  getCategoryById,
  setStatusComplete,
} from "@/prisma/categories";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const category = await getCategoryById(id);
      return NextResponse.json(category, { status: 200 });
    }
    const categories = await getCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body: { titre: string } = await req.json();
    const create = await createTask(body.titre);
    return NextResponse.json(create, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    // const { searchParams } = new URL(req.url);
    const body: { id: string; method: string } = await req.json();
    // console.log(body);

    const id = body.id;
    if (body.method == "setStatus") {
      await setStatusComplete(id);
    } else {
      console.log(body.method);
    }
    return NextResponse.json({ texte: body.method }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    // const { searchParams } = new URL(req.url);
    const body: { id: string } = await req.json();
    // console.log(body);

    const id = body.id;
    const deleteElement = await deleteTask(id);

    return NextResponse.json({ texte: deleteElement }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
