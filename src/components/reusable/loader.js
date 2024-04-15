import '../../style/loader.css'; 

export default function Loader ({ time }) {
  return (
    <div
    style={{
      position: "absolute",
      zIndex: "10",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(215, 215, 215, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
    >
      {/* <Loader
        className="modal"
        ></Loader> */}
      <div className="loader"> </div>

    </div>
  );
};
