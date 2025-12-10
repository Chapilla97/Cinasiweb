import { useState, useRef } from "react";
import { BsBuilding, BsBriefcase, BsEnvelope } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import type { IconType } from "react-icons";

const DesktopDock = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  type DockItem = {
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
    fallbackIcon?: IconType;
    color: string;
  };

  const icons: DockItem[] = [
    {
      id: "inicio",
      label: "Inicio",
      href: "/",
      icon: (
        <img
          src="/Multimedia/LogoCinasi.png"
          alt="Inicio"
          className="w-full h-full object-contain p-1"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ),
      fallbackIcon: IoHome,
      color: "from-blue-600 to-blue-500",
    },
    {
      id: "nosotros",
      label: "Nosotros",
      href: "/nosotros",
      icon: <BsBuilding size={30} className="text-white" />,
      color: "from-blue-600 to-blue-500",
    },
    {
      id: "servicios",
      label: "Servicios",
      href: "/servicios",
      icon: <BsBriefcase size={30} className="text-white" />,
      color: "from-blue-600 to-blue-500",
    },
    {
      id: "contacto",
      label: "Contacto",
      href: "/contacto",
      icon: <BsEnvelope size={30} className="text-white" />,
      color: "from-blue-600 to-blue-500",
    },
  ];

  return (
    <nav
      aria-label="Header Menu"
      className="fixed top-0 left-0 right-0 hidden md:flex justify-center z-[100] pt-4"
    >
      <div
        ref={dockRef}
        className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 shadow-2xl flex gap-8 items-center"
      >
        {icons.map((item) => {
          // SOLUCIÓN ERROR TS2604: Asignar a variable con Mayúscula
          const FallbackIcon = item.fallbackIcon;

          return (
            <a
              key={item.id}
              href={item.href}
              onMouseEnter={() => setHoveredIcon(item.id)}
              onMouseLeave={() => setHoveredIcon(null)}
              className="group relative flex items-center gap-3 transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-10 h-10 bg-gradient-to-tr ${item.color} rounded-lg flex items-center justify-center shadow-lg`}
              >
                {item.id === "inicio" ? (
                  <>
                    {item.icon}
                    {/* Renderizado seguro */}
                    {FallbackIcon && (
                      <FallbackIcon
                        size={20}
                        className="text-white absolute -z-10"
                      />
                    )}
                  </>
                ) : (
                  item.icon
                )}
              </div>

              <span className="text-white text-sm font-semibold tracking-wide opacity-90 group-hover:text-blue-200">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default DesktopDock;
