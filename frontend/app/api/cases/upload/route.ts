import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Forward the request to the backend
    const response = await fetch("http://localhost:3001/cases/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Backend upload failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
