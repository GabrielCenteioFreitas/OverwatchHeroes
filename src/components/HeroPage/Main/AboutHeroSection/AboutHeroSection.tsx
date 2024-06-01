interface AboutHeroSectionProps {
  hero: {
    name: string;
    role: string;
    description: string;
  };
  roleIcon: string;
}

export const AboutHeroSection = ({ hero, roleIcon }: AboutHeroSectionProps) => {
  return (
    <section>
      <div className="flex gap-2">
        <h2 className="text-3xl font-bold">{hero.name}</h2>
        <div className="size-8 rounded-full bg-slate-400/75 dark:bg-gray-700 p-1.5">
          <img className="size-full object-cover" src={roleIcon} alt={hero.role} />
        </div>
      </div>
      <p className="text-sm text-justify lg:text-base">{hero.description}</p>
    </section>
  );
}
