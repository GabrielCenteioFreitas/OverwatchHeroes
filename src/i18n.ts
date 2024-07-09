import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    lng: "en_us",
    fallbackLng: "en_us",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en_us: {
        translation: {
          Home: {
            metaDescription: 'Site with information about all the Overwatch characters'
          },
          HeaderTitle: {
            title: "Overwatch Heroes",
          },
          Search: {
            placeholder: "Search for a hero",
          },
          Roles: {
            damage: "damage",
            support: "support",
            tank: "tank",
          },
          HeroPage: {
            heroInfo: {
              name: "name",
              role: "role",
              location: "location",
              hitpoints: {
                health: "health",
                armor: "armor",
                shield: "shield",
              },
              ariaLabel: "Hero info",
            },
            otherHeroes: {
              ariaLabel: "Other heroes with same role",
            },
            aboutHero: {
              abilities: {
                title: "abilities",
                ariaLabel: "Change ability"
              },
              story: "story",
              ariaLabel: "About the hero",
            }
          },
          ColorTheme: {
            ariaLabel: "Toggle theme",
          },
          Language: {
            ariaLabel: "Change language",
          },
          InstallButton: {
            title: "Install the App",
            text: "Click the button below to install the app on your device.",
            installButtonText: "Install",
            closeButtonText: "Close",
          }
        }
      },
      pt_br: {
        translation: {
          Home: {
            metaDescription: 'Site com informações sobre todos os personagens do jogo Overwatch'
          },
          HeaderTitle: {
            title: "Heróis Overwatch",
          },
          Search: {
            placeholder: "Busque por um herói",
          },
          Roles: {
            damage: "dano",
            support: "suporte",
            tank: "tanque",
          },
          HeroPage: {
            heroInfo: {
              name: "nome",
              role: "função",
              location: "localização",
              hitpoints: {
                health: "vida",
                armor: "armadura",
                shield: "escudo",
              },
              ariaLabel: "Informações do herói",
            },
            otherHeroes: {
              ariaLabel: "Outros heróis de mesma função",
            },
            aboutHero: {
              abilities: {
                title: "habilidades",
                ariaLabel: "Mudar habilidade",
              },
              story: "história",
              ariaLabel: "Sobre o herói",
            },
          },
          ColorTheme: {
            ariaLabel: "Mudar o tema",
          },
          Language: {
            ariaLabel: "Mudar o idioma",
          },
          InstallButton: {
            title: "Instale o aplicativo",
            text: "Clique no botão abaixo para instalar o aplicativo no seu dispositivo.",
            installButtonText: "Instalar",
            closeButtonText: "Fechar",
          }
        }
      },
    },
  });

export default i18n;