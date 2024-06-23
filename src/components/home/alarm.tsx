import React from 'react'
import './clock.css'
import { Separator } from '../ui/separator'
import { AlarmStatus } from '@/type';



interface AlarmProps {
    month: number;      // 月份，使用 1 到 12 表示不同的月份
    date: number;       // 几号，日期，例如 1 到 31
    dayOfWeek: string;  // 星期几，例如 "Sunday", "Monday", ...
    hour: number;       // 小时，使用 0 到 23 表示 24 小时制的小时
    minute: number;     // 分钟，使用 0 到 59 表示分钟
    status: AlarmStatus // 三种状态
}

function Alarm(props: AlarmProps) {
    return (
        <div>
            <div className='h-24 flex flex-row justify-between items-center pr-4'>
                <div className="before:absolute before:w-12 before:h-12 before:rounded-full before:blur-xl before:top-16 relative flex flex-col justify-center items-center w-44 h-full rounded-2xl shadow-inner text-gray-50">
                    <span>{formatDateString(props)}</span>
                    <span className="z-10 flex items-center text-6xl text-green-700 [text-shadow:_2px_2px_#fff,_1px_2px_#fff]">
                        {props.hour}
                        <span className="text-xl font-bold text-gray-50 [text-shadow:none]">:</span>
                        {props.minute >= 10 ? props.minute : '0' + String(props.minute)}
                    </span>
                </div>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider" />
                </label>
            </div>
            <Separator className='bg-white' />
        </div>
    )
}

export default Alarm

function formatDateString(alarmProps: AlarmProps): string {
    // 辅助函数：获取月份的英文简写
    function getEnglishMonthShort(month: number): string {
        const monthsShort = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return monthsShort[month - 1]; // 月份减去1是因为数组索引从0开始
    }
    const { dayOfWeek, month, date } = alarmProps;

    // 创建一个日期对象
    const alarmDate = new Date();
    alarmDate.setFullYear(new Date().getFullYear()); // 设置当前年份，避免跨年显示问题
    alarmDate.setMonth(month - 1); // 月份需要减去1，因为 JavaScript 中月份从 0 开始
    alarmDate.setDate(date);

    // 获取星期几的简写
    const dayOfWeekShort = dayOfWeek.slice(0, 3); // 取星期几的前三个字母，比如 "Wed"

    // 获取月份的英文简写（固定为英文）
    const monthShort = getEnglishMonthShort(month); // 获取月份的英文简写，例如 "Jan"

    // 构建最终的日期字符串
    const dateString = `${dayOfWeekShort}, ${monthShort} ${date}`;

    return dateString;
}
