
import { cva } from 'class-variance-authority';

interface MenuProps {
    cur: 'none' | 'menu1' | 'menu2'
    onMenuClick: (newStatus: 'none' | 'menu1' | 'menu2') => void; // 定义 onMenuClick prop，接收一个 number 类型的参数
}

const svgStyles = cva(
    "peer-hover/expand:scale-125 peer-hover/expand:fill-blue-400 peer-hover/expand:text-blue-400 duration-300 ease-in-out",
    {
        variants: {
            expanded: {
                true: "scale-125 text-blue-400 fill-blue-400",
                false: "scale-100"
            }
        },
        defaultVariants: {
            expanded: false
        }
    }
);

function Menu({ cur, onMenuClick }: MenuProps) {
    const handleClick = (menuId: 'none' | 'menu1' | 'menu2') => {
        if (menuId !== cur) {
            onMenuClick(menuId);
        } else {
            onMenuClick('none')
        }
    };
    return (
        <div className='group absolute top-14 left-4 flex flex-row gap-4'>
            <label
                htmlFor="nav_bar_icon"
                className="w-6 h-8 cursor-pointer flex flex-col items-center justify-center space-y-1.5"
            >

                <div
                    className="w-2/3 h-1 bg-white rounded-lg transition-all origin-right group-hover:w-full group-hover:rotate-[-30deg] group-hover:translate-y-[-5px]"
                >
                </div>
                <div

                    className="w-full h-1 bg-white rounded-lg transition-all origin-center group-hover:rotate-90 group-hover:translate-x-4"
                ></div>
                <div
                    className="w-2/3 h-1 bg-white rounded-lg transition-all origin-right group-hover:w-full group-hover:rotate-[30deg] group-hover:translate-y-[5px]"
                ></div>
            </label>
            <div
                className="hidden group-hover:flex flex-col justify-center items-center transition-all duration-[450ms] ease-in-out w-14"
            >
                <article
                    className="border border-solid border-gray-700 w-full ease-in-out duration-500 left-0 rounded-3xl inline-block shadow-lg shadow-black/15 bg-slate-900"
                >
                    <label
                        htmlFor="dashboard"
                        className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row items-center justify-center text-white rounded-xl"
                    >
                        <input
                            onClick={() => handleClick('menu1')}
                            className="hidden peer/expand"
                            type="radio"
                            name="path"
                            id="dashboard"
                        />
                        <svg className={svgStyles({ expanded: cur === 'menu1' })} width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        {/* <svg className="peer-hover/expand:scale-125 peer-hover/expand:text-blue-400 peer-hover/expand:fill-blue-400 peer-checked/expand:text-blue-400 peer-checked/expand:fill-blue-400 peer-checked/expand:scale-125 ease-in-out duration-300" width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg> */}
                    </label>
                    <label
                        htmlFor="messages"
                        className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row items-center justify-center text-white rounded-xl"
                    >
                        <input
                            onClick={() => handleClick('menu2')}
                            className="hidden peer/expand"
                            type="radio"
                            name="path"
                            id="messages"
                        />
                        <svg className={svgStyles({ expanded: cur === 'menu2' })} width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM4.50003 7C4.22389 7 4.00003 7.22386 4.00003 7.5C4.00003 7.77614 4.22389 8 4.50003 8H10.5C10.7762 8 11 7.77614 11 7.5C11 7.22386 10.7762 7 10.5 7H4.50003Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </label>
                </article>
            </div>
        </div>

    )
}

export default Menu