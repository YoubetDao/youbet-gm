import { Alarm, AlarmStatus } from '@/type'
import { sdk } from '@/config'
import { formatDateString } from './utils.home'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

interface AlarmProps {
  props: Alarm
}

function CompletedAlarmCard({ props }: AlarmProps) {
  const { address } = useAccount()
  const [status, setStatus] = useState<AlarmStatus>(AlarmStatus.Failed)

  const clickClaim = async () => {
    await sdk.contract.claimStake(props.id!)
  }

  const renderContent = () => {
    switch (status) {
      case AlarmStatus.WaitForSettle:
        return (
          <Button variant={'default'} onClick={clickClaim} className="bg-green-500 w-12 h-10">
            Claim!
          </Button>
        )
      case AlarmStatus.Succeed:
        return (
          <div className="bg-green-500 rounded-full w-8 h-8">
            <CheckIcon className="w-8 h-8" />
          </div>
        )
      case AlarmStatus.Failed:
        return (
          <Button variant={'default'} onClick={clickClaim} className="bg-green-500 w-12 h-10">
            Claim!
          </Button>
        )
      default:
        return (
          <Button variant={'default'} onClick={clickClaim} className="bg-green-500 w-12 h-10">
            Claim!
          </Button>
        )
      // <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center">
      //     <Cross1Icon className='w-5 h-5' />
      // </div>
    }
  }

  useEffect(() => {
    if (!address) return
    sdk.client.getGoalDetails(props.id!).then((value) => {
      console.log(value)
      if (value.completed) {
        setStatus(AlarmStatus.Succeed)
      }
    })
  }, [address])

  return (
    <div className="flex flex-row justify-between items-center h-[6em] w-full bg-slate-600 m-auto rounded-[1em] relative group p-2 pr-4 z-0 overflow-hidden">
      <div className="h-[4em] w-[8em] bg-[#FDEE00] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]" />
      <div className="h-[3em] w-[7em] bg-[#7CFC00] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]" />
      <div className="h-[2em] w-[6em] bg-[#007FFF] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]" />
      <div className="before:absolute before:w-12 before:h-12 before:rounded-full before:blur-xl before:top-16 relative flex flex-col justify-center items-center w-44 h-full text-gray-50">
        <div className="text-[0.8em] bottom-[1em] left-[1em] text-amber-200 group-hover:text-white duration-100">
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
      {renderContent()}
    </div>
  )
}

export default CompletedAlarmCard
