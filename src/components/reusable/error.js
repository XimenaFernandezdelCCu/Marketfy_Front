export default function Error ({ time }) {
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
       
        <div>
            <h3>Our servers are down at the moment!</h3>
            <p>Please try again later.</p>
            <button onClick={()=>window.location.reload()} >Try Again</button>
        </div>
  
      </div>
    );
  };