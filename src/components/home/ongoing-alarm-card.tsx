import { Alarm, AlarmStatus } from '@/type';
import { Button } from '../ui/button';
import { sdk } from '@/config';
import { formatDateString, isWithinHalfHour } from './utils.home';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

interface AlarmProps {
    props: Alarm
}


function OngoingAlarmCard({ props }: AlarmProps) {
    const { address } = useAccount()
    const [status, setStatus] = useState<AlarmStatus>(AlarmStatus.Pending)
    const clickConfirm = async () => {
        await sdk.contract.confirmTaskCompletion(
            props.id!,
            address!,
        )
    }
    const stake = async () => {
        await sdk.contract.stakeAndUnlockGoal(props.id!)
    }

    const renderContent = () => {
        switch (status) {
            case AlarmStatus.Confirm:
                return (
                    <Button
                        variant={"default"}
                        onClick={clickConfirm}
                        className='bg-green-300 w-12 h-10'
                    >
                        Confirm!
                    </Button>);
            case AlarmStatus.Pending:
                return (
                    <Button
                        className="text-black bg-green-600 w-12 h-10"
                        variant={"default"}
                        onClick={stake}
                    >
                        Stake
                    </Button>
                );
            case AlarmStatus.InProgress:
                return (
                    <Button variant={"destructive"}>
                        Lock
                    </Button>
                );
        }
    };

    useEffect(() => {
        if (!address) return
        sdk.client.getGoalDetails(props.id!).then(
            (value) => {
                console.log(value)
                if (value.participants.includes(address)) {
                    setStatus(AlarmStatus.InProgress)
                    if (isWithinHalfHour(props)) {
                        setStatus(AlarmStatus.Confirm)
                    }
                }

            }
        )
    }, [address])



    return (
        <div
            className="flex flex-row justify-between items-center h-[6em] w-full bg-slate-600 m-auto rounded-[1em] relative group p-2 pr-4 z-0 overflow-hidden"
        >
            <div className="h-[4em] w-[8em] bg-[#FDEE00] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]" />
            <div className="h-[3em] w-[7em] bg-[#7CFC00] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]" />
            <div className="h-[2em] w-[6em] bg-[#007FFF] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]" />
            <div className="before:absolute before:w-12 before:h-12 before:rounded-full before:blur-xl before:top-16 relative flex flex-col justify-center items-center w-44 h-full text-gray-50">
                <div
                    className="text-[0.8em] bottom-[1em] left-[1em] text-amber-200 group-hover:text-white duration-100"
                >
                    <span className="relative before:h-[0.16em] before:absolute before:w-full before:content-[''] before:bg-[#d8c3e0] group-hover:before:bg-white duration-100 before:bottom-0 before:left-0">
                        {formatDateString(props)}
                    </span>
                </div>
                <span className="z-10 flex items-center text-6xl text-amber-200 group-hover:text-white [text-shadow:_2px_2px_#fff,_1px_2px_#fff]">
                    {props.hour}
                    <span className="text-3xl font-bold text-amber-200  [text-shadow:none]">:</span>
                    {props.minute >= 10 ? props.minute : '0' + String(props.minute)}
                </span>
            </div>
            {
                renderContent()
            }

        </div>
    )
}

export default OngoingAlarmCard

