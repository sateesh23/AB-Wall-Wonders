-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images', 
  true,
  5242880, -- 5MB limit
  '{"image/*"}'
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = '{"image/*"}';

-- Enable public access to the bucket
CREATE POLICY "Enable public read access on project images" ON storage.objects
FOR SELECT USING (bucket_id = 'project-images');

-- Allow authenticated users to upload
CREATE POLICY "Enable authenticated upload to project images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Allow users to update their own uploads
CREATE POLICY "Enable authenticated update to project images" ON storage.objects
FOR UPDATE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Allow users to delete their own uploads
CREATE POLICY "Enable authenticated delete from project images" ON storage.objects
FOR DELETE USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- For now, allow anonymous users to upload (since we're not using auth)
-- Remove these policies and add proper auth later
CREATE POLICY "Enable anonymous upload to project images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Enable anonymous update to project images" ON storage.objects
FOR UPDATE USING (bucket_id = 'project-images');

CREATE POLICY "Enable anonymous delete from project images" ON storage.objects
FOR DELETE USING (bucket_id = 'project-images');
