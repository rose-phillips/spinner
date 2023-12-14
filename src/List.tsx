import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";

interface Item {
    id: string;
    text: string;
    include: boolean;
    score: number;
}

function List() {
    const [list, setList] = useState<Item[]>(() => {
        const saved = localStorage.getItem("SpinnerApp.list");
        const initialValue = JSON.parse(saved!);
        return initialValue || '';
    })

    const itemNameRef = useRef<null | HTMLInputElement>(null)

    const handleAdd = (e: any) => {
        e.preventDefault()
        if (itemNameRef.current?.value === '') return;
        const newItem = { id: uuidv4().substr(0, 5), text: itemNameRef.current?.value!, include: true, score: 0 }
        const newList = [...list, newItem]
        setList(newList)
        e.target.reset()
    }

    const handleToggle = (id: string) => {
        const newList = list?.map((item) => {
            if (item.id === id) return { ...item, include: !item.include }
            else return item;
        })
        setList(newList)
    }

    const handleClearAll = () => {
        setList([])
    }

    useEffect(() => {
        localStorage.setItem('SpinnerApp.list', JSON.stringify(list))
    }, [list])


    const handleShuffle = () => {

        let shuffledList = list
            .map(item => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item)
        setList(shuffledList)
    }

    return (
        <div className='my-auto mx-3 p-3'>
            <form onSubmit={handleAdd} className='mb-3'>
                <input ref={itemNameRef} placeholder='...add another item' type="text" />
                <button type='submit'>add</button>
            </form>
            <button onClick={handleShuffle} className='mb-3'>shuffle</button>

            {list?.map((item) => (
                <div key={item.text} className='mb-1'>
                    <label key={item.id}>
                        <input key={item.id}
                            type="checkbox"
                            checked={item.include}
                            onChange={() => handleToggle(item.id)}
                        />{" "}
                        {item.text} - {item.score}
                    </label>
                </div>
            ))}
            <button onClick={handleClearAll} className='mt-3'>delete all</button>
        </div>
    )
}

export default List
