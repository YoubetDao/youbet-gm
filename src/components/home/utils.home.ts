import { Alarm, AlarmStatus } from "@/type";

export const combineDateTime = (date: string, time: string): string => {
    // Assuming date is in YYYY-MM-DD format and time is in HH:mm format
    return `${date} ${time}`;
};

export const parseDateTimeFromDescription = (description: string, completed: boolean, id: number): Alarm | null => {
    const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;
    const match = description.match(dateTimeRegex);
    if (match) {
        const [, year, month, date, hour, minute] = match.map(Number);
        const parsedDate = new Date(year, month - 1, date, hour, minute);
        const monthNumber = parsedDate.getMonth() + 1;
        const dayOfWeek = parsedDate.toLocaleString('en', { weekday: 'long' });

        const alarm: Alarm = {
            id,
            month: monthNumber,
            date,
            dayOfWeek,
            hour,
            minute,
            status: AlarmStatus.Pending, // 根据需要设定初始状态
        };

        if (completed === true) {
            alarm.status = AlarmStatus.Failed
            return alarm
        }

        // 获取当前时间
        const currentDateTime = new Date();

        // 如果解析出来的时间大于当前时间，则设置状态为 Inprogress
        console.log(parsedDate)

        if (parsedDate > currentDateTime) {
            alarm.status = AlarmStatus.Pending;
        } else {
            alarm.status = AlarmStatus.Failed
        }
        return alarm;
    }
    return null;
};


export function formatDateString(alarmProps: Alarm): string {
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




export function compareDates(date1: Alarm, date2: Alarm): Boolean {
    const d1 = new Date(2023, date1.month - 1, date1.date, date1.hour, date1.minute);
    const d2 = new Date(2023, date2.month - 1, date2.date, date2.hour, date2.minute);

    if (d1 <= d2) {
        return true;
    }
    return false;

}

export function isWithinHalfHour(dateStruct: Alarm): Boolean {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), dateStruct.month - 1, dateStruct.date, dateStruct.hour, dateStruct.minute);

    const halfHourBefore = new Date(targetDate.getTime() - 30 * 60 * 1000);
    const halfHourAfter = new Date(targetDate.getTime() + 30 * 60 * 1000);

    return now >= halfHourBefore && now <= halfHourAfter;
}

