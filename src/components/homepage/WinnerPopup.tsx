import Popup from "reactjs-popup";
import type { Item } from "./Home";
import {usePreferenceStore} from "../stores/PreferenceStore";

const WinnerPopup = ({
  open,
  setOpen,
  list,
  setList,
  winner,
  thisYear
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
  winner: Item;
  thisYear: number
}) => {
  const {setLastWinner} = usePreferenceStore(preferences => preferences);
  const closeModal = () => setOpen(false);

  const handleAddMonthlyScore = (id: string) => {
    const currentMonthIndex = new Date().getMonth();
    const newList = list.map((item, index) => {
      if (item.id === id) {
        const newMonthlyScores = item.allScores[thisYear].map((score, index) => {
          if (index === currentMonthIndex) {
            return ++score;
          } else return score;
        });
return {
  ...item,
  allScores: {
    ...item.allScores,
    [thisYear]: newMonthlyScores,
  },
  score: newMonthlyScores[currentMonthIndex],
};
      } else return item;
    });
    setList(newList);
  };

  const handleAddPoint = (id: string, winner: string) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, score: ++item.score };
      } else return item;
    });
    setList(newList);
    setOpen(false);
    handleAddMonthlyScore(id);
    setLastWinner(winner);
  };
  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="winner-popup">
          <button className="popup-close-button" onClick={closeModal}>
            &times;
          </button>
          <div className="winner-popup-inner-content d-flex flex-column align-items-center">
            <h1>{winner.option}</h1>
            <p>you are the winner.</p>
            <button onClick={() => handleAddPoint(winner.id, winner.option)}>+1 point</button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default WinnerPopup;
