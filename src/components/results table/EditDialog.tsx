import { useEffect, useRef } from "react";
import type{ Item } from "../homepage/Home";

export default function EditDialog(
  {
    pointsEditorOpen, 
    setPointsEditorOpen,
    list,
    setList,
    itemToEdit,
    setItemToEdit,
    months
  } : 
  {
    pointsEditorOpen: boolean; 
    setPointsEditorOpen: React.Dispatch<React.SetStateAction<boolean>>;
    list: Item[]; 
    setList: React.Dispatch<React.SetStateAction<Item[]>>;
    itemToEdit: Item | null;
    setItemToEdit:  React.Dispatch<React.SetStateAction<Item | null>>;
    months: string[];
  }) 
    
    {
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
    const closeModal = () => setPointsEditorOpen(false);

    //
    const handleChange = (monthIndex: number, value: string) => {
      const newMonthlyScore = itemToEdit?.monthlyScore;
      for (let i = 0; i < 12; i++) {
       if (monthIndex === i && newMonthlyScore) {
        newMonthlyScore[i] = Number(value);
       }
      }
    }
    //
    const handleUpdate = () => {
      list.forEach((item, index) => {
        let newList;
        if (item.id === itemToEdit?.id) 
        {  
           newList = [...list, list[index].monthlyScore = itemToEdit.monthlyScore]
          return newList;
        } else newList = [...list]
        setList(newList)
        setItemToEdit(null)
        })
        closeModal()
    }
    //
  return (itemToEdit &&
  <dialog ref={pointsEditorDialog}>
    <div className="inner-dialog">
    <h5>Edit {itemToEdit.option}'s points.</h5>
    <button className="points-editor-close" type="button" onClick={closeModal}>X</button>
    <form className="edit-points-form" action="">
      {months.map((month, index) => <div className="form-item" key={index}><label htmlFor={month}>{month}</label>
      <input type="string" id={month} defaultValue={itemToEdit.monthlyScore[index]} onChange={(ev) => handleChange(index, ev.target.value)} /></div>)}
    </form>
    <button type="button" value="submit" onClick={handleUpdate}>Update!</button>
    </div>
  </dialog>
  )
}
