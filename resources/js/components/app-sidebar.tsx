// Salin dan ganti seluruh file app-sidebar.tsx Anda dengan ini

import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { History, HomeIcon, Plus, Settings2, UserCircle, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: '/seller/settings',
        icon: Settings2,
    },
];

export function AppSidebar() {
    const { props } = usePage();
    const webinar = props.webinar as { id: number | string } | undefined;

    // =================================================================
    // KESALAHAN TIPE SEBELUMNYA ADA DI SINI, INI VERSI YANG SUDAH DIPERBAIKI
    // Tipe ini sekarang secara akurat mendeskripsikan:
    // "Sebuah array [], dari objek {} yang memiliki 'title' dan 'items'"
    // =================================================================
    const mainNavGroups: {
        title: string;
        items: (Omit<NavItem, 'href'> & { href?: string; routeName?: string; disabled?: boolean })[];
    }[] = [
        {
            title: 'Beranda',
            items: [{ title: 'Home', href: '/seller', icon: HomeIcon }],
        },
        {
            title: 'Product',
            items: [{ title: 'Create Webinar', href: '/seller/webinar/create', icon: Plus }],
        },
        {
            title: 'Platform',
            items: [
                { title: 'Kelola Peserta', routeName: 'seller.webinars.participants.index', icon: Users, disabled: !webinar?.id },
                { title: 'History Transaksi', href: '/seller/transactions', icon: History },
            ],
        },
        {
            title: 'Finansial',
            items: [{ title: 'Pemasukan', href: route('seller.income.index'), icon: Wallet }],
        },
        {
            title: 'Akun Saya',
            items: [{ title: 'Akun', href: '/seller/account', icon: UserCircle }],
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/seller" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {mainNavGroups.map((group) => (
                    <div key={group.title} className="px-2 py-2">
                        <div className="px-2 py-1">
                            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">{group.title}</h3>
                        </div>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                let finalHref = item.href ?? '#';
                                if (item.routeName && webinar?.id) {
                                    finalHref = route(item.routeName, { webinar: webinar.id });
                                }

                                return (
                                    <Link
                                        key={item.title}
                                        href={finalHref}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors ${
                                            item.disabled
                                                ? 'cursor-not-allowed opacity-50'
                                                : 'hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                                        }`}
                                        as={item.disabled ? 'span' : 'a'}
                                    >
                                        {item.icon && <item.icon className="h-4 w-4" />}
                                        <span>{item.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}