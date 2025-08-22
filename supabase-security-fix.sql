-- Fix for Supabase Security Advisor: Function Search Path Mutable
-- Run this SQL in your Supabase SQL Editor to resolve the security warning

-- Drop and recreate the function with proper security settings
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Create updated_at trigger function with secure search_path
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

-- Recreate the trigger (this will ensure it uses the updated function)
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Verify the function exists and is secure
SELECT 
    proname as function_name,
    provolatile as volatility,
    prosecdef as security_definer,
    proconfig as config_settings
FROM pg_proc 
WHERE proname = 'update_updated_at_column';
