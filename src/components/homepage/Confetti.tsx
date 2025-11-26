import ConfettiExplosion from "react-confetti-explosion";

const Confetti = ({ isExploding }: { isExploding: boolean }) => {

    /**
     * Generates a set number of random hex values and returns each one as a collective array
     *
     * @param length - The total number of colours to generate
     * @returns Returns an array of colours.
     *
     */
    const randomHexColorCode = (length:number = 3) => {
        let returnHexes = [];
        for(let i=1;i<=length;i++){
            let n = (Math.random() * 0xfffff * 1000000).toString(16);
            returnHexes.push('#' + n.slice(0, 6))
        }
        return returnHexes;
    };

  return (
    <div className="confetti">
      {isExploding && (
        <ConfettiExplosion
          // colors={randomHexColorCode(8)}
          colors={[
            "#10002b",
            "#240046",
            "#3c096c",
            "#5a189a",
            "#7b2cbf",
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
