import Button from "react-bootstrap/Button";

const IconButton = ({
  icon: Icon,
  color = "black",
  size = "20px",
  onClick,
  title,
}) => {
  return (
    <Button
      onClick={onClick}
      title={title}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        //padding: "4px",
        //marginRight: "8px",
      }}
    >
      <Icon style={{ color, fontSize: size }} />
    </Button>
  );
};

export default IconButton;
