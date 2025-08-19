import Popup from "reactjs-popup";
import type { Item } from "./Home";

const WinnerPopup = ({
  open,
  setOpen,
  list,
  setList,
  winner
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
  winner: Item
}) => {
  const closeModal = () => setOpen(false);

  const handleAddMonthlyScore = (id: string) => {
    const currentMonthIndex = new Date().getMonth();
    const newList = list.map((item, index) => {
      if (item.id === id) {
        const newMonthlyScores = item.monthlyScore.map((score, index) => {
          if (index === currentMonthIndex) {
            return ++score;
          } else return score;
        });
        return {
          ...item,
          monthlyScore: newMonthlyScores,
          score: newMonthlyScores[currentMonthIndex],
        };
      } else return item;
    });
    setList(newList);
  };

  const handleAddPoint = (id: string) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, score: ++item.score };
      } else return item;
    });
    setList(newList);
    setOpen(false);
    handleAddMonthlyScore(id);
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
            <button onClick={() => handleAddPoint(winner.id)}>+1 point</button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default WinnerPopup;
