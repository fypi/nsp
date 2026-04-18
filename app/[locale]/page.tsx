export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            NinesPro
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            永久免费公益工具平台
          </p>
          <div className="flex justify-center gap-4">
            <a href="/en/products" className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
              开始使用
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
