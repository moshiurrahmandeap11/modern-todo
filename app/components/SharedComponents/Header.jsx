import Link from 'next/link';

const Header = () => {
    return (
        <header className='bg-white/95 text-black border-b border-gray-200 sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-14 sm:h-16'>
                    
                    {/* Logo Section */}
                    <div className='flex items-center space-x-2'>
                        <span className='text-2xl sm:text-3xl'>📋</span>
                        <h1 className='text-base sm:text-lg md:text-xl font-semibold text-gray-800 
                                     truncate max-w-37.5 sm:max-w-none'>
                            Advance Todo App
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav>
                        <Link 
                            href={"/todo"} 
                            className='inline-flex items-center px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 
                                     bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base 
                                     font-medium rounded-lg transition-colors duration-200 
                                     shadow-sm hover:shadow'
                        >
                            <span className='hidden xs:inline'>Todo Page</span>
                            <span className='xs:hidden'>Todo</span>
                            <svg 
                                className='w-4 h-4 ml-1 sm:ml-2' 
                                fill='none' 
                                stroke='currentColor' 
                                viewBox='0 0 24 24'
                            >
                                <path 
                                    strokeLinecap='round' 
                                    strokeLinejoin='round' 
                                    strokeWidth={2} 
                                    d='M9 5l7 7-7 7' 
                                />
                            </svg>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;