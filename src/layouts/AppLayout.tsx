import { useEffect, useReducer, useState } from "react";
import { FaHandHoldingHeart, FaCheckCircle, FaFlask } from "react-icons/fa";
import MacTerminal from "../components/global/MacTerminal";
import MobileDock from "../components/global/MobileDock";
import DesktopDock from "../components/global/DesktopDock";
import NotesApp from "../components/global/NotesApp";
import type { Section as NotesSection } from "../components/global/NotesApp";
import GitHubViewer from "../components/global/GitHubViewer";
import ResumeViewer from "../components/global/ResumeViewer";
import MissionControl from "../components/global/MissionControl";
import ContactWidget from "../components/global/ContactWidget";
import WelcomeTour from "../components/global/WelcomeTour";

// NO importamos Spotlight aquí

interface AppLayoutProps {
  backgroundImages: string[];
}

export default function Desktop({ backgroundImages }: AppLayoutProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    if (!backgroundImages || backgroundImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages]);

  type App = "terminal" | "notes" | "github" | "resume" | "spotify";
  type State = { windows: Record<App, boolean> };
  type Action =
    | { type: "OPEN" | "CLOSE" | "TOGGLE"; app: App }
    | { type: "CLOSE_ALL" };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case "OPEN":
        return { windows: { ...state.windows, [action.app]: true } };
      case "CLOSE":
        return { windows: { ...state.windows, [action.app]: false } };
      case "TOGGLE":
        return {
          windows: {
            ...state.windows,
            [action.app]: !state.windows[action.app],
          },
        };
      case "CLOSE_ALL":
        return {
          windows: {
            terminal: false,
            notes: false,
            github: false,
            resume: false,
            spotify: false,
          },
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    windows: {
      terminal: false,
      notes: false,
      github: false,
      resume: false,
      spotify: false,
    },
  });

  const [showTutorial, setShowTutorial] = useState(false);
  const [isMissionControlOpen, setIsMissionControlOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [notesSection, setNotesSection] = useState<NotesSection | undefined>(
    undefined
  );
  const [selectedProjectId, setSelectedProjectId] = useState<
    string | undefined
  >(undefined);

  const activeApps = state.windows;
  const handleAppOpen = (app: App) => dispatch({ type: "OPEN", app });
  const handleAppClose = (app: App) => dispatch({ type: "CLOSE", app });
  const closeAllWindows = () => dispatch({ type: "CLOSE_ALL" });

  const currentImage =
    backgroundImages && backgroundImages.length > 0
      ? backgroundImages[currentBgIndex]
      : "";

  return (
    <div className="relative w-full min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* SECCIÓN HERO */}
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        {currentImage && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
            style={{ backgroundImage: `url('${currentImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-blue-900/30" />

        <DesktopDock />

        <div className="relative z-10 w-full h-full pt-20 pointer-events-none">
          <div className="pointer-events-auto w-full h-full">
            <NotesApp
              isOpen={state.windows.notes}
              onClose={() => handleAppClose("notes")}
              section={notesSection}
            />
            <GitHubViewer
              isOpen={state.windows.github}
              onClose={() => handleAppClose("github")}
              selectedProjectId={selectedProjectId}
            />
            <ResumeViewer
              isOpen={state.windows.resume}
              onClose={() => handleAppClose("resume")}
            />
            <MacTerminal
              isOpen={state.windows.terminal}
              onClose={() => handleAppClose("terminal")}
            />
            <ContactWidget
              open={isContactOpen}
              onClose={() => setIsContactOpen(false)}
            />
            <MissionControl
              isOpen={isMissionControlOpen}
              onClose={() => setIsMissionControlOpen(false)}
              activeApps={activeApps}
              onAppClick={(app) => handleAppOpen(app)}
              onAppClose={(app) => handleAppClose(app)}
            />
          </div>
        </div>

        {/* --- CENTRO: LOGO + EFECTOS --- */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0 pointer-events-auto w-full px-4">
          {/* Contenedor: Zoom al hover (hover:scale-110) y Sin borde */}
          <div className="relative inline-block bg-blue-900/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl transition-transform duration-500 hover:scale-110 cursor-default">
            {/* Brillo */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shine" />

            {/* LOGO: Animación de respiración (animate-breathing) */}
            <img
              src="/Multimedia/LogoCinasi.png"
              alt="Logotipo Cinasi"
              className="w-64 md:w-96 h-auto object-contain drop-shadow-2xl relative z-10 animate-breathing"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN INFORMATIVA */}
      <div className="relative z-20 bg-slate-50">
        <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block bg-white/60 backdrop-blur-md border border-blue-200/50 rounded-[3rem] p-10 shadow-xl transition-transform duration-500 hover:scale-105 cursor-default max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 drop-shadow-sm">
                Excelencia Científica al Servicio de la Vida
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-700 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-slate-700 leading-relaxed font-medium">
                En <span className="font-bold text-blue-800">CINASI</span>,
                garantizamos que cada medicamento sea seguro y eficaz. A través
                de estudios de{" "}
                <strong>
                  Bioequivalencia, Farmacocinética y Fases Clínicas
                </strong>
                , conectamos el desarrollo farmacéutico con el bienestar global.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Tarjeta 1 */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl min-h-[500px] transition-transform duration-500 hover:scale-105 cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/Multimedia/1.- Fondo de pantalla para GRUPO.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-blue-950/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 top-32 p-6 flex flex-col justify-end">
                <div className="bg-black/20 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-lg flex flex-col justify-center text-white backdrop-brightness-110 hover:bg-black/30 transition-colors">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white shadow-sm backdrop-blur-sm">
                    <FaFlask size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 drop-shadow-md">
                    Infraestructura de Vanguardia
                  </h3>
                  <p className="font-medium text-sm mb-4 leading-relaxed opacity-95 text-blue-50">
                    Instalaciones diseñadas para la precisión científica
                    absoluta.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0 drop-shadow-sm" />
                      <span className="text-sm font-semibold">
                        Unidad Clínica 24/7.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0 drop-shadow-sm" />
                      <span className="text-sm font-semibold">
                        Cromatografía de alta resolución.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl min-h-[500px] transition-transform duration-500 hover:scale-105 cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/Multimedia/1.- Fondo de pantalla para UNEBI.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-blue-950/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 top-32 p-6 flex flex-col justify-end">
                <div className="bg-black/20 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-lg flex flex-col justify-center text-white backdrop-brightness-110 hover:bg-black/30 transition-colors">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 text-white shadow-sm backdrop-blur-sm">
                    <FaHandHoldingHeart size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 drop-shadow-md">
                    Responsabilidad Social y Ética
                  </h3>
                  <p className="font-medium text-sm mb-4 leading-relaxed opacity-95 text-blue-50">
                    Protegemos la vida humana y animal detrás de cada dato.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0 drop-shadow-sm" />
                      <span className="text-sm font-semibold">
                        Seguridad de voluntarios.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0 drop-shadow-sm" />
                      <span className="text-sm font-semibold">
                        Cumplimiento COFEPRIS.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-slate-900 py-8 text-center text-blue-200 text-sm border-t border-blue-800">
          <p>
            &copy; {new Date().getFullYear()} CINASI. Todos los derechos
            reservados.
          </p>
        </div>
      </div>

      <MobileDock
        onGitHubClick={() => handleAppOpen("github")}
        onNotesClick={() => handleAppOpen("notes")}
        onResumeClick={() => handleAppOpen("resume")}
        onTerminalClick={() => handleAppOpen("terminal")}
      />

      <WelcomeTour
        open={showTutorial}
        onClose={() => {
          setShowTutorial(false);
          localStorage.setItem("hasCompletedTutorial", "true");
        }}
        actions={{
          openSpotlight: () => {},
          openMissionControl: () => setIsMissionControlOpen(true),
          openNotes: () => handleAppOpen("notes"),
          openGitHub: () => handleAppOpen("github"),
          openContact: () => setIsContactOpen(true),
          closeAll: closeAllWindows,
        }}
      />
    </div>
  );
}
