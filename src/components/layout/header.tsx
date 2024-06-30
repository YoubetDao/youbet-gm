import '@rainbow-me/rainbowkit/styles.css';

import { Separator } from "../ui/separator";
import { ConnectButton } from '@rainbow-me/rainbowkit';


export function SiteHeader() {
    return (
        <>
            <div
                className="top-0 h-12 p-4 w-full bg-slate-900 flex flex-row items-center justify-end"
            >
                <ConnectButton />
            </div >
            <Separator className="bg-slate-600"></Separator>
        </>
    );
}
