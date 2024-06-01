interface MainInfoItemProps {
  title: string;
  text: string;
}

export const InfoItem = ({ title, text }: MainInfoItemProps) => {
  return (
    <div className="flex gap-1">
      <h2 className="font-semibold capitalize">{title}: </h2>
      <span className="capitalize">{text}</span>
    </div>
  );
}
