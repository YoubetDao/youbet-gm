import { Alarm, AlarmStatus } from '@/type'
import CompletedAlarmCard from './completed-alarm-card'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { TITLE, sdk } from '@/config'
import { parseDateTimeFromDescription } from './utils.home'



function CompletedAlarmContainer() {
  const { address } = useAccount()
  const [alarmData, setAlarmData] = useState<Alarm[]>([])

  useEffect(
    () => {
      if (!address) return
      sdk.client.getUserGoals(address).then((values) => {
        values.forEach((value) => {
          sdk.client.getGoalDetails(value).then(
            (info) => {
              if (info.name !== TITLE) return
              const updatedAlarm = parseDateTimeFromDescription(info.description, info.completed, info.id)
              if (updatedAlarm === null || updatedAlarm.status != AlarmStatus.Failed) return
              setAlarmData((prevAlarms) => [...prevAlarms, updatedAlarm]);
            }
          )
        })
      })
    }, [address]

  )
  return (
    <div className='col-span-1 min-h-screen overflow-y-auto bg-slate-900 p-4'>
      <div className='flex flex-col gap-4 overflow-y-auto w-full'>
        {alarmData.map((alarm) => {
          return <CompletedAlarmCard key={alarm.id} props={alarm} />
        })}
      </div>
    </div>
  )
}

export default CompletedAlarmContainer