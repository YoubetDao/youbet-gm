import { Alarm, AlarmStatus } from '@/type'
import AlarmCard from './ongoing-alarm-card'
import { TITLE, sdk } from '@/config'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import React from 'react'
import { Button } from '../ui/button'
import { combineDateTime, parseDateTimeFromDescription } from './utils.home'


function OngoingAlarmContainer() {
    const [alarmData, setAlarmData] = useState<Alarm[]>([])
    const [inputDateValue, setInputDateValue] = useState<string>('');
    const [inputTimeValue, setInputTimeValue] = useState<string>('');
    const [inputEthValue, setInputEthValue] = useState<number>(0);
    const [inputTaskCountValue, setInputTaskCountValue] = useState<number>(0);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputDateValue(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTimeValue(event.target.value);
    };

    const handleEthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputEthValue(parseInt(event.target.value));
    };


    const handleTaskCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTaskCountValue(parseInt(event.target.value));
    };

    const createClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await sdk.contract.createGoalSolo(
            TITLE,
            combineDateTime(inputDateValue, inputTimeValue),
            inputEthValue * 1000000000,
            inputTaskCountValue
        )
    }

    useEffect(() => {
        sdk.client.getAllGoals().then(
            (values) => {
                const filteredValues = values.filter(value => value.name === TITLE);
                const updatedAlarms = filteredValues.map(value => parseDateTimeFromDescription(value.description, value.completed, value.id))
                    .filter(alarm => alarm !== null) as Alarm[];
                setAlarmData(updatedAlarms);
            }
        )
    }, [])

    return (
        <div className='col-span-1 min-h-screen overflow-y-auto bg-slate-900 p-3 flex flex-col items-center gap-4'>
            <div className='flex flex-col gap-4 w-full'>
                {alarmData.map((alarm) => {
                    return <AlarmCard key={alarm.id} props={alarm} />
                }
                )}
            </div>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button
                        className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                        title="Add New"
                    >
                        <svg
                            className="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                            viewBox="0 0 24 24"
                            height="50px"
                            width="50px"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-width="1.5"
                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                            ></path>
                            <path stroke-width="1.5" d="M8 12H16"></path>
                            <path stroke-width="1.5" d="M12 16V8"></path>
                        </svg>
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded shadow-lg w-96">
                        <Dialog.Title className="text-2xl font-bold text-gray-200 mb-4">Create Goal</Dialog.Title>
                        <div className="flex flex-col items-center justify-center h-full w-full dark">
                            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                                <form className="flex flex-col">
                                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="age">
                                        Date
                                    </label>
                                    <input
                                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                                        id="class"
                                        type="date"
                                        value={inputDateValue}
                                        onChange={handleDateChange}
                                    />
                                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="age">
                                        Time
                                    </label>
                                    <input
                                        id="Time"
                                        value={inputTimeValue}
                                        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2"
                                        onChange={handleTimeChange}
                                        type="time"
                                        name="appointment-time">
                                    </input>
                                    <label className="text-sm mb-2 text-gray-200 cursor-pointer" htmlFor="age">
                                        Stake Number & Task Count
                                    </label>
                                    <div className="flex space-x-4 mb-4 items-center">
                                        <input
                                            placeholder="Wei"
                                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                            value={inputEthValue}
                                            onChange={handleEthChange}
                                            type="number"
                                        />
                                        <input
                                            placeholder="Task Count"
                                            className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 w-1/2 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                            value={inputTaskCountValue}
                                            onChange={handleTaskCountChange}
                                            type="number"
                                        />
                                    </div>

                                    <Button
                                        className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                                        onClick={createClick}
                                    >
                                        Create
                                    </Button>
                                </form>
                            </div>
                        </div>

                        <Dialog.Close asChild>
                            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}

export default OngoingAlarmContainer


