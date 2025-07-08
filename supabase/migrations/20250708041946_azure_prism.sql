/*
  # Farmer Support Chatbot Database Schema

  1. New Tables
    - `chat_messages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `message` (text)
      - `sender` (enum: user, bot)
      - `category` (text, nullable)
      - `timestamp` (timestamptz)
      - `created_at` (timestamptz)

    - `user_preferences`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `language` (text)
      - `location` (text, nullable)
      - `farm_size` (text, nullable)
      - `primary_crops` (text array, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `weather_alerts`
      - `id` (uuid, primary key)
      - `location` (text)
      - `alert_type` (text)
      - `title` (text)
      - `message` (text)
      - `severity` (enum: low, medium, high)
      - `active` (boolean)
      - `created_at` (timestamptz)
      - `expires_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for weather alerts
*/

-- Create enum types
CREATE TYPE sender_type AS ENUM ('user', 'bot');
CREATE TYPE alert_severity AS ENUM ('low', 'medium', 'high');

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  sender sender_type NOT NULL,
  category text,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  language text NOT NULL DEFAULT 'en',
  location text,
  farm_size text,
  primary_crops text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Weather alerts table
CREATE TABLE IF NOT EXISTS weather_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location text NOT NULL,
  alert_type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  severity alert_severity NOT NULL DEFAULT 'medium',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL
);

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_alerts ENABLE ROW LEVEL SECURITY;

-- Policies for chat_messages
CREATE POLICY "Users can read own chat messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat messages"
  ON chat_messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat messages"
  ON chat_messages
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for user_preferences
CREATE POLICY "Users can read own preferences"
  ON user_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for weather_alerts (public read access)
CREATE POLICY "Anyone can read active weather alerts"
  ON weather_alerts
  FOR SELECT
  TO anon, authenticated
  USING (active = true AND expires_at > now());

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for user_preferences updated_at
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample weather alerts
INSERT INTO weather_alerts (location, alert_type, title, message, severity, expires_at) VALUES
('Johannesburg', 'rain', 'Heavy Rain Expected', 'Heavy rainfall expected tomorrow. Prepare drainage systems and cover sensitive crops.', 'high', now() + interval '2 days'),
('Cape Town', 'temperature', 'Frost Warning', 'Temperature will drop to 2°C tonight. Consider covering sensitive plants to protect them from frost damage.', 'medium', now() + interval '1 day'),
('Durban', 'wind', 'Strong Winds Alert', 'Strong winds up to 60km/h expected. Secure loose structures and avoid spraying operations.', 'medium', now() + interval '3 days'),
('Pretoria', 'drought', 'Drought Conditions', 'Extended dry period continues. Implement water conservation measures and consider drought-resistant crops.', 'high', now() + interval '7 days');