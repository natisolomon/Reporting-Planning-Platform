export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-white text-2xl font-bold">StudentConnect</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Luxury-grade simplicity for empowering leaders, planning programs,
            and driving growth.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Explore</h4>
          <ul className="space-y-2">
            <li><a href="/features" className="hover:text-white">Features</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p>Email: support@studentconnect.com</p>
          <p>Phone: +123 456 789</p>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StudentConnect. Crafted with elegance ✨
      </div>
    </footer>
  );
}
