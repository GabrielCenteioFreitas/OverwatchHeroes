import { t } from "i18next";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { getSelectorsByUserAgent } from "react-device-detect"

export const AddToHomeScreenButton = (props: any) => {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [prompt, setPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event)

      if (!window.matchMedia("(display-mod: standalone)").matches) {
        setShowInstallModal(true)
      }
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = () => {
    if (prompt) {
      prompt.prompt();

      prompt.userChoice.then(() => {
        setPrompt(null);
        setShowInstallModal(false)
      })
    }
  }

  const handleCloseClick = () => {
    setShowInstallModal(false)
  }

  if (!showInstallModal || props.deviceType === "desktop") return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-slate-100 dark:bg-slate-900 w-94 p-4 rounded-xl">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">
              {t("InstallButton.title")}
            </h1>

            <p>
              {t("InstallButton.text")}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={handleInstallClick}
              className="
                bg-slate-700 hover:bg-slate-800 text-slate-100
                px-4 py-2 rounded-lg transition-colors
              "
            >
              {t("InstallButton.installButtonText")}
            </button>

            <button
              onClick={handleCloseClick}
              className="
                bg-transparent border dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-100
              border-slate-400 hover:bg-slate-400 text-slate-900
                px-[15px] py-[7px] rounded-lg transition-colors
              "
            >
              {t("InstallButton.closeButtonText")}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 bg-black opacity-80 -z-10 backdrop-blur"/>
    </div>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { isMobile } = getSelectorsByUserAgent(
    context.req.headers["user-agent"] ?? ""
  )
  
  return {
    props: {
      deviceType: isMobile ? "mobile" : "desktop"
    }
  }
}