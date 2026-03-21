import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    
    // Relative path for public access
    const publicPath = `/uploads/videos/${fileName}`;
    
    // Absolute path for saving
    const uploadDir = join(process.cwd(), "public", "uploads", "videos");
    const filePath = join(uploadDir, fileName);

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write file
    await writeFile(filePath, buffer);

    console.log(`File uploaded to ${filePath}`);

    return NextResponse.json({ 
      url: publicPath,
      name: file.name,
      size: file.size
    });
  } catch (err) {
    console.error("[UPLOAD_ERROR]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

