-- ------------------------------
-- Table: users
-- ------------------------------
create table if not exists users (
    id uuid primary key default gen_random_uuid(),
    email text unique not null,
    password_hash text,
    role text check (role in ('Volunteer', 'OrgAdmin', 'PlatformAdmin')) not null,
    created_at timestamp default now()
);

-- ------------------------------
-- Table: volunteer_profiles
-- ------------------------------
create table if not exists volunteer_profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    full_name text,
    skills text[],
    interests text[],
    availability text,
    languages text[],
    experience text,
    created_at timestamp default now()
);

-- ------------------------------
-- Table: organizations
-- ------------------------------
create table if not exists organizations (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    name text,
    bio text,
    mission text,
    verification_status text check (verification_status in ('Pending', 'Verified', 'Rejected')) default 'Pending',
    media_urls text[],
    created_at timestamp default now()
);

-- ------------------------------
-- Table: projects
-- ------------------------------
create table if not exists projects (
    id uuid primary key default gen_random_uuid(),
    org_id uuid references organizations(id) on delete cascade,
    title text,
    description text,
    location text,
    tasks text[],
    required_skills text[],
    duration text,
    urgency_flag boolean default false,
    impact_metrics text[],
    created_at timestamp default now()
);

-- ------------------------------
-- Table: applications
-- ------------------------------
create table if not exists applications (
    id uuid primary key default gen_random_uuid(),
    volunteer_id uuid references volunteer_profiles(id) on delete cascade,
    project_id uuid references projects(id) on delete cascade,
    status text check (status in ('Pending', 'Accepted', 'Rejected')) default 'Pending',
    qualifications text[],
    created_at timestamp default now()
);

-- ------------------------------
-- Table: message_threads
-- ------------------------------
create table if not exists message_threads (
    id uuid primary key default gen_random_uuid(),
    project_id uuid references projects(id) on delete cascade,
    volunteer_id uuid references volunteer_profiles(id) on delete cascade,
    created_at timestamp default now()
);

-- ------------------------------
-- Table: messages
-- ------------------------------
create table if not exists messages (
    id uuid primary key default gen_random_uuid(),
    thread_id uuid references message_threads(id) on delete cascade,
    sender_role text check (sender_role in ('Volunteer', 'OrgAdmin', 'PlatformAdmin')),
    content text,
    created_at timestamp default now()
);

-- ------------------------------
-- Table: reviews
-- ------------------------------
create table if not exists reviews (
    id uuid primary key default gen_random_uuid(),
    reviewer_id uuid references volunteer_profiles(id),
    reviewee_id uuid references organizations(id),
    rating int check (rating >= 1 and rating <= 5),
    comment text,
    created_at timestamp default now()
);

-- ------------------------------
-- Table: impact_metrics
-- ------------------------------
create table if not exists impact_metrics (
    id uuid primary key default gen_random_uuid(),
    project_id uuid references projects(id) on delete cascade,
    metric_name text,
    value numeric,
    created_at timestamp default now()
);

-- ------------------------------
-- Table: travel_guides
-- ------------------------------
create table if not exists travel_guides (
    id uuid primary key default gen_random_uuid(),
    title text,
    file_url text,
    created_at timestamp default now()
);
