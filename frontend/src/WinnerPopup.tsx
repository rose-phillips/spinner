import Popup from "reactjs-popup";
import type { Item } from "./ListAndSpinner";

const WinnerPopup = ({
  open,
  setOpen,
  list,
  setList,
  winner,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
  winner: Item;
}) => {
  const closeModal = () => setOpen(false);

  const handleAddPoint = (id: string) => {
    const newList = list.map((item) => {
      if (item.id === id) return { ...item, score: ++item.score };
      else return item;
    });
    setList(newList);
    setOpen(false);
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
