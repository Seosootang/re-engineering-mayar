import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/seller' },
    { title: 'My Webinars', href: '/seller/webinars/my' },
    { title: 'Create Webinar', href: '/seller/webinar/create' },
];

export default function CreateWebinar() {
    const { data, setData, post, processing, errors } = useForm({
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
        is_affiliatable: false,
        affiliate_commission_percentage: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use forceFormData to ensure file uploads are handled correctly.
        post('/seller/webinars', {
            forceFormData: true,
        });
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Webinar" />
            
            <div className="p-4 md:p-6">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Webinar</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* --- Main Webinar Details --- */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('title', e.target.value)}
                                        placeholder="Enter webinar title..."
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                        rows={5}
                                        placeholder="Describe your webinar..."
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="cover_image_path">Webinar Cover Image (Optional)</Label>
                                    <Input
                                        id="cover_image_path"
                                        type="file"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('cover_image_path', e.target.files ? e.target.files[0] : null)}
                                        accept="image/jpeg,image/jpg,image/png"
                                    />
                                    <p className="text-sm text-muted-foreground mt-1">Max size: 2MB</p>
                                    {errors.cover_image_path && <p className="text-red-500 text-sm mt-1">{errors.cover_image_path}</p>}
                                </div>
                            </div>

                            {/* --- Speaker Details --- */}
                            <Card className="bg-muted/40">
                                <CardHeader>
                                    <CardTitle className="text-lg">Speaker Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="speaker_name">Speaker Name *</Label>
                                            <Input
                                                id="speaker_name"
                                                type="text"
                                                value={data.speaker_name}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('speaker_name', e.target.value)}
                                                placeholder="Enter speaker's name..."
                                                required
                                            />
                                            {errors.speaker_name && <p className="text-red-500 text-sm mt-1">{errors.speaker_name}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="speaker_description">Speaker Description (Optional)</Label>
                                            <Input
                                                id="speaker_description"
                                                type="text"
                                                value={data.speaker_description}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('speaker_description', e.target.value)}
                                                placeholder="e.g., CEO of Example Inc."
                                            />
                                            {errors.speaker_description && <p className="text-red-500 text-sm mt-1">{errors.speaker_description}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="speaker_image_path">Speaker Image (Optional)</Label>
                                        <Input
                                            id="speaker_image_path"
                                            type="file"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('speaker_image_path', e.target.files ? e.target.files[0] : null)}
                                            accept="image/jpeg,image/jpg,image/png"
                                        />
                                        <p className="text-sm text-muted-foreground mt-1">Max size: 2MB</p>
                                        {errors.speaker_image_path && <p className="text-red-500 text-sm mt-1">{errors.speaker_image_path}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* --- Pricing and Payment --- */}
                             <Card className="bg-muted/40">
                                <CardHeader>
                                    <CardTitle className="text-lg">Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="payment_type">Payment Type *</Label>
                                        <Select onValueChange={(value: string) => setData('payment_type', value)} value={data.payment_type}>
                                            <SelectTrigger id="payment_type">
                                                <SelectValue placeholder="Select payment type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="free">Free</SelectItem>
                                                <SelectItem value="paid">Paid</SelectItem>
                                                <SelectItem value="pay_what_you_want">Pay What You Want</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.payment_type && <p className="text-red-500 text-sm mt-1">{errors.payment_type}</p>}
                                    </div>
                                    {data.payment_type !== 'free' && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label htmlFor="price">Price *</Label>
                                                <Input
                                                    id="price" type="number" value={data.price}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('price', e.target.value)}
                                                    min="0" step="any" placeholder="0" required={data.payment_type !== 'free'}
                                                />
                                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                            </div>
                                            <div>
                                                <Label htmlFor="original_price">Original Price (Optional)</Label>
                                                <Input
                                                    id="original_price" type="number" value={data.original_price}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('original_price', e.target.value)}
                                                    min="0" step="any" placeholder="0"
                                                />
                                                {errors.original_price && <p className="text-red-500 text-sm mt-1">{errors.original_price}</p>}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* --- Schedule and Access --- */}
                             <Card className="bg-muted/40">
                                <CardHeader>
                                    <CardTitle className="text-lg">Schedule & Access</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div>
                                        <Label htmlFor="webinar_link">Webinar Link *</Label>
                                        <Input
                                            id="webinar_link" type="url" value={data.webinar_link}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('webinar_link', e.target.value)}
                                            placeholder="https://zoom.us/j/..." required
                                        />
                                        {errors.webinar_link && <p className="text-red-500 text-sm mt-1">{errors.webinar_link}</p>}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="start_datetime">Start Date & Time *</Label>
                                            <Input
                                                id="start_datetime" type="datetime-local" value={data.start_datetime}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('start_datetime', e.target.value)} required
                                            />
                                            {errors.start_datetime && <p className="text-red-500 text-sm mt-1">{errors.start_datetime}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="end_datetime">End Date & Time (Optional)</Label>
                                            <Input
                                                id="end_datetime" type="datetime-local" value={data.end_datetime}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('end_datetime', e.target.value)}
                                            />
                                            {errors.end_datetime && <p className="text-red-500 text-sm mt-1">{errors.end_datetime}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* --- Additional Settings --- */}
                             <Card className="bg-muted/40">
                                <CardHeader>
                                    <CardTitle className="text-lg">Additional Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div>
                                        <Label htmlFor="instructions">Instructions (Optional)</Label>
                                        <Textarea
                                            id="instructions" value={data.instructions}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('instructions', e.target.value)}
                                            rows={3} placeholder="Any special instructions for participants..."
                                        />
                                        {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
                                    </div>
                                    <div>
                                        <Label htmlFor="terms_and_conditions">Terms and Conditions (Optional)</Label>
                                        <Textarea
                                            id="terms_and_conditions" value={data.terms_and_conditions}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('terms_and_conditions', e.target.value)}
                                            rows={3} placeholder="Enter terms and conditions..."
                                        />
                                        {errors.terms_and_conditions && <p className="text-red-500 text-sm mt-1">{errors.terms_and_conditions}</p>}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="sales_start_datetime">Sales Start (Optional)</Label>
                                            <Input
                                                id="sales_start_datetime" type="datetime-local" value={data.sales_start_datetime}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('sales_start_datetime', e.target.value)}
                                            />
                                            {errors.sales_start_datetime && <p className="text-red-500 text-sm mt-1">{errors.sales_start_datetime}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="registration_close_datetime">Registration Close (Optional)</Label>
                                            <Input
                                                id="registration_close_datetime" type="datetime-local" value={data.registration_close_datetime}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('registration_close_datetime', e.target.value)}
                                            />
                                            {errors.registration_close_datetime && <p className="text-red-500 text-sm mt-1">{errors.registration_close_datetime}</p>}
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="max_participants">Max Participants (Optional)</Label>
                                            <Input
                                                id="max_participants" type="number" value={data.max_participants}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('max_participants', e.target.value)}
                                                min="1" placeholder="Leave empty for unlimited"
                                            />
                                            {errors.max_participants && <p className="text-red-500 text-sm mt-1">{errors.max_participants}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="redirect_url">Redirect URL (Optional)</Label>
                                            <Input
                                                id="redirect_url" type="url" value={data.redirect_url}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('redirect_url', e.target.value)}
                                                placeholder="https://example.com/thank-you"
                                            />
                                            {errors.redirect_url && <p className="text-red-500 text-sm mt-1">{errors.redirect_url}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            {/* --- Affiliate Settings --- */}
                            <Card className="bg-muted/40">
                                <CardHeader>
                                    <CardTitle className="text-lg">Affiliate Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_affiliatable"
                                            checked={data.is_affiliatable}
                                            onCheckedChange={(checked: boolean) => setData('is_affiliatable', checked)}
                                        />
                                        <Label htmlFor="is_affiliatable" className="font-medium leading-none">Enable affiliate program</Label>
                                    </div>
                                    {data.is_affiliatable && (
                                        <div>
                                            <Label htmlFor="affiliate_commission_percentage">Commission Percentage *</Label>
                                            <Input
                                                id="affiliate_commission_percentage" type="number" value={data.affiliate_commission_percentage}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('affiliate_commission_percentage', e.target.value)}
                                                min="0" max="100" step="any" placeholder="e.g., 10" required={data.is_affiliatable}
                                            />
                                            <p className="text-sm text-muted-foreground mt-1">Percentage of sales to pay affiliates (0-100%)</p>
                                            {errors.affiliate_commission_percentage && <p className="text-red-500 text-sm mt-1">{errors.affiliate_commission_percentage}</p>}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                            
                            {/* --- Submit Button --- */}
                            <div className="pt-4 flex justify-end">
                                <Button type="submit" disabled={processing} size="lg">
                                    {processing ? 'Creating Webinar...' : 'Create Webinar'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppSidebarLayout>
    );
}
