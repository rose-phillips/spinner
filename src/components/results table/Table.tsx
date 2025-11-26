import { useState } from "react";
import type { Item } from "../homepage/Home";
import EditDialog from "./EditDialog";
import crown from "../../assets/images/crown2.png";
export default function Table({
  list,
  setList,
  highestPerMonth,
  setHighestPerMonth,
  months,
  thisYear,
}: {
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
  highestPerMonth: number[];
  setHighestPerMonth: React.Dispatch<React.SetStateAction<number[]>>;
  months: string[];
  thisYear: number;
}) {
  //
  const [pointsEditorOpen, setPointsEditorOpen] = useState<boolean>(false);
  //
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  //
  const handleEdit = (item: Item) => {
    setPointsEditorOpen(true);
    setItemToEdit({ ...item });
  };
  //
  const totalPointsPerPerson = (item: Item) => {
    return item.allScores[thisYear].reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  };
  //

  const everyonesYearlyPoints = list.map((item) => {
    return totalPointsPerPerson(item);
  });
  const highestThisYear = (item: Item) => {
    const total = totalPointsPerPerson(item);
    return total === Math.max(...everyonesYearlyPoints);
  };
  //
  const nameCell = (item: Item) => {
    const yearWinner = highestThisYear(item);
    return (
      <td
        key={item.option}
        className={yearWinner ? "first-td year-winner" : "first-td"}
      >
        <div className="crown-container">
          <img className="crown-image" src={crown} alt="" />
        </div>
        {item.option}
      </td>
    );
  };
  //
  const monthCells = (item: Item) => {
    return item.allScores[thisYear].map((score, index) => (
      <td
        key={`${item.option}-${months[index]}`}
        style={{
          color: score === highestPerMonth[index] ? "chartreuse" : "",
        }}
      >
        {score === 0 && index > new Date().getMonth() ? "" : score}
      </td>
    ));
  };
  //
  const yearCell = (item: Item) => {
    return <td className="total-td year-td">{totalPointsPerPerson(item)}</td>;
  };
  //
  return (
    <>
      <table className="m-5">
        <thead className="">
          <tr>
            <td className="first-td">Person</td>
            {months.map((month) => (
              <td key={month}>{month.substring(0, 3)}</td>
            ))}
            <td className="year-td">{thisYear}</td>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              {nameCell(item)}
              {monthCells(item)}
              {yearCell(item)}

              <td className="edit-td">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(item)}
                >
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </>
  );
}
