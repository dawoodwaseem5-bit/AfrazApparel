import { NextRequest, NextResponse } from "next/server";
import { getGridFSBucket } from "@/lib/mongodb";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bucket = await getGridFSBucket();
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a readable stream from the buffer
    const stream = Readable.from(buffer);

    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: {
        contentType: file.type,
        originalName: file.name,
        size: buffer.length,
        uploadedAt: new Date(),
      },
    });

    await new Promise<void>((resolve, reject) => {
      stream.pipe(uploadStream).on("finish", resolve).on("error", reject);
    });

    return NextResponse.json({
      success: true,
      fileId: uploadStream.id.toString(),
    });
  } catch (err) {
    console.error("POST /api/upload error:", err);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
