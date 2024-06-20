import React, { useEffect } from 'react'

function Main() {
    useEffect(() => {
        new Clock();
    }, []);
    return (
        <div id="container" className="flex min-h-screen items-center justify-center">
            <canvas id="canvas" className='w-full h-full'></canvas>
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
        this.r = (2 * Math.min(h, w)) / 5 + Math.random() * 10 | 0;
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
