-- Fix Row Level Security policies for anonymous access

-- First, let's see current policies (for reference)
-- SELECT * FROM pg_policies WHERE tablename = 'projects';

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON projects;

-- Create new policies that allow anonymous access (since we're not using auth yet)

-- Allow everyone to read projects (public access)
CREATE POLICY "Enable public read access" ON projects
FOR SELECT USING (true);

-- Allow everyone to insert projects (for admin without auth)
CREATE POLICY "Enable public insert access" ON projects
FOR INSERT WITH CHECK (true);

-- Allow everyone to update projects (for admin without auth)
CREATE POLICY "Enable public update access" ON projects
FOR UPDATE USING (true);

-- Allow everyone to delete projects (for admin without auth)
CREATE POLICY "Enable public delete access" ON projects
FOR DELETE USING (true);

-- Alternatively, if you want to temporarily disable RLS entirely (not recommended for production):
-- ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- To re-enable later with proper auth:
-- ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
