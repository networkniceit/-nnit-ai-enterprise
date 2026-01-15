# Supabase Storage Buckets Configuration

## Required Buckets

### 1. uploads
**Purpose**: User-uploaded files (images, documents, audio, video)  
**Public**: No  
**File Size Limit**: 10MB  
**Allowed MIME Types**: 
- Images: image/jpeg, image/png, image/gif, image/webp
- Audio: audio/mpeg, audio/wav, audio/ogg
- Video: video/mp4, video/webm
- Documents: application/pdf, text/plain

**RLS Policy**:
```sql
-- Users can upload their own files
CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Users can view their own files
CREATE POLICY "Users can view their own files"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Users can delete their own files
CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 2. generated
**Purpose**: AI-generated content (images, audio, processed video)  
**Public**: No  
**File Size Limit**: 50MB  
**Allowed MIME Types**: All media types

**RLS Policy**:
```sql
-- Users can access their generated content
CREATE POLICY "Users can access generated content"
ON storage.objects FOR SELECT
USING (bucket_id = 'generated' AND auth.uid()::text = (storage.foldername(name))[1]);

-- System can create generated content
CREATE POLICY "System can create generated content"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'generated');
```

### 3. portfolios
**Purpose**: Portfolio images and assets  
**Public**: Yes (read-only)  
**File Size Limit**: 5MB  
**Allowed MIME Types**: image/*

**RLS Policy**:
```sql
-- Anyone can view portfolio assets
CREATE POLICY "Anyone can view portfolio assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolios');

-- Users can upload to their portfolio
CREATE POLICY "Users can upload portfolio assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolios' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Users can delete their portfolio assets
CREATE POLICY "Users can delete portfolio assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolios' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## Setup Instructions

1. Log in to Supabase Dashboard
2. Navigate to Storage section
3. Create each bucket with the specifications above
4. Apply RLS policies in SQL Editor
5. Configure CORS if needed for web access

## File Organization

### uploads/
```
uploads/
  {user_id}/
    images/
    audio/
    video/
    documents/
```

### generated/
```
generated/
  {user_id}/
    text/
    code/
    images/
    audio/
    video/
```

### portfolios/
```
portfolios/
  {user_id}/
    {portfolio_item_id}/
      main.jpg
      thumbnail.jpg
```
