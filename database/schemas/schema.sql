-- NNIT AI Enterprise Database Schema
-- Supabase PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE public.jobs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    budget DECIMAL(10, 2) NOT NULL CHECK (budget >= 0),
    deadline TIMESTAMP WITH TIME ZONE,
    skills_required TEXT[],
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio items table
CREATE TABLE public.portfolios (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[],
    image_url TEXT,
    project_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI requests tracking table
CREATE TABLE public.ai_requests (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    engine_type TEXT NOT NULL CHECK (engine_type IN ('text', 'code', 'image', 'audio', 'video')),
    operation TEXT NOT NULL,
    request_data JSONB,
    response_data JSONB,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    error_message TEXT,
    processing_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates table
CREATE TABLE public.certificates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    job_id INTEGER REFERENCES public.jobs(id) ON DELETE CASCADE,
    certificate_type TEXT NOT NULL,
    certificate_data JSONB NOT NULL,
    qr_code_url TEXT,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_jobs_user_id ON public.jobs(user_id);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX idx_ai_requests_user_id ON public.ai_requests(user_id);
CREATE INDEX idx_ai_requests_engine_type ON public.ai_requests(engine_type);
CREATE INDEX idx_certificates_user_id ON public.certificates(user_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON public.portfolios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Jobs policies
CREATE POLICY "Anyone can view jobs" ON public.jobs
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own jobs" ON public.jobs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs" ON public.jobs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs" ON public.jobs
    FOR DELETE USING (auth.uid() = user_id);

-- Portfolios policies
CREATE POLICY "Anyone can view portfolios" ON public.portfolios
    FOR SELECT USING (true);

CREATE POLICY "Users can create their own portfolio items" ON public.portfolios
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio items" ON public.portfolios
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio items" ON public.portfolios
    FOR DELETE USING (auth.uid() = user_id);

-- AI requests policies
CREATE POLICY "Users can view their own AI requests" ON public.ai_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own AI requests" ON public.ai_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Certificates policies
CREATE POLICY "Users can view their own certificates" ON public.certificates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own certificates" ON public.certificates
    FOR INSERT WITH CHECK (auth.uid() = user_id);
