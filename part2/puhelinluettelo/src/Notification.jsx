const Notification = ({ message, isError}) => {
  if (!message) return null;

  const notificationStyle = {
    color: isError ? "red" : "green",
    background: "lightgrey",
    fontSize: 18,
    border: `2px solid ${isError ? "red" : "green"}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <>
      <div style={notificationStyle}>{message}</div>
    </>
  );
};

export default Notification;
