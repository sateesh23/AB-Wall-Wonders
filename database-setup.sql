-- AB Wall Wonders Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  location TEXT NOT NULL,
  service TEXT NOT NULL CHECK (service IN ('wallpapers', 'flooring', 'blinds')),
  subcategory TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  image_urls TEXT[], -- Array of additional image URLs
  is_featured BOOLEAN DEFAULT FALSE,
  completed_date DATE NOT NULL,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'planned')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create updated_at trigger function with security settings
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Create policy to allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users" ON projects
  FOR INSERT WITH CHECK (true);

-- Create policy to allow update for authenticated users
CREATE POLICY "Allow update for authenticated users" ON projects
  FOR UPDATE USING (true);

-- Create policy to allow delete for authenticated users
CREATE POLICY "Allow delete for authenticated users" ON projects
  FOR DELETE USING (true);

-- Insert sample data (optional)
INSERT INTO projects (
  title, 
  customer_name, 
  location, 
  service, 
  subcategory, 
  description, 
  image_url, 
  is_featured, 
  completed_date
) VALUES 
(
  'Modern Living Room Wallpaper',
  'John Smith',
  'Mumbai, Maharashtra',
  'wallpapers',
  'Living Room',
  'Beautiful modern wallpaper installation in contemporary living room with geometric patterns.',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
  true,
  '2024-01-15'
),
(
  'Premium Hardwood Flooring',
  'Sarah Johnson',
  'Delhi, India',
  'flooring',
  'Hardwood',
  'Premium oak hardwood flooring installation in master bedroom with elegant finish.',
  'https://images.unsplash.com/photo-1558618666-fbd31c6c9b5e?w=800',
  true,
  '2024-01-20'
),
(
  'Elegant Venetian Blinds',
  'Mike Wilson',
  'Bangalore, Karnataka',
  'blinds',
  'Venetian',
  'Custom venetian blinds installation for office space with automated controls.',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
  false,
  '2024-01-25'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_service ON projects(service);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
