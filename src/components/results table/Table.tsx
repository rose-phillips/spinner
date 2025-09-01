import {  useState } from "react";
import type { Item } from "../homepage/Home";
import EditDialog from "./EditDialog";
export default function Table(
  { 
  list, setList, highestPerMonth, setHighestPerMonth, months, thisYear
}: { 
  list: Item[]; 
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
  highestPerMonth: number[];
  setHighestPerMonth: React.Dispatch<React.SetStateAction<number[]>>;
  months: string[];
  thisYear: number;
}
) {
  //
  const [pointsEditorOpen, setPointsEditorOpen] = useState<boolean>(false)
  //
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null)
    //
  const handleEdit = (item: Item) => {
  setPointsEditorOpen(true); 
  setItemToEdit({...item}) 
  }
  //
  return (
    <table className="w-75 m-5">
      <thead className="">
        <tr>
          <td className="first-td">Person</td>
          {months.map((month) => (
            <td key={month}>{month.substring(0,3)}</td>
          ))}
          <td>{thisYear}</td>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td
              key={item.option}
              className="first-td"
              style={{
                color:
                  item.score === highestPerMonth[new Date().getMonth()]
                    ? "chartreuse"
                    : "",
              }}
            >
              {item.option}
            </td>
            {item.allScores[thisYear].map((score, index) => (
              <td
                key={`${item.option}-${months[index]}`}
                style={{
                  color: score === highestPerMonth[index] ? "chartreuse" : "",
                }}
              >
                {score === 0 ? "" : score}
              </td>
            ))}
            <td className="last-td">
              {item.allScores[thisYear].reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
              }, 0)}
              <button className="edit-button" onClick={() => handleEdit(item)}>edit</button>
              <EditDialog 
              pointsEditorOpen={pointsEditorOpen} 
              setPointsEditorOpen={setPointsEditorOpen} 
              list={list} 
              setList={setList} 
              itemToEdit={itemToEdit}
              setItemToEdit={setItemToEdit}
              months={months}
              thisYear={thisYear}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
