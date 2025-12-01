interface TitleWithIconProps {
  title: string;
  icon?: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleWithIconProps> = ({ title, icon, className }) => {
  return (
    <div className={`flex items-center gap-2 my-5 ${className}`}>
      {icon && (
        <div className="w-6 h-6 flex items-center justify-center">
          {icon}
        </div>
      )}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
  );
};

export default Title;
