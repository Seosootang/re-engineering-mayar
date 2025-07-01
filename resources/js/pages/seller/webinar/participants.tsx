import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type PaginatedResponse, type Participant, type Webinar } from '@/types';
import { Head } from '@inertiajs/react';

interface ParticipantsProps {
    webinar: Webinar;
    participants: PaginatedResponse<Participant>;
}

export default function Participants({ webinar, participants }: ParticipantsProps) {
    return (
        <AppLayout>
            <Head title={`Peserta Webinar: ${webinar.title}`} />
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Peserta</CardTitle>
                        <CardDescription>Webinar: {webinar.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Peserta</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Tanggal Daftar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {participants.data.length > 0 ? (
                                    participants.data.map((participant) => (
                                        <TableRow key={participant.id}>
                                            <TableCell>{participant.user.name}</TableCell>
                                            <TableCell>{participant.user.email}</TableCell>
                                            <TableCell>{new Date(participant.registered_at).toLocaleString('id-ID')}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">
                                            Belum ada peserta yang terdaftar.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
