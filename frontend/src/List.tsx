import { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Item } from "./ListAndSpinner";

function List({
  list,
  setList,
}: {
  list: Item[];
  setList: React.Dispatch<React.SetStateAction<Item[]>>;
}) {
  const itemNameRef = useRef<null | HTMLInputElement>(null);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (itemNameRef.current?.value === "") return;
    const newItem = {
      id: uuidv4().substr(0, 5),
      option: itemNameRef.current?.value!,
      include: true,
      score: 0,
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

  const handleClearAll = () => {
    const newList = list.map((item) => {
      return { ...item, score: 0 };
    });
    setList(newList);
  };

  useEffect(() => {
    localStorage.setItem("SpinnerApp.list", JSON.stringify(list));
  }, [list]);

  const handleShuffle = () => {
    let shuffledList = list
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
    setList(shuffledList);
  };

  return (
    <>
      <div className="my-auto input-form mx-5">
        <form onSubmit={handleAdd} className="mb-3">
          <input ref={itemNameRef} placeholder="...add person" type="text" />
          <button type="submit">add</button>
        </form>
        <button onClick={handleShuffle} className="mb-3">
          shuffle
        </button>

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
                {item.option}{" "}
                <span className="light-and-small">
                  -&rsaquo; {item.score} points
                </span>
              </label>
            </div>
          ))}
        <button onClick={handleClearAll} className="mt-3">
          clear points
        </button>
      </div>
    </>
  );
}

export default List;
