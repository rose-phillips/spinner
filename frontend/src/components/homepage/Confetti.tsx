import ConfettiExplosion from "react-confetti-explosion";

const Confetti = ({ isExploding }: { isExploding: boolean }) => {
  return (
    <div className="confetti">
      {isExploding && (
        <ConfettiExplosion
          colors={[
            "#10002b",
            "#240046",
            "#3c096c",
            "#5a189a",
            "##7b2cbf",
            "#9d4edd",
            "#c77dff",
            "#e0aaff",
          ]}
          particleSize={25}
          particleCount={400}
          force={1}
          width={3000}
        />
      )}
    </div>
  );
};

export default Confetti;
