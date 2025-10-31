import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarItem,
} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
  moduleColor?: string;
  onLogout?: () => void;
  userEmail?: string;
  onNotificationsClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  moduleColor = "#990000", // Color por defecto (rojo ECI)
  onLogout,
  userEmail = "zoey@example.com",
  onNotificationsClick
}) => {
  return (
    <NextUINavbar 
      isBordered 
      maxWidth="full" 
      position="static" 
      style={{ backgroundColor: moduleColor }}
      className="px-2 sm:px-4 lg:px-6 transition-colors duration-300"
    >
      <NavbarBrand className="font-bold text-xl tracking-tight text-white">
        ECI Bienestar
      </NavbarBrand>

      <NavbarContent as="div" justify="end" className="gap-4 sm:gap-6">
        {/* Ícono de notificaciones */}
        <NavbarItem 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onNotificationsClick}
        >
          <FontAwesomeIcon icon={faBell} size="lg" color="white"/>
        </NavbarItem>

        {/* Dropdown de usuario */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="hover:opacity-80 transition-opacity">
              <FontAwesomeIcon icon={faUser} size="lg" color="white"/>
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Sesión iniciada como</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{userEmail}</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        
        {/* Ícono de logout */}
        <NavbarItem 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} size="lg" color="white"/>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default Navbar;