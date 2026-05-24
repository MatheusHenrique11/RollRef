-- ROLLREF SUPABASE (POSTGRESQL) SCHEMA V1

-- ENUMS
CREATE TYPE user_role AS ENUM ('user', 'vendor', 'admin');
CREATE TYPE skate_type AS ENUM ('inline', 'quad');
CREATE TYPE skate_level AS ENUM ('iniciante', 'intermediario', 'avancado', 'profissional');
CREATE TYPE listing_status AS ENUM ('active', 'pending', 'sold', 'archived');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');

-- 1. USERS TABLE
-- Utilizando a tabela base do Supabase Auth para relacionamento
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    role user_role DEFAULT 'user',
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    store_name VARCHAR(255), -- Apenas para vendedores
    plan_tier VARCHAR(50) DEFAULT 'free', -- 'pro', 'premium' (para vendedores)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CATALOG MODELS TABLE
-- O catálogo principal e imutável de patins
CREATE TABLE public.models (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    tipo skate_type NOT NULL,
    categoria VARCHAR(100) NOT NULL, -- ex: 'freestyle', 'urban', 'agressive'
    nivel skate_level NOT NULL,
    preco_ref DECIMAL(10,2), -- Preço médio de referência
    imagem_url TEXT,
    bota_material VARCHAR(255),
    bota_fechamento VARCHAR(255),
    frame_material VARCHAR(255),
    frame_config VARCHAR(255),
    rodas_diametro_mm INTEGER,
    rodas_durometro VARCHAR(50),
    rolamento VARCHAR(50),
    freio BOOLEAN DEFAULT false,
    link_oficial TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. VENDOR LISTINGS TABLE
-- Anúncios criados pelos vendedores (montagens customizadas, estoque de loja)
CREATE TABLE public.vendor_listings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    model_id UUID REFERENCES public.models(id) ON DELETE SET NULL, -- Opcional, pode ser um custom setup
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    type skate_type NOT NULL,
    status listing_status DEFAULT 'pending',
    whatsapp_link TEXT NOT NULL,
    images JSONB, -- Array de URLs de imagens
    specs JSONB, -- Objeto flexível para specs detalhadas da montagem
    views_count INTEGER DEFAULT 0,
    clicks_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. REVIEWS TABLE
-- Sistema de avaliações da comunidade
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    model_id UUID REFERENCES public.models(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    nome VARCHAR(255) NOT NULL, -- Caso o usuário não esteja logado, salva o nome do formulário
    email VARCHAR(255) NOT NULL,
    nota INTEGER CHECK (nota >= 1 AND nota <= 5),
    experiencia skate_level,
    tempo_uso VARCHAR(100),
    pros TEXT,
    contras TEXT,
    texto TEXT,
    status review_status DEFAULT 'pending', -- Moderação
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- SECURITY RULES (Row Level Security - RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Políticas Básicas de Exemplo
-- Leitura de Modelos é pública
CREATE POLICY "Modelos são visíveis publicamente" ON public.models FOR SELECT USING (true);

-- Vendedores gerenciam apenas seus próprios anúncios
CREATE POLICY "Vendedores visualizam seus anúncios" ON public.vendor_listings FOR SELECT USING (auth.uid() = vendor_id);
CREATE POLICY "Vendedores inserem seus anúncios" ON public.vendor_listings FOR INSERT WITH CHECK (auth.uid() = vendor_id);
CREATE POLICY "Vendedores atualizam seus anúncios" ON public.vendor_listings FOR UPDATE USING (auth.uid() = vendor_id);
CREATE POLICY "Vendedores deletam seus anúncios" ON public.vendor_listings FOR DELETE USING (auth.uid() = vendor_id);

-- Anúncios 'ativos' são visíveis para todos
CREATE POLICY "Anúncios ativos são públicos" ON public.vendor_listings FOR SELECT USING (status = 'active');

-- Avaliações 'aprovadas' são visíveis para todos
CREATE POLICY "Avaliações aprovadas são públicas" ON public.reviews FOR SELECT USING (status = 'approved');
