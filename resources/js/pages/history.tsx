import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { BreadcrumbItem, type HistoryItem, type PaginatedResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';

// Assuming a global 'route' function is available, as is common with Inertia.js and Ziggy.
declare function route(name: string, params?: any): string;

interface HistoryProps {
    history: PaginatedResponse<HistoryItem>;
}

export default function History({ history }: HistoryProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Riwayat Pembelian', href: '#' },
    ];

    // --- FIX ---
    // The paginator from a Laravel backend can sometimes return an object (associative array)
    // instead of a plain array for the 'data' property. `Object.values()` handles this.
    // We add a type assertion `as HistoryItem[]` to ensure TypeScript knows the correct
    // type of the items in the array, resolving the "'item' is of type 'unknown'" error.
    const historyItems = (Array.isArray(history.data)
        ? history.data
        : Object.values(history.data || {})) as HistoryItem[];

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Pembelian" />
            <div className="container mx-auto py-10">
                <h1 className="mb-8 text-3xl font-bold">Riwayat Pembelian Webinar</h1>

                {/* We now check the length of our sanitized `historyItems` array. */}
                {historyItems.length > 0 ? (
                    <div className="space-y-6">
                        {/* We map over the sanitized `historyItems` array. Now 'item' is correctly typed. */}
                        {historyItems.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                <CardHeader className="flex flex-row items-start justify-between gap-4">
                                    <div>
                                        <CardTitle>{item.title}</CardTitle>
                                        <CardDescription>
                                            {item.type === 'paid' ? `Invoice #${item.invoice_code}` : 'Pendaftaran Gratis'} | Tanggal:{' '}
                                            {new Date(item.date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={item.type === 'paid' ? 'default' : 'secondary'}>
                                        {item.type === 'paid' ? 'Lunas' : 'Gratis'}
                                    </Badge>
                                </CardHeader>
                                <CardFooter className="flex items-center justify-between">
                                    <span className="font-semibold">
                                        Total: {item.type === 'paid' ? `Rp${item.amount.toLocaleString('id-ID')}` : 'Rp 0'}
                                    </span>
                                    <Button asChild>
                                        <Link href={route('user.webinars.registered.show', item.webinar_id)}>Lihat Detail Webinar</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">Anda belum melakukan pembelian webinar.</div>
                )}
            </div>
        </AppHeaderLayout>
    );
}
