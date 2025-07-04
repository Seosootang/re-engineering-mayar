import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PaginatedResponse, type Participant, type Webinar } from '@/types';
import { Head } from '@inertiajs/react';
import { Users, Calendar, Mail, User } from 'lucide-react';

interface ParticipantsProps {
    webinar: Webinar;
    participants: PaginatedResponse<Participant>;
}

export default function Participants({ webinar, participants }: ParticipantsProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout>
            <Head title={`Peserta Webinar: ${webinar.title}`} />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Users className="h-8 w-8 text-indigo-600" />
                        <h1 className="text-3xl font-bold text-gray-900">Daftar Peserta</h1>
                    </div>
                    <p className="text-gray-600 text-lg">{webinar.title}</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                    <Card className="border-blue-200 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-blue-600">Total Peserta</p>
                                    <p className="text-3xl font-bold text-blue-900">{participants.total}</p>
                                </div>
                                <div className="rounded-full bg-blue-100 p-3">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Participants Table */}
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
                        <CardTitle className="text-xl text-gray-900">Peserta Terdaftar</CardTitle>
                        <CardDescription className="text-gray-600">
                            Daftar lengkap peserta yang telah mendaftar untuk webinar ini
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
                                        <TableHead className="font-semibold text-gray-900 py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-indigo-600" />
                                                Nama Peserta
                                            </div>
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-900 py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-indigo-600" />
                                                Email
                                            </div>
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-900 py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-indigo-600" />
                                                Tanggal Daftar
                                            </div>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {participants.data.length > 0 ? (
                                        participants.data.map((participant, index) => (
                                            <TableRow 
                                                key={participant.id} 
                                                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                                }`}
                                            >
                                                <TableCell className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-indigo-700">
                                                                {participant.user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{participant.user.name}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 px-6">
                                                    <div className="text-gray-700">{participant.user.email}</div>
                                                </TableCell>
                                                <TableCell className="py-4 px-6">
                                                    <div className="text-gray-700">{formatDate(participant.registered_at)}</div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-12">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <Users className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-medium text-gray-900">Belum ada peserta</p>
                                                        <p className="text-gray-600">Peserta akan muncul di sini setelah mendaftar</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination Info */}
                {participants.data.length > 0 && (
                    <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
                        <p>
                            Menampilkan {participants.from} sampai {participants.to} dari {participants.total} peserta
                        </p>
                        <p>
                            Halaman {participants.current_page} dari {participants.last_page}
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}