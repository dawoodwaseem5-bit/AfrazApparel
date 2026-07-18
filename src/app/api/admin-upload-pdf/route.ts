import { NextRequest, NextResponse } from "next/server";
import { getDb, getGridFSBucket } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null; // "catalog" or "profile"

    if (!file || !type || !["catalog", "profile"].includes(type)) {
      return NextResponse.json(
        { error: "Missing file or invalid type" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const bucket = await getGridFSBucket();
    const buffer = Buffer.from(await file.arrayBuffer());

    // Delete the old file from GridFS if it exists
    const existingDoc = await db
      .collection("documents")
      .findOne({ type });

    if (existingDoc && existingDoc.fileId) {
      try {
        await bucket.delete(new ObjectId(existingDoc.fileId));
      } catch {
        // Old file may not exist — continue
      }
    }

    // Upload new file to GridFS
    const stream = Readable.from(buffer);
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: {
        contentType: "application/pdf",
        type,
        originalName: file.name,
        uploadedAt: new Date(),
      },
    });

    await new Promise<void>((resolve, reject) => {
      stream.pipe(uploadStream).on("finish", resolve).on("error", reject);
    });

    // Update or insert the document reference
    const filename =
      type === "catalog"
        ? "AfrazApparel-Catalog-2026.pdf"
        : "AfrazApparel-Profile-2025.pdf";

    await db.collection("documents").updateOne(
      { type },
      {
        $set: {
          fileId: uploadStream.id.toString(),
          filename,
          originalName: file.name,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: `${type === "catalog" ? "Catalog" : "Profile"} PDF updated successfully`,
    });
  } catch (err) {
    console.error("Upload PDF error:", err);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
