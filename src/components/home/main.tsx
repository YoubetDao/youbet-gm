import { useEffect, useState } from 'react';
import Menu from './menu.component';
import { Alarm, AlarmStatus } from '@/type';
import CompletedAlarmContainer from './completed-alarm.container';
import OngoingAlarmContainer from './ongoing-alarm.container';
import { SiteHeader } from '../layout/header';
import './pattern.css';

const alarmData: Alarm[] = [
    {
        id: 1,
        month: 6,
        date: 30,
        dayOfWeek: "Tuesday",
        hour: 7,
        minute: 30,
        status: AlarmStatus.InProgress // 正在进行
    },
    {
        id: 2,
        month: 3,
        date: 15,
        dayOfWeek: "Tuesday",
        hour: 12,
        minute: 0,
        status: AlarmStatus.Succeed // 已完成
    },
    {
        id: 3,
        month: 12,
        date: 31,
        dayOfWeek: "Saturday",
        hour: 23,
        minute: 9,
        status: AlarmStatus.Failed // 待执行
    },
    {
        id: 4,
        month: 12,
        date: 31,
        dayOfWeek: "Saturday",
        hour: 23,
        minute: 9,
        status: AlarmStatus.Pending // 待执行
    },
    {
        id: 5,
        month: 12,
        date: 31,
        dayOfWeek: "Saturday",
        hour: 23,
        minute: 9,
        status: AlarmStatus.WaitForSettle // 待执行
    }
];

interface MenuStatus {
    status: 'none' | 'menu1' | 'menu2'; // 定义状态为 'none'、'menu1' 或 'menu2'
}

// 根据 MenuStatus 的状态渲染不同的 div

const renderDiv = (menuStatus: MenuStatus, alarmData: Alarm[]) => {

    const filterAlarms = (status1: AlarmStatus, status2: AlarmStatus) => {
        return alarmData.filter(alarm => {
            console.log(alarm.status)
            return alarm.status === status1 || alarm.status === status2
        });
    };

    switch (menuStatus.status) {
        case 'none':
            return null;
        case 'menu1':
            return <OngoingAlarmContainer />;
        case 'menu2':
            return <CompletedAlarmContainer />;
        default:
            return null; // 处理未知状态
    }
};

function Main() {

    const [menuStatus, setMenuStatus] = useState<MenuStatus>({ status: 'none' });

    // 示例：更新菜单状态的函数
    const updateMenuStatus = (newStatus: 'none' | 'menu1' | 'menu2') => {
        setMenuStatus({ status: newStatus });
    };

    useEffect(() => {
        new Clock();
        // localStorage.getItem(clock)
    }, []);
    return (
        <div className='containerxx'>

            <SiteHeader />

            <Menu onMenuClick={updateMenuStatus} cur={menuStatus.status} />

            <div className="grid md:grid-cols-4 h-[50%] w-screen overflow-hidden">
                <div className={`${menuStatus.status === "none" ? 'col-span-4' : 'col-span-3'} w-full max-h-screen place-content-center`}>
                    <canvas id="canvas" className='aspect-auto w-full'></canvas>
                </div>

                {
                    renderDiv(menuStatus, alarmData)
                }

            </div>
        </div>
    )
}

export default Main


class Clock {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    rings: Ring[];
    priticles: Priticle[];
    numbers: {}[];
    last: string;
    colors: string[];
    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (this.canvas != null) {
            console.log(this.canvas)
        }
        this.ctx = this.canvas.getContext('2d')!;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.rings = [];
        this.priticles = [];
        this.numbers = [];
        this.last = '';
        this.colors = ['#007FFF', '#007FFF', '#FDEE00', '#FDEE00', '#7CFC00', '#7CFC00']
        this.init();
    }
    init() {
        for (let i = 0; i < 400; i++) {
            this.rings.push(new Ring(this.canvas.width, this.canvas.height, this.ctx));
        }

        this.animate();
        this.initText();
        this.startTime();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i in this.rings) {
            const r = this.rings[i];
            r.update();
            r.draw();
        }
        for (let i in this.priticles) {
            const p = this.priticles[i];
            p.update();
            p.draw();
            if (p.age === -50) {
                this.priticles.splice(+i, 1);
            }
        }
    }

    startTime() {
        setInterval(() => this.initClock(), 1000);
    }

    initText() {
        for (let i = 0; i < 10; i++) { //循环0-9
            this.ctx.font = "24px Arial";
            let span = document.createElement("span") as HTMLElement;
            span.style.fontSize = "24px";
            span.style.fontFamily = "Arial";
            span.innerHTML = i.toString();
            document.body.appendChild(span);
            let width = span.offsetWidth;
            let height = span.offsetHeight;
            span.remove();
            this.ctx.fillText(i.toString(), 0, height);
            let data = this.ctx.getImageData(0, 0, width, height).data;
            let len = data.length;
            let tdata = [];
            for (let j = 0; j < len / 4; j++) {
                if (data[j * 4 + 3] != 0) {
                    let x = j % width | 0;
                    let y = j / width | 0;
                    tdata.push({
                        x: x,
                        y: y
                    });
                }
            }
            this.numbers.push(tdata);
            this.ctx.clearRect(0, 0, width, height);
        }
    }

    initClock() {
        let now = this.currentClock();
        {/* @ts-ignore */ }
        for (let i in now) {
            const color = this.colors[i];
            {/* @ts-ignore */ }
            for (let j in this.numbers[now[i]]) {
                {/* @ts-ignore */ }
                let n = this.numbers[now[i]][j];
                {/* @ts-ignore */ }
                let r = this.rings[j];
                if (now[i] !== this.last[i]) {
                    this.priticles.push(
                        new Priticle(
                            r.dx,
                            r.dy,
                            n.x * 4 + (this.canvas.width / 2 - 180 + 60 * +i),
                            n.y * 4 + this.canvas.height / 2 - 60,
                            this.ctx,
                            color
                        )
                    )
                } else {
                    this.priticles.push(
                        new Priticle(
                            n.x * 4 + (this.canvas.width / 2 - 180 + 60 * +i),
                            n.y * 4 + this.canvas.height / 2 - 60,
                            n.x * 4 + (this.canvas.width / 2 - 180 + 60 * +i),
                            n.y * 4 + this.canvas.height / 2 - 60,
                            this.ctx,
                            color
                        )
                    )
                }
            }
        }
        this.last = now;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.draw();
    }

    currentClock() {
        const d = new Date();
        return ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2);
    }

}

class Ring {
    x: number;
    y: number;
    deg: number;
    r: number;
    vd: number;
    color: string;
    dx: number;
    dy: number;
    ctx: CanvasRenderingContext2D;
    constructor(w: number, h: number, ctx: CanvasRenderingContext2D) {
        this.x = w / 2;
        this.y = h / 2;
        this.deg = Math.random() * Math.PI * 2;
        this.r = (49 * Math.min(h, w)) / 100 + Math.random() * 10 | 0;
        this.vd = Math.random() * Math.PI * 2 / 360 + 0.01;
        this.color = `hsl(${Math.random() * 360 | 0}, 90%, 90%)`;;
        this.dx = this.r * Math.cos(this.deg) + this.x;
        this.dy = this.r * Math.sin(this.deg) + this.y;
        this.ctx = ctx;
    }
    update() {
        this.deg += this.vd;
        this.deg = this.deg % (Math.PI * 2);
        this.dx = this.r * Math.cos(this.deg) + this.x;
        this.dy = this.r * Math.sin(this.deg) + this.y;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.dx, this.dy, 1, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}

class Priticle {
    x: number;
    y: number;
    sx: number;
    sy: number;
    tx: number;
    ty: number;
    color: string;
    age: number;
    ctx: CanvasRenderingContext2D;
    constructor(x: number, y: number, tx: number, ty: number, ctx: CanvasRenderingContext2D, color = 'gray',) {
        this.x = x;
        this.y = y;
        this.sx = (tx - x) / 100;
        this.sy = (ty - y) / 100;
        this.tx = tx;
        this.ty = ty;
        this.color = color;
        this.age = 100;
        this.ctx = ctx;
    }
    update() {
        this.age--;
        if (this.age >= 0) {
            this.x += this.sx;
            this.y += this.sy;
        }
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
