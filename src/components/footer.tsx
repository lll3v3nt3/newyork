import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} New York Website</p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Főoldal</Link></li>
              <li><Link href="/latnivalok" className="text-gray-600 hover:text-gray-900">Látnivalók</Link></li>
              <li><Link href="/programok" className="text-gray-600 hover:text-gray-900">Programok</Link></li>
              <li><Link href="/kapcsolat" className="text-gray-600 hover:text-gray-900">Kapcsolat</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

