import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash: FlashMessage;
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
    [key: string]: unknown; // This allows for additional properties...
    role: 'user' | 'seller';
}

// Webinar
export interface Webinar {
    speaker_image_path: any;
    speaker_name: string;
    speaker_description: string;
    registration_close_datetime: any;
    redirect_url: string;
    is_affiliatable: boolean;
    affiliate_commission_percentage: any;
    id: number;
    title: string;
    description: string;
    cover_image_path?: string;
    payment_type: 'paid' | 'free' | 'pay_what_you_want';
    price?: number;
    original_price?: number;
    start_datetime: string;
    end_datetime?: string;
    webinar_link: string;
    instructions?: string;
    terms_and_conditions?: string;
    max_participants?: number;
    created_at: string;
    learning_materials?: string[];
}

export interface InvoiceWebinar {
    id: number;
    user_id: number;
    webinar_id: number;
    amount: number;
    status: 'pending' | 'paid' | 'failed';
    invoice_code: string;
    paid_at: string | null;
    webinar: Webinar;
    user: User;
}

// Participant
export interface Participant {
    id: number;
    user: User;
    webinar_id: number;
    invoice_webinar_id: number;
    registered_at: string;
}

export interface PaginatedResponse<T> {
    total: ReactNode;
    from: ReactNode;
    to: ReactNode;
    current_page: ReactNode;
    last_page: ReactNode;
    data: T[];
    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface HistoryItem {
    id: string;
    invoice_code: string;
    title: string;
    date: string;
    amount: number;
    type: 'paid' | 'free';
    webinar_id: number;
}

export interface FlashMessage {
    success?: string;
    error?: string;
    [key: string]: any;
}
