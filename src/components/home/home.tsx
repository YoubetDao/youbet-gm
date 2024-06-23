import { useEffect, useRef, useState } from 'react'
import Alarm from './alarm';
import Menu from './menu';
import { AlarmStatus } from '@/type';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Separator } from '../ui/separator';

const alarmData = [
    {
        id: 1,
        month: 6,
        date: 23,
        dayOfWeek: "Thursday",
        hour: 7,
        minute: 30,
        status: AlarmStatus.InProgress // 正在进行
    },
    {
        id: 2,
        month: 12,
        date: 31,
        dayOfWeek: "Saturday",
        hour: 23,
        minute: 9,
        status: AlarmStatus.Pending // 待执行
    },
    {
        id: 3,
        month: 3,
        date: 15,
        dayOfWeek: "Tuesday",
        hour: 12,
        minute: 0,
        status: AlarmStatus.Completed // 已完成
    },
    {
        id: 4,
        month: 6,
        date: 23,
        dayOfWeek: "Thursday",
        hour: 7,
        minute: 30,
        status: AlarmStatus.InProgress // 正在进行
    },
    {
        id: 5,
        month: 12,
        date: 31,
        dayOfWeek: "Saturday",
        hour: 23,
        minute: 9,
        status: AlarmStatus.Pending // 待执行
    }
];

interface MenuStatus {
    status: 'none' | 'menu1' | 'menu2'; // 定义状态为 'none'、'menu1' 或 'menu2'
}

function Main() {
    const alarmRef = useRef(null);
    const [menuStatus, setMenuStatus] = useState<MenuStatus>({ status: 'none' });
    // 示例：更新菜单状态的函数
    const updateMenuStatus = (newStatus: 'none' | 'menu1' | 'menu2') => {
        console.log(newStatus)
        setMenuStatus({ status: newStatus });
    };
    useEffect(() => {
        new Clock();
        // localStorage.getItem(clock)
    }, []);
    return (
        <>
            <Menu onMenuClick={updateMenuStatus} cur={menuStatus.status} />
            <div className="flex-grow grid grid-cols-4 max-h-screen w-full overflow-hidden">
                <div className='col-span-3 w-full max-h-screen place-content-center'>
                    <canvas id="canvas" className='aspect-auto w-full max-h-screen'></canvas>
                </div>
                <div ref={alarmRef} className='col-span-1 flex flex-col gap-5 bg-slate-900 min-h-screen w-full overflow-y-auto items-center'>
                    <div className='w-full'>
                        {alarmData.map((alarm) => (
                            <Alarm key={alarm.id} {...alarm} />
                        ))}
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
                            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-96">
                                <Dialog.Title className="text-lg font-medium">Modal Title</Dialog.Title>
                                <Dialog.Description className="mt-2 mb-4 text-sm text-gray-500">
                                    This is the content of the modal.
                                </Dialog.Description>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700"
                                    onClick={() => Dialog.Close}
                                >
                                    Close
                                </button>
                                <Dialog.Close asChild>
                                    <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                                        <Cross2Icon />
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>

                </div>

            </div>

        </>

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
        this.colors = ['#1e90ff', '#1e90ff', '#ffa502', '#ffa502', '#2ed573', '#2ed573']
        this.init();
    }
    init() {
        for (let i = 0; i < 200; i++) {
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
        this.color = `hsl(${Math.random() * 360 | 0}, 80%, 50%)`;
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
