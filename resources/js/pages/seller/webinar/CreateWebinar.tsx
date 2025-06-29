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
        payment_type: 'free',
        price: '',
        original_price: '',
        description: '',
        webinar_link: '',
        start_datetime: '',
        end_datetime: '',
        cover_image_path: null,
        instructions: '',
        terms_and_conditions: '',
        sales_start_datetime: '',
        registration_close_datetime: '',
        max_participants: '',
        redirect_url: '',
        is_affiliatable: false,
        affiliate_commission_percentage: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Fixed: Changed from '/seller/webinar/store' to '/seller/webinars'
        post('/seller/webinars');
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Webinar" />
            
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Create New Webinar</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    {/* Payment Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Payment Type *</label>
                        <select
                            value={data.payment_type}
                            onChange={(e) => setData('payment_type', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                            <option value="pay_what_you_want">Pay What You Want</option>
                        </select>
                        {errors.payment_type && <p className="text-red-500 text-sm mt-1">{errors.payment_type}</p>}
                    </div>

                    {/* Price Fields - Only show if not free */}
                    {data.payment_type !== 'free' && (
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Price *</label>
                                <input
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Original Price (Optional)</label>
                                <input
                                    type="number"
                                    value={data.original_price}
                                    onChange={(e) => setData('original_price', e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                />
                                {errors.original_price && <p className="text-red-500 text-sm mt-1">{errors.original_price}</p>}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Description *</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Describe your webinar..."
                            required
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Webinar Link */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Webinar Link *</label>
                        <input
                            type="url"
                            value={data.webinar_link}
                            onChange={(e) => setData('webinar_link', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://zoom.us/j/..."
                            required
                        />
                        {errors.webinar_link && <p className="text-red-500 text-sm mt-1">{errors.webinar_link}</p>}
                    </div>

                    {/* Date & Time */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date & Time *</label>
                            <input
                                type="datetime-local"
                                value={data.start_datetime}
                                onChange={(e) => setData('start_datetime', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                            {errors.start_datetime && <p className="text-red-500 text-sm mt-1">{errors.start_datetime}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">End Date & Time (Optional)</label>
                            <input
                                type="datetime-local"
                                value={data.end_datetime}
                                onChange={(e) => setData('end_datetime', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                            {errors.end_datetime && <p className="text-red-500 text-sm mt-1">{errors.end_datetime}</p>}
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image (Optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setData('cover_image_path', e.target.files?.[0] as any)}
                            accept="image/jpeg,image/jpg,image/png"
                            className="w-full p-2 border rounded-lg"
                        />
                        <p className="text-sm text-gray-500 mt-1">Accepted formats: JPG, JPEG, PNG. Max size: 2MB</p>
                        {errors.cover_image_path && <p className="text-red-500 text-sm mt-1">{errors.cover_image_path}</p>}
                    </div>

                    {/* Instructions */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Instructions (Optional)</label>
                        <textarea
                            value={data.instructions}
                            onChange={(e) => setData('instructions', e.target.value)}
                            rows={3}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Any special instructions for participants..."
                        />
                        {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Terms and Conditions (Optional)</label>
                        <textarea
                            value={data.terms_and_conditions}
                            onChange={(e) => setData('terms_and_conditions', e.target.value)}
                            rows={3}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter terms and conditions..."
                        />
                        {errors.terms_and_conditions && <p className="text-red-500 text-sm mt-1">{errors.terms_and_conditions}</p>}
                    </div>

                    {/* Sales & Registration Settings */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Sales Start Date & Time (Optional)</label>
                            <input
                                type="datetime-local"
                                value={data.sales_start_datetime}
                                onChange={(e) => setData('sales_start_datetime', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                            {errors.sales_start_datetime && <p className="text-red-500 text-sm mt-1">{errors.sales_start_datetime}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Registration Close Date & Time (Optional)</label>
                            <input
                                type="datetime-local"
                                value={data.registration_close_datetime}
                                onChange={(e) => setData('registration_close_datetime', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                            {errors.registration_close_datetime && <p className="text-red-500 text-sm mt-1">{errors.registration_close_datetime}</p>}
                        </div>
                    </div>

                    {/* Max Participants & Redirect URL */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Max Participants (Optional)</label>
                            <input
                                type="number"
                                value={data.max_participants}
                                onChange={(e) => setData('max_participants', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                min="1"
                                placeholder="Leave empty for unlimited"
                            />
                            {errors.max_participants && <p className="text-red-500 text-sm mt-1">{errors.max_participants}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Redirect URL (Optional)</label>
                            <input
                                type="url"
                                value={data.redirect_url}
                                onChange={(e) => setData('redirect_url', e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                placeholder="https://example.com/thank-you"
                            />
                            {errors.redirect_url && <p className="text-red-500 text-sm mt-1">{errors.redirect_url}</p>}
                        </div>
                    </div>

                    {/* Affiliate Settings */}
                    <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="text-lg font-medium mb-3">Affiliate Settings</h3>
                        
                        <div className="mb-3">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_affiliatable}
                                    onChange={(e) => setData('is_affiliatable', e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm font-medium">Enable affiliate program for this webinar</span>
                            </label>
                        </div>

                        {data.is_affiliatable && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Affiliate Commission Percentage *</label>
                                <input
                                    type="number"
                                    value={data.affiliate_commission_percentage}
                                    onChange={(e) => setData('affiliate_commission_percentage', e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    placeholder="0.00"
                                    required={data.is_affiliatable}
                                />
                                <p className="text-sm text-gray-500 mt-1">Percentage of sales to pay to affiliates (0-100%)</p>
                                {errors.affiliate_commission_percentage && <p className="text-red-500 text-sm mt-1">{errors.affiliate_commission_percentage}</p>}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Creating Webinar...' : 'Create Webinar'}
                        </button>
                    </div>
                </form>
            </div>
        </AppSidebarLayout>
    );
}