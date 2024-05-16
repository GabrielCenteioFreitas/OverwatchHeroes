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
            name: "name",
            role: "role",
            location: "location",
            hitpoints: {
              health: "health",
              armor: "armor",
              shield: "shield",
            },
            abilities: "abilities",
            story: "story",
          }
        }
      },
      pt_br: {
        translation: {
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
            name: "nome",
            role: "função",
            location: "localização",
            hitpoints: {
              health: "vida",
              armor: "armadura",
              shield: "escudo",
            },
            abilities: "habilidades",
            story: "história",
          }
        }
      },
    },
  });

export default i18n;