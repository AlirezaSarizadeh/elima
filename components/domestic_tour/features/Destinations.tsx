"use client";

export default function Destinations() {
    const destinations = [
        { title: "جزیره‌ ی کیش", image: "https://picsum.photos/400/300?1" },
        { title: "جزیره‌ ی کیش", image: "https://picsum.photos/400/300?2" },
        { title: "جزیره‌ ی کیش", image: "https://picsum.photos/400/300?3" },
        { title: "جزیره‌ ی کیش", image: "https://picsum.photos/400/300?4" },
    ];

    return (
        <section
            className="w-full py-14 bg-[#7A8F9E]"
            style={{
                // backgroundImage: "url('https://picsum.photos/1200/600')",
                // backgroundSize: "cover",
                // backgroundPosition: "center",
                backgroundColor: ''
            }}
        >
            {/* Overlay (optional) */}
            <div className="max-w-7xl mx-auto px-0 text-center">

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-10">
                    با بهترین مقصد ها همسفر الیما شو!
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">

                    {destinations.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-3 overflow-hidden"
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                className="w-full h-48 object-cover rounded-xl"
                                alt={item.title}
                            />

                            {/* Title */}
                            <p className="mt-6 font-semibold text-gray-800 text-lg">
                                {item.title}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}
