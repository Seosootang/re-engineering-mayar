// resources/js/layouts/app/app-header-layout.tsx

// 1. Impor hook dan komponen yang dibutuhkan
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner'; // <-- Impor dari sonner
import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
// 2. Impor tipe yang sudah kita perbarui
import { type BreadcrumbItem, type SharedData } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    // 3. Akses props halaman dengan tipe SharedData yang benar
    const { props } = usePage<SharedData>();
    const { flash } = props;

    // 4. Gunakan useEffect untuk menampilkan toast saat ada flash message baru
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]); // Listener ini akan berjalan setiap kali objek 'flash' berubah

    return (
        <AppShell>
            {/* 5. Tempatkan komponen Toaster di sini. Ini WAJIB ada. */}
            <Toaster richColors position="top-center" />
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
