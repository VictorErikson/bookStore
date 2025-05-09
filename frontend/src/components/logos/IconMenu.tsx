type IconProps = {
  color?: string;
  size?: number;
};

const IconMenu: React.FC<IconProps> = ({ color = "#FFFFFF", size = 24 }) => {
  return (
    <svg
      className="IconMenu"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      fill={color}
    >
      <path d="M148.08-261.08v-55.96h663.84v55.96H148.08Zm0-191.34v-55.96h663.84v55.96H148.08Zm0-191.35v-55.96h663.84v55.96H148.08Z" />
    </svg>
  );
};

export default IconMenu;
