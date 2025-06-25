interface HeroSectionProps {
    title?: string;
    subtitle?: string;
    description?: string;
    showSearch?: boolean;
    searchPlaceholder?: string;
}

export default function HeroSection({ 
    title = "Past Webinar",
    subtitle = "New Historical Data",
    description = "Kumpulan webinar \"Sengar Bersama Praktisi\" dari berbagai topik seputar digital marketing yang dapat membantu tumbuh bisnis Anda.",
    showSearch = true,
    searchPlaceholder = "Search webinars..."
}: HeroSectionProps) {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 px-4 mb-8 rounded-xl">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full text-sm mb-4">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    {subtitle}
                </div>
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-gray-300 text-lg mb-6">
                    {description}
                </p>
                {showSearch && (
                    <div className="max-w-md mx-auto">
                        <input 
                            type="text" 
                            placeholder={searchPlaceholder}
                            className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
