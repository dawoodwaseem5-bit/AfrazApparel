import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), "PROFILE AFRAZ APPAREL 2025.pdf");
    const buffer = await readFile(pdfPath);
    const filename = "AfrazApparel-Profile-2025.pdf";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (err) {
    console.error("Profile PDF not found:", err);
    return NextResponse.json(
      { error: "Profile not found" },
      { status: 404 }
    );
  }
}
