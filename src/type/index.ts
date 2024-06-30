enum AlarmStatus {
    WaitForSettle = 5,
    Failed = 4,
    Succeed = 3,
    InProgress = 2,
    Confirm = 1,
    Pending = 0,
}

type Alarm = {
    id?: number,
    month: number;      // 月份，使用 1 到 12 表示不同的月份
    date: number;       // 几号，日期，例如 1 到 31
    dayOfWeek: string;  // 星期几，例如 "Sunday", "Monday", ...
    hour: number;       // 小时，使用 0 到 23 表示 24 小时制的小时
    minute: number;     // 分钟，使用 0 到 59 表示分钟
    status: AlarmStatus // 三种状态
}

export { AlarmStatus, Alarm }