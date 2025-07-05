-- 1. User profiles (linked to Supabase Auth users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  role text default 'user',
  company text,
  phone text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 2. Agents (AI agents listed on the platform)
create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete set null,
  name text not null,
  description text,
  category text,
  image_url text,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc', now())
);

-- 3. Agent plans (pricing tiers for each agent)
create table if not exists agent_plans (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade,
  name text not null,
  price numeric not null,
  features jsonb,
  is_popular boolean default false
);

-- 4. Orders (purchases of agents/plans)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  agent_id uuid references agents(id) on delete set null,
  plan_id uuid references agent_plans(id) on delete set null,
  amount numeric not null,
  status text default 'pending',
  payment_method text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 5. Reviews (user reviews for agents)
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references agents(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  rating int check (rating >= 1 and rating <= 5),
  title text,
  content text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 6. Notifications
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  type text,
  content text,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 7. Messages (for support, seller-customer chat, etc.)
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references profiles(id) on delete set null,
  receiver_id uuid references profiles(id) on delete set null,
  content text,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 8. Leaderboard (aggregated stats for agents)
create table if not exists leaderboard (
  agent_id uuid primary key references agents(id) on delete cascade,
  sales int default 0,
  rating float default 0,
  updated_at timestamp with time zone default timezone('utc', now())
);

-- 9. Recommendations (personalized agent recommendations)
create table if not exists recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  agent_id uuid references agents(id) on delete cascade,
  score float,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 10. Seller earnings (for Seller dashboard)
create table if not exists seller_earnings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete cascade,
  total_earnings numeric default 0,
  last_payout timestamp with time zone,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 11. Seller analytics (for Seller dashboard)
create table if not exists seller_analytics (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete cascade,
  total_agents int default 0,
  total_orders int default 0,
  total_customers int default 0,
  total_reviews int default 0,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 12. Customers (for seller dashboard)
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete cascade,
  name text,
  email text,
  phone text,
  company text,
  location text,
  join_date date,
  total_spent numeric default 0,
  total_orders int default 0,
  last_order date,
  status text default 'active',
  tier text,
  notes text
);

-- 13. Seller reports (for analytics and reporting)
create table if not exists seller_reports (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete cascade,
  report_type text,
  data jsonb,
  created_at timestamp with time zone default timezone('utc', now())
);

-- 14. Seller reviews (for seller dashboard)
create table if not exists seller_reviews (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  rating int check (rating >= 1 and rating <= 5),
  content text,
  created_at timestamp with time zone default timezone('utc', now())
);
