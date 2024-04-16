import { useState, KeyboardEvent } from "react";
import { CiCircleCheck } from "react-icons/ci";

function App() {
    const [inputValue, setInputValue] = useState<string>("");
    const [items, setItems] = useState<string[]>([]);

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            setItems(prevItems => [...prevItems, inputValue.trim()]);
            setInputValue("");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="lg:min-w-[35%]">
                <div className="drop-shadow-lg">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleEnter}
                        type="text"
                        placeholder="What needs to be done?"
                        className="rounded-md p-3 w-full"
                    />
                </div>
                <div className="my-2 bg-white rounded-md drop-shadow-lg py-1">
                    {items.map((item, index) => (
                        <div key={index} className="p-3 border-b flex items-center">
                            <span>
                                <CiCircleCheck
                                    style={{
                                        fontSize: 25,
                                        marginRight: 10,
                                        color: "white",
                                        background: "green",
                                        borderRadius: "50",
                                    }}
                                />
                            </span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <div className="flex bg-white p-2 drop-shadow-lg items-center rounded-md">
                    <div className="w-2/6">
                        <span>{items.length} items left</span>
                    </div>
                    <div className="flex space-x-4">
                        <span className="border py-[3px] px-2 rounded-md">All</span>
                        <span className="border py-[3px] px-2 rounded-md">Active</span>
                        <span className="border py-[3px] px-2 rounded-md">Complete</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
