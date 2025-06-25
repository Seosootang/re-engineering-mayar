import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/seller',
    },
    {
        title: 'Create Webinar',
        href: '/seller/webinar/create',
    },
];

export default function CreateWebinar() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        image: null,
        webinar_url: '',
        description: '',
        terms_conditions: '',
        category: '',
        date: '',
        speaker: '',
        max_slots: 100,
        price: 0,
        original_price: 0,
        registration_deadline: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/seller/webinar/store');
    };

    const categories = [
        'Cybersecurity', 'Digital Marketing', 'Remote Work', 'SEO Marketing', 
        'Content Marketing', 'Website Security', 'Business', 'Technology'
    ];

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Webinar" />
            
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Create New Webinar</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter webinar title..."
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Image *</label>
                        <input
                            type="file"
                            onChange={(e) => setData('image', e.target.files?.[0] as any)}
                            accept="image/*"
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Webinar URL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Webinar URL/Link *</label>
                        <input
                            type="url"
                            value={data.webinar_url}
                            onChange={(e) => setData('webinar_url', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://zoom.us/j/..."
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description *</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Describe your webinar..."
                            required
                        />
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Syarat dan Ketentuan</label>
                        <textarea
                            value={data.terms_conditions}
                            onChange={(e) => setData('terms_conditions', e.target.value)}
                            rows={2}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter terms and conditions..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Category *</label>
                            <select
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            >
                                <option value="">Select category...</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Speaker */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Speaker *</label>
                            <input
                                type="text"
                                value={data.speaker}
                                onChange={(e) => setData('speaker', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                placeholder="Speaker name..."
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Date *</label>
                            <input
                                type="datetime-local"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>

                        {/* Registration Deadline */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Registration Deadline *</label>
                            <input
                                type="datetime-local"
                                value={data.registration_deadline}
                                onChange={(e) => setData('registration_deadline', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Max Slots */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Max Slots *</label>
                            <input
                                type="number"
                                value={data.max_slots}
                                onChange={(e) => setData('max_slots', parseInt(e.target.value))}
                                className="w-full p-2 border rounded-lg"
                                min="1"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Harga *</label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', parseInt(e.target.value))}
                                className="w-full p-2 border rounded-lg"
                                min="0"
                                placeholder="0"
                                required
                            />
                        </div>

                        {/* Original Price */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Harga Coret (opsional)</label>
                            <input
                                type="number"
                                value={data.original_price}
                                onChange={(e) => setData('original_price', parseInt(e.target.value))}
                                className="w-full p-2 border rounded-lg"
                                min="0"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50"
                        >
                            {processing ? 'Creating...' : 'Create Webinar'}
                        </button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}