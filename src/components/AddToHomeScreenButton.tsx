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

      prompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          alert('Accepted')
        } else {
          alert('Cancelled')
        }

        setPrompt(null);
        setShowInstallModal(false)
      })
    }
  }

  const handleCloseClick = () => {
    setShowInstallModal(false)
  }

  if (!showInstallModal || props.deviceType === 'desktop') return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white w-94 p-4 rounded-lg shadow-lg'>
        <div className='flex gap-2 items-center'>
          <button
            onClick={handleInstallClick}
            className='bg-blue-500 text-white px-4 py-2 rounded-lg'
          >
            Instalar
          </button>

          <button
            onClick={handleCloseClick}
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded-lg'
          >
            Fechar
          </button>
        </div>
      </div>

      <div className="fixed inset-0 bg-gray-900 opacity-80 -z-10 backdrop-blur"/>
    </div>
  )
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { isMobile } = getSelectorsByUserAgent(
    context.req.headers["user-agent"] ?? ""
  )
  
  return {
    props: {
      deviceType: isMobile ? 'mobile' : 'desktop'
    }
  }
}