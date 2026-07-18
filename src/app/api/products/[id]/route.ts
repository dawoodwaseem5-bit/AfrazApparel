import { NextRequest, NextResponse } from "next/server";
import { getDb, getGridFSBucket } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT — update a product
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, styleNo, collection, sizes, fabric, composition, imageIds } =
      body;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const db = await getDb();
    const updateDoc: Record<string, unknown> = {};
    if (name !== undefined) updateDoc.name = name;
    if (styleNo !== undefined) updateDoc.styleNo = styleNo;
    if (collection !== undefined) updateDoc.collection = collection;
    if (sizes !== undefined) updateDoc.sizes = sizes || null;
    if (fabric !== undefined) updateDoc.fabric = fabric || null;
    if (composition !== undefined) updateDoc.composition = composition || null;
    if (imageIds !== undefined) updateDoc.imageIds = imageIds;
    updateDoc.updatedAt = new Date();

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateDoc });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT /api/products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE — delete a product and its GridFS images
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const db = await getDb();
    const bucket = await getGridFSBucket();

    // Fetch the product first to get its imageIds
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete associated images from GridFS
    if (product.imageIds && Array.isArray(product.imageIds)) {
      for (const imgId of product.imageIds) {
        try {
          if (ObjectId.isValid(imgId)) {
            await bucket.delete(new ObjectId(imgId));
          }
        } catch {
          // Image may have already been deleted — continue
        }
      }
    }

    // Delete the product document
    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
