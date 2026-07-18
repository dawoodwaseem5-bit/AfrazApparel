import { NextRequest, NextResponse } from "next/server";
import { getGridFSBucket } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid file ID" }, { status: 400 });
    }

    const bucket = await getGridFSBucket();
    const objectId = new ObjectId(id);

    // Find the file metadata
    const files = await bucket.find({ _id: objectId }).toArray();
    if (files.length === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileInfo = files[0];
    const contentType = fileInfo.metadata?.contentType || "application/octet-stream";

    // Stream the file from GridFS
    const downloadStream = bucket.openDownloadStream(objectId);
    const chunks: Buffer[] = [];

    await new Promise<void>((resolve, reject) => {
      downloadStream.on("data", (chunk: Buffer) => chunks.push(chunk));
      downloadStream.on("end", resolve);
      downloadStream.on("error", reject);
    });

    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("GET /api/files/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to serve file" },
      { status: 500 }
    );
  }
}
