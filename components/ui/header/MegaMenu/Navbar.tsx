import { MegaMenu } from "./MegaMenu"
export const Navbar = () => {
  return (
    <header className="w-full bg-white shadow">
      <div className="max-w-7xl px-4 mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-lg font-bold">MyApp</div>
        <nav className="flex items-center gap-6">
          <MegaMenu />
          <a href="/about" className="text-gray-800 hover:text-blue-600">About</a>
          <a href="/contact" className="text-gray-800 hover:text-blue-600">Contact</a>
        </nav>
      </div>
    </header>
  )
}
