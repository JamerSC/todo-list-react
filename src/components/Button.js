import Button from "react-bootstrap/Button";
// size sm, md, lg
const CustomButton = ({
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  children,
  disabled = false,
  title,
  icon: Icon, // passing icon as component
  iconPosition = "left", // left or right
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="d-flex align-items-center gap-1"
    >
      {Icon && iconPosition === "left" && <Icon />}
      {children}
      {Icon && iconPosition === "right" && <Icon />}
    </Button>
  );
};

//✅ FIXED: Render the icon component
// const CustomIcon = ({ icon: Icon }) => {
//   return <Icon />;
// };

export default CustomButton;
