import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  return (
    <nav className="border-b px-6 py-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">Home</Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link className="p-4" to="/favorites">Favorites</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
