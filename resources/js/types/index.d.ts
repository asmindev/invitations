export interface Auth {
    user: User;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export type Flash = {
    type: 'success' | 'error' | 'message' | null;
    content: string | null;
};

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: Auth;
    flash: Flash;
};

// Wedding Invitation Models
export interface Guest {
    id: number;
    name: string;
    slug: string;
    phone: string | null;
    pax: number;
    rsvps_count?: number;
    wishes_count?: number;
    rsvps?: Rsvp[];
    created_at: string;
    updated_at: string;
}

export interface Rsvp {
    id: number;
    guest_id: number | null;
    name: string;
    status: 'attending' | 'not_attending';
    pax_confirmed: number;
    guest?: Guest;
    created_at: string;
    updated_at: string;
}

export interface Wish {
    id: number;
    guest_id: number | null;
    name: string;
    message: string;
    guest?: Guest;
    created_at: string;
    updated_at: string;
}

// Pagination
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
