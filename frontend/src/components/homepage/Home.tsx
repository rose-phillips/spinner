import { useState } from "react";
import List from "./List";
import Spinner from "./Spinner";
import WinnerPopup from "./WinnerPopup";
import Confetti from "./Confetti";

export interface Item {
  id: string;
  option: string;
  include: boolean;
  score: number;
}

const Home = () => {
  const [list, setList] = useState<Item[]>(() => {
    const saved = localStorage.getItem("SpinnerApp.list");
    const initialValue = JSON.parse(saved!);
    return initialValue || "";
  });

  const [open, setOpen] = useState<boolean>(false);
  const [winner, setWinner] = useState<Item>({
    id: "id",
    option: "option",
    include: true,
    score: 0,
  });

  const [isExploding, setIsExploding] = useState<boolean>(false);

  return (
    <div className="d-flex justify-content-center flex-wrap-reverse m-auto">
      <List list={list} setList={setList} />
      <Spinner
        list={list}
        setOpen={setOpen}
        winner={winner}
        setWinner={setWinner}
        setIsExploding={setIsExploding}
      />
      <WinnerPopup
        open={open}
        setOpen={setOpen}
        list={list}
        setList={setList}
        winner={winner}
      />
      <Confetti isExploding={isExploding} />
    </div>
  );
};

export default Home;
