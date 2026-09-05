import { NextRequest, NextResponse } from 'next/server';

/**
 * File Upload API — POST /api/uploads
 *
 * Handles secure customer file uploads (room photos, portrait photos, custom artwork).
 *
 * Production implementation:
 * 1. Validate file type and size server-side.
 * 2. Scan for malware (optional but recommended).
 * 3. Upload to object storage (Supabase Storage / S3 / R2).
 * 4. Return the storage URL.
 * 5. Associate the URL with the cart item / order.
 *
 * Security notes:
 * - Always validate file type server-side (do not trust client-reported MIME).
 * - Use a random UUID for the filename — never use the original filename.
 * - Store uploads in a private bucket; generate signed URLs for access.
 * - Rate-limit uploads per IP / user session.
 */

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
const MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    // Server-side type validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload JPEG, PNG or WebP.' },
        { status: 400 },
      );
    }

    // Size validation
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 20MB.' },
        { status: 400 },
      );
    }

    // TODO: Production storage upload
    // const buffer = await file.arrayBuffer();
    // const { data, error } = await supabase.storage
    //   .from(process.env.STORAGE_BUCKET!)
    //   .upload(`uploads/${crypto.randomUUID()}`, buffer, { contentType: file.type, upsert: false });

    // For development: return a placeholder URL
    const mockUrl = `/gallery/${Math.ceil(Math.random() * 10)}.jpg`;

    return NextResponse.json({
      success: true,
      url: mockUrl,
      fileName: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error('[Uploads] Error:', error);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
