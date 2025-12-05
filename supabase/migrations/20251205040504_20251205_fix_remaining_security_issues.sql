/*
  # Fix Remaining Security Issues
  
  1. Remove Unused Index
    - `idx_user_preferences_user_id` is redundant since user_id column has a unique constraint
    - Unique constraints automatically create indexes, so this additional index wastes storage
  
  2. Fix Function Search Path Mutability
    - `update_updated_at_column` function now uses SECURITY DEFINER
    - SECURITY DEFINER ensures the function executes with the creator's privileges
    - Removes the role mutable search_path vulnerability
    - Removed IMMUTABLE flag (functions that modify data cannot be IMMUTABLE)
  
  3. Security Improvements
    - Function now has fixed search_path for better security
    - Prevents potential SQL injection through search_path manipulation
    - Maintains proper trigger functionality
*/

-- Drop unused index on user_preferences
-- The user_id column already has a unique constraint which creates an index
DROP INDEX IF EXISTS idx_user_preferences_user_id;

-- Recreate the trigger function with proper security settings
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
DROP FUNCTION IF EXISTS update_updated_at_column();

CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
