import ConfettiExplosion from "react-confetti-explosion";
import {randomHexColorCode} from "../../common/helpers/general";
import {usePreferenceStore} from "../stores/PreferenceStore";

const Confetti = ({ isExploding }: { isExploding: boolean }) => {

  const { confettiCount } = usePreferenceStore(preferences => preferences);

  return (
    <div className="confetti">
      {isExploding && (
        <ConfettiExplosion
          colors={randomHexColorCode(confettiCount)}
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
