import { Button } from '@/components/ui/button';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type Webinar } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Edit, Eye, Trash2, X, Users } from 'lucide-react';
import { useState } from 'react';

interface Props {
    webinars: Webinar[];
}

export default function MyWebinars({ webinars }: Props) {
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        title: '',
        speaker_name: '',
        speaker_description: '',
        speaker_image_path: null as File | null,
        payment_type: 'free',
        price: '',
        original_price: '',
        description: '',
        webinar_link: '',
        start_datetime: '',
        end_datetime: '',
        cover_image_path: null as File | null,
        instructions: '',
        terms_and_conditions: '',
        sales_start_datetime: '',
        registration_close_datetime: '',
        max_participants: '',
        redirect_url: '',
        is_affiliatable: false as boolean,
        affiliate_commission_percentage: '',
    });

    const formatRupiah = (amount: number | string | null | undefined) => {
        if (amount === null || amount === undefined || amount === '') return 'Gratis';
        const numberAmount = Number(amount);
        if (isNaN(numberAmount) || numberAmount === 0) return 'Gratis';
        return `Rp ${numberAmount.toLocaleString('id-ID')}`;
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this webinar?')) {
            router.delete(route('webinars.destroy', id));
        }
    };

    const handleView = (webinar: Webinar) => {
        setSelectedWebinar(webinar);
        setViewModalOpen(true);
    };

    const handleEdit = (webinar: Webinar) => {
        setSelectedWebinar(webinar);
        setData({
            title: webinar.title,
            speaker_name: webinar.speaker_name || '',
            speaker_description: webinar.speaker_description || '',
            speaker_image_path: null,
            payment_type: webinar.payment_type,
            price: webinar.price?.toString() || '',
            original_price: webinar.original_price?.toString() || '',
            description: webinar.description,
            webinar_link: webinar.webinar_link,
            start_datetime: webinar.start_datetime.slice(0, 16),
            end_datetime: webinar.end_datetime ? webinar.end_datetime.slice(0, 16) : '',
            cover_image_path: null,
            instructions: webinar.instructions || '',
            terms_and_conditions: webinar.terms_and_conditions || '',
            sales_start_datetime: webinar.start_datetime ? webinar.start_datetime.slice(0, 16) : '',
            registration_close_datetime: webinar.registration_close_datetime ? webinar.registration_close_datetime.slice(0, 16) : '',
            max_participants: webinar.max_participants?.toString() || '',
            redirect_url: webinar.redirect_url || '',
            is_affiliatable: Boolean(webinar.is_affiliatable),
            affiliate_commission_percentage: webinar.affiliate_commission_percentage?.toString() || '',
        });
        setEditModalOpen(true);
    };

    const handleViewParticipants = (webinar: Webinar) => {
        router.visit(route('seller.webinars.participants.index', webinar.id));
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedWebinar) {
            put(route('webinars.update', selectedWebinar.id), {
                forceFormData: true,
                onFinish: () => {
                    if (Object.keys(errors).length === 0) {
                        setEditModalOpen(false);
                        reset();
                        router.visit('/seller/my-webinars', {
                            replace: true,
                            preserveScroll: true,
                        });
                    }
                },
            });
        }
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (startDate: string, endDate: string | null | undefined) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : null;

        if (now < start) {
            return <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">Upcoming</span>;
        } else if (end && now > end) {
            return <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">Completed</span>;
        } else {
            return <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Live</span>;
        }
    };

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'My Webinars', href: '/seller/my-webinars' }]}>
            <Head title="My Webinars" />

            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">My Webinars</h1>
                </div>

                <div className="grid gap-4">
                    {webinars.length > 0 ? (
                        webinars.map((webinar) => (
                            <div key={webinar.id} className="rounded-lg border p-4 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold">{webinar.title}</h2>
                                        {webinar.speaker_name && (
                                            <p className="mt-1 text-sm text-gray-600">
                                                <span className="font-medium">Speaker:</span> {webinar.speaker_name}
                                                {webinar.speaker_description && (
                                                    <span className="text-gray-500"> - {webinar.speaker_description}</span>
                                                )}
                                            </p>
                                        )}
                                        <p className="mt-1 text-sm text-gray-600">{formatDateTime(webinar.start_datetime)}</p>
                                        <p className="mt-2 line-clamp-2 text-sm text-gray-500">{webinar.description}</p>
                                        <div className="mt-2 flex items-center gap-3">
                                            {getStatusBadge(webinar.start_datetime, webinar.end_datetime)}
                                            <span className="text-sm font-medium text-green-600">
                                                {webinar.payment_type === 'free' ? 'Gratis' : formatRupiah(webinar.price)}
                                            </span>
                                        </div>
                                    </div>
                                    {webinar.cover_image_path && (
                                        <img
                                            src={`/storage/${webinar.cover_image_path}`}
                                            alt={webinar.title}
                                            className="ml-4 h-16 w-24 rounded object-cover"
                                        />
                                    )}
                                </div>

                                <div className="mt-4 flex gap-3">
                                    <Button variant="outline" onClick={() => handleView(webinar)} className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        View
                                    </Button>
                                    <Button variant="outline" onClick={() => handleViewParticipants(webinar)} className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        Participants
                                    </Button>
                                    <Button variant="secondary" onClick={() => handleEdit(webinar)} className="flex items-center gap-2">
                                        <Edit className="h-4 w-4" />
                                        Edit
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleDelete(webinar.id)} className="flex items-center gap-2">
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-lg text-gray-500">No webinars found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* View Modal */}
            {viewModalOpen && selectedWebinar && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="m-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Webinar Details</h2>
                            <button onClick={() => setViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {selectedWebinar.cover_image_path && (
                                <img
                                    src={`/storage/${selectedWebinar.cover_image_path}`}
                                    alt={selectedWebinar.title}
                                    className="h-48 w-full rounded-lg object-cover"
                                />
                            )}

                            <div>
                                <h3 className="text-lg font-semibold">{selectedWebinar.title}</h3>
                                {selectedWebinar.speaker_name && (
                                    <div className="mt-1">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Speaker:</span> {selectedWebinar.speaker_name}
                                        </p>
                                        {selectedWebinar.speaker_description && (
                                            <p className="text-sm text-gray-500">{selectedWebinar.speaker_description}</p>
                                        )}
                                    </div>
                                )}
                                <div className="mt-2 flex items-center gap-3">
                                    {getStatusBadge(selectedWebinar.start_datetime, selectedWebinar.end_datetime)}
                                    <span className="text-sm font-medium text-green-600">
                                        {selectedWebinar.payment_type === 'free'
                                            ? 'Gratis'
                                            : formatRupiah(selectedWebinar.price)}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Start Date</label>
                                    <p className="text-sm">{formatDateTime(selectedWebinar.start_datetime)}</p>
                                </div>
                                {selectedWebinar.end_datetime && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">End Date</label>
                                        <p className="text-sm">{formatDateTime(selectedWebinar.end_datetime)}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Description</label>
                                <p className="mt-1 text-sm">{selectedWebinar.description}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">Webinar Link</label>
                                <p className="mt-1 text-sm text-blue-600">{selectedWebinar.webinar_link}</p>
                            </div>

                            {selectedWebinar.instructions && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Instructions</label>
                                    <p className="mt-1 text-sm">{selectedWebinar.instructions}</p>
                                </div>
                            )}

                            {selectedWebinar.max_participants && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Max Participants</label>
                                    <p className="mt-1 text-sm">{selectedWebinar.max_participants}</p>
                                </div>
                            )}

                            {selectedWebinar.is_affiliatable && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Affiliate Commission</label>
                                    <p className="mt-1 text-sm">{selectedWebinar.affiliate_commission_percentage}%</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => handleViewParticipants(selectedWebinar)} className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                View Participants
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModalOpen && selectedWebinar && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="m-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Edit Webinar</h2>
                            <button onClick={() => setEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Speaker Name</label>
                                    <input
                                        type="text"
                                        value={data.speaker_name}
                                        onChange={(e) => setData('speaker_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.speaker_name && <p className="text-sm text-red-500">{errors.speaker_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Speaker Description</label>
                                    <input
                                        type="text"
                                        value={data.speaker_description}
                                        onChange={(e) => setData('speaker_description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="e.g., CEO of Example Inc."
                                    />
                                    {errors.speaker_description && <p className="text-sm text-red-500">{errors.speaker_description}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Speaker Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('speaker_image_path', e.target.files ? e.target.files[0] : null)}
                                    accept="image/jpeg,image/jpg,image/png"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <p className="text-sm text-gray-500 mt-1">Max size: 2MB</p>
                                {errors.speaker_image_path && <p className="text-sm text-red-500">{errors.speaker_image_path}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Payment Type</label>
                                <select
                                    value={data.payment_type}
                                    onChange={(e) => setData('payment_type', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="free">Free</option>
                                    <option value="paid">Paid</option>
                                    <option value="pay_what_you_want">Pay What You Want</option>
                                </select>
                                {errors.payment_type && <p className="text-sm text-red-500">{errors.payment_type}</p>}
                            </div>

                            {data.payment_type !== 'free' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Original Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.original_price}
                                            onChange={(e) => setData('original_price', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.original_price && <p className="text-sm text-red-500">{errors.original_price}</p>}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Webinar Link</label>
                                <input
                                    type="url"
                                    value={data.webinar_link}
                                    onChange={(e) => setData('webinar_link', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                />
                                {errors.webinar_link && <p className="text-sm text-red-500">{errors.webinar_link}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={data.start_datetime}
                                        onChange={(e) => setData('start_datetime', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.start_datetime && <p className="text-sm text-red-500">{errors.start_datetime}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={data.end_datetime}
                                        onChange={(e) => setData('end_datetime', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.end_datetime && <p className="text-sm text-red-500">{errors.end_datetime}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('cover_image_path', e.target.files ? e.target.files[0] : null)}
                                    accept="image/jpeg,image/jpg,image/png"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <p className="text-sm text-gray-500 mt-1">Max size: 2MB</p>
                                {errors.cover_image_path && <p className="text-sm text-red-500">{errors.cover_image_path}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Instructions</label>
                                <textarea
                                    value={data.instructions}
                                    onChange={(e) => setData('instructions', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Any special instructions for participants..."
                                />
                                {errors.instructions && <p className="text-sm text-red-500">{errors.instructions}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Terms and Conditions</label>
                                <textarea
                                    value={data.terms_and_conditions}
                                    onChange={(e) => setData('terms_and_conditions', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Enter terms and conditions..."
                                />
                                {errors.terms_and_conditions && <p className="text-sm text-red-500">{errors.terms_and_conditions}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sales Start</label>
                                    <input
                                        type="datetime-local"
                                        value={data.sales_start_datetime}
                                        onChange={(e) => setData('sales_start_datetime', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.sales_start_datetime && <p className="text-sm text-red-500">{errors.sales_start_datetime}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Registration Close</label>
                                    <input
                                        type="datetime-local"
                                        value={data.registration_close_datetime}
                                        onChange={(e) => setData('registration_close_datetime', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    {errors.registration_close_datetime && <p className="text-sm text-red-500">{errors.registration_close_datetime}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Max Participants</label>
                                    <input
                                        type="number"
                                        value={data.max_participants}
                                        onChange={(e) => setData('max_participants', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Leave empty for unlimited"
                                    />
                                    {errors.max_participants && <p className="text-sm text-red-500">{errors.max_participants}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Redirect URL</label>
                                    <input
                                        type="url"
                                        value={data.redirect_url}
                                        onChange={(e) => setData('redirect_url', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="https://example.com/thank-you"
                                    />
                                    {errors.redirect_url && <p className="text-sm text-red-500">{errors.redirect_url}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_affiliatable}
                                        onChange={(e) => setData('is_affiliatable', e.target.checked)}
                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Enable Affiliate Program</span>
                                </label>
                            </div>

                            {data.is_affiliatable && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Affiliate Commission (%)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        max="100"
                                        value={data.affiliate_commission_percentage}
                                        onChange={(e) => setData('affiliate_commission_percentage', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="e.g., 10"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">Percentage of sales to pay affiliates (0-100%)</p>
                                    {errors.affiliate_commission_percentage && (
                                        <p className="text-sm text-red-500">{errors.affiliate_commission_percentage}</p>
                                    )}
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Webinar'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppSidebarLayout>
    );
}