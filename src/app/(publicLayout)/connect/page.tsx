import Connect from "./_components/Connect";

export default function ConnectPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Header Section */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Integration Hub</h1>
                                    <p className="text-sm text-gray-600">Connect your favorite tools</p>
                                </div>
                            </div>
                            
                            {/* Progress Indicator */}
                            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">1</div>
                                    <span className="font-medium text-blue-600">Connect</span>
                                </div>
                                <div className="w-8 h-px bg-gray-300"></div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                                    <span>Tickets</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center p-2">
                    <div className="w-full max-w-6xl">
                        {/* Floating Card Container */}
                        <div className="bg-white backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl shadow-gray-500/10 p-2">
                            <Connect />
                        </div>
                    </div>
                </main>

                
            </div>
        </div>
    );
}