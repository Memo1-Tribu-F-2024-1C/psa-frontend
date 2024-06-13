import SideBarItem from "./SidebarItem"
import { ISidebarItem } from "./types"

export default function Layout({ children }: { children: any }) {
  const menuItems: ISidebarItem[] = [
    {
      href: "/",
      title: "Inicio",
    },
    {
      href: "/proyectos",
      title: "Proyectos",
    },
    {
      href: "/productos",
      title: "Productos",
    },
    {
      href: "/clientes",
      title: "Clientes",
    },
    {
      href: "/usuarios",
      title: "Usuarios",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#292F36]">
      <header className=" md:w-60 bg-[#3C3F42] sticky py-10 top-0 h-14 flex justify-center  items-center font-semibold uppercase text-white border-r-[3px] dark:border-gray-400">
        PSA - Sistema de gestion  
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-[#3C3F42]  w-full md:w-60 border-r-[3px] dark:border-gray-400">
          <nav>
            <ul>
              {menuItems.map((item) => (
                <SideBarItem {...item} key={item.title} />
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
