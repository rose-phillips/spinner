import { useEffect, useRef } from "react";
import type { Item } from "../homepage/Home";

export default function EditDialog({
  pointsEditorOpen,
  setPointsEditorOpen,
  list,
  setList,
  itemToEdit,
  setItemToEdit,
  months,
  thisYear,
}: {
  pointsEditorOpen: boolean;
  setPointsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
  itemToEdit: Item | null;
  setItemToEdit: React.Dispatch<React.SetStateAction<Item | null>>;
  months: string[];
  thisYear: number;
}) {
  //
  const pointsEditorDialog = useRef<HTMLDialogElement | null>(null);
  //
  useEffect(() => {
    if (pointsEditorOpen) {
      pointsEditorDialog.current?.showModal();
    } else {
      pointsEditorDialog.current?.close();
    }
  }, [pointsEditorOpen]);
  //
  const closeModal = () => {
    setItemToEdit(null);
    setPointsEditorOpen(false);
  };

  //
  const handleChange = (monthIndex: number, value: string) => {
    const newMonthlyScore = itemToEdit?.allScores[thisYear];
    for (let i = 0; i < 12; i++) {
      if (monthIndex === i && newMonthlyScore) {
        newMonthlyScore[i] = Number(value);
      }
    }
  };
  //
  const handleUpdate = () => {
    list.forEach((item, index) => {
      let newList;
      if (item.id === itemToEdit?.id) {
        if (itemToEdit.image && itemToEdit.image?.uri.length > 0) {
          newList = [
            ...list,
            ((list[index].allScores = itemToEdit.allScores),
            (list[index].image = itemToEdit.image)),
          ];
          return newList;
        } else if (itemToEdit.image && itemToEdit.image?.uri.length === 0) {
          newList = [
            ...list,
            ((list[index].allScores = itemToEdit.allScores),
            delete list[index].image),
          ];
          return newList;
        } else {
          newList = [...list, (list[index].allScores = itemToEdit.allScores)];
          return newList;
        }
      } else {
        newList = [...list];
      }
      setList(newList);
      setItemToEdit(null);
    });
    closeModal();
  };
  //
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (itemToEdit) {
      const newItem = {
        ...itemToEdit,
        image: {
          uri: "",
        },
      };
      newItem.image.uri = e.target.value;
      setItemToEdit(newItem);
    }
  };
  //
  return (
    itemToEdit && (
      <dialog ref={pointsEditorDialog}>
        <div className="inner-dialog">
          <h5>Edit {itemToEdit.option}'s points.</h5>
          <button
            className="points-editor-close"
            type="button"
            onClick={closeModal}
          >
            X
          </button>
          <form className="edit-points-form" action="">
            {months.map((month, index) => (
              <div className="form-item" key={index}>
                <label htmlFor={month}>{month}</label>
                <input
                  type="string"
                  id={month}
                  defaultValue={itemToEdit.allScores[thisYear][index]}
                  onChange={(ev) => handleChange(index, ev.target.value)}
                />
              </div>
            ))}
          </form>
          <form className="profile-image-form" action="">
            <label htmlFor="image-url">image url:</label>
            <input
              value={itemToEdit.image?.uri}
              type="text"
              name="image-url"
              id="image-url"
              onChange={(e) => handleImageChange(e)}
            />
          </form>
          <button type="button" value="submit" onClick={handleUpdate}>
            Update {itemToEdit.option}'s profile
          </button>
        </div>
      </dialog>
    )
  );
}
