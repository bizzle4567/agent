-- RLS: Only allow users to access their own profile
alter table profiles enable row level security;
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

-- RLS: Only allow users to access their own orders, reviews, notifications, messages, etc.
alter table orders enable row level security;
create policy "Users can view their own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can insert their own orders" on orders for insert with check (auth.uid() = user_id);

alter table reviews enable row level security;
create policy "Users can view their own reviews" on reviews for select using (auth.uid() = user_id);
create policy "Users can insert their own reviews" on reviews for insert with check (auth.uid() = user_id);

alter table notifications enable row level security;
create policy "Users can view their own notifications" on notifications for select using (auth.uid() = user_id);

alter table messages enable row level security;
create policy "Users can view their own messages" on messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "Users can insert their own messages" on messages for insert with check (auth.uid() = sender_id);

-- RLS: Only allow agent owners to update/delete their agents
alter table agents enable row level security;
create policy "Agent owners can manage their agents" on agents for all using (auth.uid() = owner_id);

-- RLS: Only allow sellers to access their analytics, earnings, customers, etc.
alter table seller_earnings enable row level security;
create policy "Sellers can view their own earnings" on seller_earnings for select using (auth.uid() = seller_id);

alter table seller_analytics enable row level security;
create policy "Sellers can view their own analytics" on seller_analytics for select using (auth.uid() = seller_id);

alter table customers enable row level security;
create policy "Sellers can view their own customers" on customers for select using (auth.uid() = seller_id);

alter table seller_reports enable row level security;
create policy "Sellers can view their own reports" on seller_reports for select using (auth.uid() = seller_id);

alter table seller_reviews enable row level security;
create policy "Sellers can view their own reviews" on seller_reviews for select using (auth.uid() = seller_id);

-- RLS: Leaderboard and recommendations are public read
alter table leaderboard enable row level security;
create policy "Public can view leaderboard" on leaderboard for select using (true);

alter table recommendations enable row level security;
create policy "Users can view their own recommendations" on recommendations for select using (auth.uid() = user_id);

-- Trigger: Create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, created_at)
  values (new.id, new.raw_user_meta_data->>'full_name', now());
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
