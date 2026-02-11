import { useState, useEffect } from "react";
import List from "./List";
import Spinner from "./Spinner";
import WinnerPopup from "./WinnerPopup";
import Confetti from "./Confetti";
import Table from "../results table/Table";
import PreferencesPaneComponent from "../settings/PreferencesPane";
import {usePreferenceStore} from "../stores/PreferenceStore";
import {bootstrapLocalStorage} from "../../common/helpers/general";
import {LastWinner} from "./LastWinner";

export interface Scores {
  [year: number]: number[],
}

export interface Item {
  id: string;
  option: string;
  include: boolean;
  allScores: Scores;
  score: number;
  active: boolean
}

const Home = () => {
  const [list, setList] = useState<Item[]>(() => {
    const saved = localStorage.getItem("SpinnerApp.list");
    const initialValue = JSON.parse(saved!);
    return initialValue || [];
  });

  const thisYear = new Date().getFullYear()
  const allYears: string[] = [];

  const checkYears = () => {
    list.forEach((item) => {
      const itemContainsThisYear =  thisYear in item.allScores;
      if (!itemContainsThisYear) {
        item.allScores[thisYear] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };
      for (const key in item.allScores) {
        const alreadyThere = allYears.includes(key);
        if (!alreadyThere) allYears.push(key)     
      }
    })
  }
 
checkYears();
 
  const [open, setOpen] = useState<boolean>(false);
  const [winner, setWinner] = useState<Item>({
    id: "id",
    option: "option",
    include: true,
    allScores: {[thisYear]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
    score: 0,
    active: true
  });

  const [isExploding, setIsExploding] = useState<boolean>(false);
    //
    const [highestPerMonth, setHighestPerMonth] = useState<number[]>([]);
    //
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  //

  useEffect(() => {
    //
    // creates array of everyone's score for the month of the index number
    const getScoresByMonth = (index: number) => {
      const column: any = [];
      list.forEach((item) => {
        column.push(item.allScores[thisYear][index]);
      });
      return column;
    };
    //
    // creates array of all the monthly score arrays
    const allMonthScores = [];
    for (let i = 0; i < 12; i++) {
      allMonthScores.push(getScoresByMonth(i));
    }
    //
    // creates an array of the one highest score per month
    const highestPerMonth: any = [];
    allMonthScores.forEach((month, index) => {
      let max = Math.max(...month);
      highestPerMonth.push(max);
    });
    setHighestPerMonth(highestPerMonth);

  }, [list,thisYear]);
  //

	// check to see if there are any sounds set in the preferences
	// if not, set some defaults
	bootstrapLocalStorage(usePreferenceStore());

	return (
		<>
			<div className="d-flex justify-content-center flex-wrap m-auto">
				<List
					list={list}
					setList={setList}
					highestScoreThisMonth={highestPerMonth[new Date().getMonth()]}
					months={months}
					thisYear={thisYear}
				/>
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
					thisYear={thisYear}
				/>
				<Confetti isExploding={isExploding} />
			</div>
			<div className="d-flex flex-column-reverse align-items-center">
				<LastWinner />
			</div>
			<div className="d-flex flex-column-reverse align-items-center">

        {allYears.map((year) => (     
        <Table 
        key={year}
        list={list} 
        setList={setList} 
        highestPerMonth={highestPerMonth} 
        setHighestPerMonth={setHighestPerMonth}
        months={months}
        thisYear={Number(year)}
        />)
        )}

      </div>
        <div className="d-flex flex-direction-column justify-content-center preferences-wrap">
            <PreferencesPaneComponent />
        </div>
    </>
  );
};

export default Home;
