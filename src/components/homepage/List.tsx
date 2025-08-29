import { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Item } from "./Home";

function List({
  list,
  setList,
  highestScoreThisMonth,
  months
}: {
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
  highestScoreThisMonth: number;
  months: string[]
}) {
  const [winnerWording, setWinnerWording] = useState("")
  const itemNameRef = useRef<null | HTMLInputElement>(null);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (itemNameRef.current?.value === "") return;
    const newItem = {
      id: uuidv4().substr(0, 5),
      option: itemNameRef.current?.value!,
      include: true,
      monthlyScore: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      score: 0
    };
    const newList = [...list, newItem];
    setList(newList);
    e.target.reset();
  };

  const handleToggle = (id: string) => {
    const newList = list?.map((item) => {
      if (item.id === id) return { ...item, include: !item.include };
      else return item;
    });
    setList(newList);
  };

  const handleDelete = (id: string) => {
    const newList = list?.filter((item) => item.id !== id);
    setList(newList);
  };


    useEffect(() => {
    localStorage.setItem("SpinnerApp.list", JSON.stringify(list));
    const winners: string[] = []
    list.forEach((item) => {
    if (item.monthlyScore[new Date().getMonth()] === highestScoreThisMonth) {
      winners.push(item.option)
    }
  })
  const wording = winners.length <= 1 ? ` === winning this month` : ` === tied`
    setWinnerWording(wording)
  }, [list, highestScoreThisMonth]);


  return (
    <>
      <div className="my-auto input-form mx-5">
        <form onSubmit={handleAdd} className="mb-3">
          <input ref={itemNameRef} placeholder="...add person" type="text" />
          <button type="submit">add</button>
        </form>
        {list &&
          list?.map((item) => (
            <div key={item.option} className="mb-1">
              <label className="container" key={item.id}>
                <input
                  key={item.id}
                  type="checkbox"
                  checked={item.include}
                  onChange={() => handleToggle(item.id)}
                />{" "}
                <span className="checkmark"></span>
                <span>{item.option}
                {highestScoreThisMonth === item.monthlyScore[new Date().getMonth()] ?  <span className="listWinner">{winnerWording}</span> : <span></span>}
                </span>
                 
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  X
                </button>
              </label>
            </div>
          ))}
      </div>
    </>
  );
}

export default List;
