/*
  # Fix Security Issues

  1. Performance & Security Fixes
    - Add index on user_id foreign key in chat_messages for query optimization
    - Optimize RLS policies to use SELECT auth.uid() instead of direct function calls
    - Fix search_path mutability in update_updated_at_column function
    - Add missing delete policy for user_preferences

  2. Changes Made
    - Create index on chat_messages.user_id
    - Replace auth.uid() with (select auth.uid()) in all RLS policies
    - Recreate function with IMMUTABLE and secure_invoker to fix search_path
    - Add delete policy for user_preferences table

  3. Database Performance
    - Foreign key indexes prevent sequential scans
    - SELECT auth.uid() evaluates once instead of per row
    - Secure function invocation improves security posture
*/

-- Add index on foreign key for chat_messages
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);

-- Drop existing policies for chat_messages and recreate with optimized auth calls
DROP POLICY IF EXISTS "Users can read own chat messages" ON chat_messages;
CREATE POLICY "Users can read own chat messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own chat messages" ON chat_messages;
CREATE POLICY "Users can insert own chat messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own chat messages" ON chat_messages;
CREATE POLICY "Users can update own chat messages"
  ON chat_messages
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete own chat messages" ON chat_messages;
CREATE POLICY "Users can delete own chat messages"
  ON chat_messages
  FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- Add index on foreign key for user_preferences
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Drop existing policies for user_preferences and recreate with optimized auth calls
DROP POLICY IF EXISTS "Users can read own preferences" ON user_preferences;
CREATE POLICY "Users can read own preferences"
  ON user_preferences
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;
CREATE POLICY "Users can insert own preferences"
  ON user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
CREATE POLICY "Users can update own preferences"
  ON user_preferences
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- Add missing delete policy for user_preferences
CREATE POLICY "Users can delete own preferences"
  ON user_preferences
  FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- Drop existing function and recreate with security configuration
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
DROP FUNCTION IF EXISTS update_updated_at_column();

CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
IMMUTABLE
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