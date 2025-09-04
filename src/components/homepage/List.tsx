import { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Item } from "./Home";
import greggsLogo from '../../assets/images/greggs-no-text-small.png'

function List({
  list,
  setList,
  highestScoreThisMonth,
  thisYear
}: {
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
  highestScoreThisMonth: number;
  months: string[];
  thisYear: number;
}) {
  const itemNameRef = useRef<null | HTMLInputElement>(null);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (itemNameRef.current?.value === "") return;
    const newItem = {
      id: uuidv4().substr(0, 5),
      option: itemNameRef.current?.value!,
      include: true,
       allScores: {[thisYear]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      score: 0,
      active: true
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
  }, [list]);

  const getItemNameForList = (item: Item) => {
    if (item.allScores[thisYear][new Date().getMonth()] === highestScoreThisMonth) {
      return <span className="green">
        {item.option}
        <img className="greggs-logo" src={greggsLogo} alt="greggs logo" />
        </span>
        
    }
   return <span>{item.option}</span>
  }

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
                 {getItemNameForList(item)}
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
