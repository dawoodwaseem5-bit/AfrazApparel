import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET — list all products
export async function GET() {
  try {
    const db = await getDb();
    const products = await db
      .collection("products")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    // Map _id to id for frontend compatibility
    const mapped = products.map((p) => ({
      id: p._id.toString(),
      styleNo: p.styleNo,
      name: p.name,
      collection: p.collection,
      sizes: p.sizes || undefined,
      fabric: p.fabric || undefined,
      composition: p.composition || undefined,
      images: (p.imageIds || []).map((fid: string) => `/api/files/${fid}`),
    }));

    return NextResponse.json(mapped);
  } catch (err) {
    console.error("GET /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST — create a product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, styleNo, collection, sizes, fabric, composition, imageIds } =
      body;

    if (!name || !styleNo || !collection) {
      return NextResponse.json(
        { error: "name, styleNo, and collection are required" },
        { status: 400 }
      );
    }

    if (!imageIds || !Array.isArray(imageIds) || imageIds.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const doc = {
      name,
      styleNo,
      collection,
      sizes: sizes || null,
      fabric: fabric || null,
      composition: composition || null,
      imageIds, // array of GridFS ObjectId strings
      createdAt: new Date(),
    };

    const result = await db.collection("products").insertOne(doc);

    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(),
    });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
