import Link from 'next/link'

const itemsNavbar = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Cinema',
    link: '/cinema'
  },
  {
    name: 'Events',
    link: '/events'
  },
  {
    name: 'Promotions',
    link: '/promotions'
  },
  {
    name: 'Contact',
    link: '/contact'
  }
]

const NavBarComponent = () => {
  return (
    <nav className="w-full bg-transparent border-b-[1px] border-gray-600 backdrop-blur-lg flex flex-row items-center justify-between pl-[40px] pr-10">
      <Link href="/" className="font-montserrat text-[25px] p-1 tracking-[0.2em] text-[#d0edf3] font-bold cursor-pointer glowing-text">CINES DARKOF</Link>
      <div className="flex flex-row items-center gap-x-20">
        <ul className="flex flex-row gap-x-12  p-4">
          {itemsNavbar.map((item) => (
            <li key={item.name}>
              <a className="hover:text-gray-400 transition-all duration-300 ease-in-out" href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
        <div>
          <button className="hover:bg-green-800 transiton-all duration-300 ease-in-out text-[#fff] border border-yellow-300 py-2 px-4 rounded">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBarComponent
