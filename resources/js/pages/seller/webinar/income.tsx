import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type InvoiceWebinar, type PaginatedResponse } from '@/types';
import { Head } from '@inertiajs/react';

interface IncomeProps {
    transactions: PaginatedResponse<InvoiceWebinar>;
}

export default function Index({ transactions }: IncomeProps) {
    return (
        <AppSidebarLayout>
            <Head title="Riwayat Pemasukan" />
            <div className="space-y-6 p-4">
                <h1 className="text-2xl font-bold">Riwayat Pemasukan</h1>
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="text-lg leading-none font-semibold tracking-tight">Transaksi Terbaru</h3>
                        <p className="text-sm text-muted-foreground">Daftar semua pemasukan dari pendaftaran webinar.</p>
                    </div>
                    <div className="p-0">
                        <div className="overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Pemasukan</th>
                                        <th className="hidden h-12 px-4 text-left align-middle font-medium text-muted-foreground md:table-cell">
                                            Detail
                                        </th>
                                        <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {transactions.data.map((trx) => (
                                        <tr key={trx.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-medium text-green-600">+ Rp {trx.amount.toLocaleString('id-ID')}</td>
                                            <td className="hidden p-4 align-middle text-muted-foreground md:table-cell">
                                                <span>
                                                    Pendaftaran webinar <strong>{trx.webinar.title}</strong> oleh <strong>{trx.user.name}</strong>
                                                </span>
                                            </td>
                                            <td className="p-4 text-right align-middle text-muted-foreground">
                                                {new Date(trx.paid_at!).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
