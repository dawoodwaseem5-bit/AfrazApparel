import { NextResponse } from "next/server";
import { getDb, getGridFSBucket } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const docEntry = await db
      .collection("documents")
      .findOne({ type: "catalog" });

    if (!docEntry || !docEntry.fileId) {
      return NextResponse.json(
        { error: "Catalog not found" },
        { status: 404 }
      );
    }

    const bucket = await getGridFSBucket();
    const objectId = new ObjectId(docEntry.fileId);

    const files = await bucket.find({ _id: objectId }).toArray();
    if (files.length === 0) {
      return NextResponse.json(
        { error: "Catalog file not found in storage" },
        { status: 404 }
      );
    }

    const downloadStream = bucket.openDownloadStream(objectId);
    const chunks: Buffer[] = [];

    await new Promise<void>((resolve, reject) => {
      downloadStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      downloadStream.on("end", resolve);
      downloadStream.on("error", reject);
    });

    const buffer = Buffer.concat(chunks);
    const filename = docEntry.filename || "AfrazApparel-Catalog-2026.pdf";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("Catalog download error:", err);
    return NextResponse.json(
      { error: "Failed to download catalog" },
      { status: 500 }
    );
  }
}
