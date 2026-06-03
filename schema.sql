-- ============================================================
--  LUMORIA JEWELLERY — SUPABASE SCHEMA
--  Run this in Supabase → SQL Editor
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";


-- ============================================================
-- 1. USERS (extends Supabase Auth)
-- ============================================================
create table public.users (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null unique,
  name          text,
  phone         text,
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_users_updated_at
  before update on public.users
  for each row execute function public.handle_updated_at();

-- Auto-create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- 2. USER ADDRESSES
-- ============================================================
create table public.user_addresses (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  label       text not null default 'Home',
  line1       text not null,
  line2       text,
  city        text not null,
  postcode    text not null,
  country     text not null default 'United Kingdom',
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

create index idx_user_addresses_user_id on public.user_addresses(user_id);


-- ============================================================
-- 3. CATEGORIES
-- ============================================================
create table public.categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,
  icon        text,
  image_url   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);


-- ============================================================
-- 4. PRODUCTS
-- ============================================================
create table public.products (
  id              uuid primary key default uuid_generate_v4(),
  sku             text unique,
  name            text not null,
  description     text,
  price           numeric(10, 2) not null check (price >= 0),
  original_price  numeric(10, 2) check (original_price >= 0),
  category        text not null,
  material        text,
  badge           text,
  tag             text,                    -- 'New Arrival', 'Best Seller', 'Premium', etc.
  rating          numeric(3, 2) default 0 check (rating >= 0 and rating <= 5),
  review_count    int not null default 0 check (review_count >= 0),
  image_url       text,                    -- primary image
  images          text[] default '{}',     -- additional images array
  sizes           text[] default '{}',     -- available sizes
  in_stock        boolean not null default true,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index idx_products_category   on public.products(category);
create index idx_products_tag        on public.products(tag);
create index idx_products_in_stock   on public.products(in_stock);
create index idx_products_is_active  on public.products(is_active);

create trigger set_products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();


-- ============================================================
-- 5. PRODUCT REVIEWS
-- ============================================================
create table public.product_reviews (
  id          uuid primary key default uuid_generate_v4(),
  product_id  uuid not null references public.products(id) on delete cascade,
  user_id     uuid references public.users(id) on delete set null,
  author_name text not null,
  rating      int not null check (rating between 1 and 5),
  review_text text,
  is_verified boolean not null default false,
  created_at  timestamptz not null default now()
);

create index idx_product_reviews_product_id on public.product_reviews(product_id);


-- ============================================================
-- 6. COLLECTIONS
-- ============================================================
create table public.collections (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,     -- 'date-night', 'office-wear', etc.
  title       text not null,
  subtitle    text,
  story       text,
  hero_url    text,
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger set_collections_updated_at
  before update on public.collections
  for each row execute function public.handle_updated_at();


-- ============================================================
-- 7. COLLECTION ↔ PRODUCTS (junction)
-- ============================================================
create table public.collection_products (
  collection_id  uuid not null references public.collections(id) on delete cascade,
  product_id     uuid not null references public.products(id) on delete cascade,
  sort_order     int not null default 0,
  primary key (collection_id, product_id)
);

create index idx_collection_products_product_id on public.collection_products(product_id);


-- ============================================================
-- 8. GIFTING CATEGORIES
-- ============================================================
create table public.gifting_categories (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null unique,   -- 'Gifts For Her', 'Gifts For Him', etc.
  sort_order  int not null default 0
);


-- ============================================================
-- 9. PRODUCT ↔ GIFTING CATEGORIES (junction)
-- ============================================================
create table public.product_gifting_categories (
  product_id          uuid not null references public.products(id) on delete cascade,
  gifting_category_id uuid not null references public.gifting_categories(id) on delete cascade,
  primary key (product_id, gifting_category_id)
);


-- ============================================================
-- 10. BLOGS / JOURNAL
-- ============================================================
create table public.blogs (
  id            uuid primary key default uuid_generate_v4(),
  slug          text not null unique,
  title         text not null,
  excerpt       text,
  content       text,               -- HTML content
  image_url     text,
  author        text not null default 'Lumoria Team',
  category      text,
  reading_time  text,               -- '5 min read'
  is_published  boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_blogs_slug        on public.blogs(slug);
create index idx_blogs_published   on public.blogs(is_published, published_at desc);

create trigger set_blogs_updated_at
  before update on public.blogs
  for each row execute function public.handle_updated_at();


-- ============================================================
-- 11. WISHLIST
-- ============================================================
create table public.wishlist_items (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  product_id  uuid not null references public.products(id) on delete cascade,
  added_at    timestamptz not null default now(),
  unique (user_id, product_id)
);

create index idx_wishlist_user_id on public.wishlist_items(user_id);


-- ============================================================
-- 12. CART
-- ============================================================
create table public.cart_items (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.users(id) on delete cascade,
  session_id  text,                 -- for guest carts
  product_id  uuid not null references public.products(id) on delete cascade,
  quantity    int not null default 1 check (quantity > 0),
  size        text,
  added_at    timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint cart_owner check (user_id is not null or session_id is not null)
);

create index idx_cart_items_user_id    on public.cart_items(user_id);
create index idx_cart_items_session_id on public.cart_items(session_id);

create trigger set_cart_items_updated_at
  before update on public.cart_items
  for each row execute function public.handle_updated_at();


-- ============================================================
-- 13. ORDERS
-- ============================================================
create type public.order_status as enum (
  'pending',
  'confirmed',
  'processing',
  'dispatched',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'refunded'
);

create table public.orders (
  id                  uuid primary key default uuid_generate_v4(),
  order_number        text not null unique default 'AUR-' || upper(substr(uuid_generate_v4()::text, 1, 6)),
  user_id             uuid references public.users(id) on delete set null,
  status              public.order_status not null default 'pending',
  subtotal            numeric(10, 2) not null check (subtotal >= 0),
  shipping_cost       numeric(10, 2) not null default 0 check (shipping_cost >= 0),
  discount_amount     numeric(10, 2) not null default 0 check (discount_amount >= 0),
  total               numeric(10, 2) not null check (total >= 0),
  currency            text not null default 'GBP',
  -- Shipping address snapshot
  shipping_name       text,
  shipping_line1      text,
  shipping_line2      text,
  shipping_city       text,
  shipping_postcode   text,
  shipping_country    text,
  -- Payment
  payment_method      text,
  payment_reference   text,
  -- Tracking
  tracking_number     text,
  carrier             text,
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index idx_orders_user_id      on public.orders(user_id);
create index idx_orders_status       on public.orders(status);
create index idx_orders_order_number on public.orders(order_number);

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute function public.handle_updated_at();


-- ============================================================
-- 14. ORDER ITEMS
-- ============================================================
create table public.order_items (
  id              uuid primary key default uuid_generate_v4(),
  order_id        uuid not null references public.orders(id) on delete cascade,
  product_id      uuid references public.products(id) on delete set null,
  product_name    text not null,      -- snapshot at time of order
  product_image   text,
  material        text,
  size            text,
  quantity        int not null check (quantity > 0),
  unit_price      numeric(10, 2) not null check (unit_price >= 0),
  total_price     numeric(10, 2) not null check (total_price >= 0)
);

create index idx_order_items_order_id on public.order_items(order_id);


-- ============================================================
-- 15. ORDER TIMELINE / TRACKING EVENTS
-- ============================================================
create table public.order_timeline (
  id          uuid primary key default uuid_generate_v4(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  label       text not null,         -- 'Order Placed', 'Processing', 'Dispatched', etc.
  description text,
  is_done     boolean not null default false,
  event_at    timestamptz,
  created_at  timestamptz not null default now()
);

create index idx_order_timeline_order_id on public.order_timeline(order_id);


-- ============================================================
-- 16. DISCOUNT CODES / COUPONS
-- ============================================================
create type public.discount_type as enum ('percentage', 'fixed');

create table public.discount_codes (
  id              uuid primary key default uuid_generate_v4(),
  code            text not null unique,
  discount_type   public.discount_type not null,
  discount_value  numeric(10, 2) not null check (discount_value > 0),
  min_order_value numeric(10, 2) default 0,
  max_uses        int,
  times_used      int not null default 0,
  is_active       boolean not null default true,
  expires_at      timestamptz,
  created_at      timestamptz not null default now()
);


-- ============================================================
-- 17. NEWSLETTER SUBSCRIBERS
-- ============================================================
create table public.newsletter_subscribers (
  id            uuid primary key default uuid_generate_v4(),
  email         text not null unique,
  is_active     boolean not null default true,
  subscribed_at timestamptz not null default now()
);


-- ============================================================
-- 18. CONTACT MESSAGES
-- ============================================================
create table public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  is_read     boolean not null default false,
  replied_at  timestamptz,
  created_at  timestamptz not null default now()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Users: only see own profile
alter table public.users enable row level security;
create policy "Users can view own profile"    on public.users for select using (auth.uid() = id);
create policy "Users can update own profile"  on public.users for update using (auth.uid() = id);

-- Addresses: only own addresses
alter table public.user_addresses enable row level security;
create policy "Users can manage own addresses" on public.user_addresses for all using (auth.uid() = user_id);

-- Wishlist: only own items
alter table public.wishlist_items enable row level security;
create policy "Users can manage own wishlist" on public.wishlist_items for all using (auth.uid() = user_id);

-- Cart: only own cart
alter table public.cart_items enable row level security;
create policy "Users can manage own cart" on public.cart_items for all using (auth.uid() = user_id);

-- Orders: only own orders
alter table public.orders enable row level security;
create policy "Users can view own orders"  on public.orders for select using (auth.uid() = user_id);

-- Order items: via order ownership
alter table public.order_items enable row level security;
create policy "Users can view own order items" on public.order_items for select
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- Order timeline: via order ownership
alter table public.order_timeline enable row level security;
create policy "Users can view own order timeline" on public.order_timeline for select
  using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- Public read for products, collections, blogs, categories
alter table public.products              enable row level security;
alter table public.categories            enable row level security;
alter table public.collections           enable row level security;
alter table public.collection_products   enable row level security;
alter table public.gifting_categories    enable row level security;
alter table public.product_gifting_categories enable row level security;
alter table public.blogs                 enable row level security;
alter table public.product_reviews       enable row level security;

create policy "Public can read products"           on public.products              for select using (is_active = true);
create policy "Public can read categories"         on public.categories            for select using (true);
create policy "Public can read collections"        on public.collections           for select using (is_active = true);
create policy "Public can read collection_products" on public.collection_products  for select using (true);
create policy "Public can read gifting_categories" on public.gifting_categories    for select using (true);
create policy "Public can read product_gifting"    on public.product_gifting_categories for select using (true);
create policy "Public can read published blogs"    on public.blogs                 for select using (is_published = true);
create policy "Public can read reviews"            on public.product_reviews       for select using (true);
create policy "Users can add reviews"              on public.product_reviews       for insert with check (auth.uid() = user_id);

-- Newsletter (public insert)
alter table public.newsletter_subscribers enable row level security;
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert with check (true);

-- Contact messages (public insert)
alter table public.contact_messages enable row level security;
create policy "Anyone can send contact message" on public.contact_messages for insert with check (true);


-- ============================================================
-- SEED: GIFTING CATEGORIES
-- ============================================================
insert into public.gifting_categories (name, sort_order) values
  ('Gifts For Her',     1),
  ('Gifts For Him',     2),
  ('Gift Card',         3),
  ('Corporate Gifting', 4),
  ('Mother''s Special', 5);


-- ============================================================
-- SEED: PRODUCT CATEGORIES
-- ============================================================
insert into public.categories (name, sort_order) values
  ('Necklaces',  1),
  ('Bracelets',  2),
  ('Earrings',   3),
  ('Rings',      4),
  ('Anklets',    5),
  ('Pendants',   6);


-- ============================================================
-- SEED: COLLECTIONS
-- ============================================================
insert into public.collections (slug, title, subtitle, sort_order) values
  ('date-night',     'Date Night',      'Romantic pieces for special evenings',   1),
  ('office-wear',    'Office Wear',     'Elegant pieces for the workplace',       2),
  ('party-wear',     'Party Wear',      'Bold pieces to light up any occasion',   3),
  ('wedding-wear',   'Wedding Wear',    'Timeless pieces for your special day',   4),
  ('daily-wear',     'Daily Wear',      'Everyday essentials crafted to last',    5),
  ('minimal-style',  'Minimal Style',   'Clean lines, understated elegance',      6),
  ('vacation-style', 'Vacation Style',  'Bright pieces for your next adventure',  7);
