'use client';
import '../styles/function/accordion.scss'
import { useState, useRef, Children } from 'react';


export default function Accordion({
    opened = false,
    children
}: {
    opened?:   boolean
    children: React.ReactNode
}) {
    const [isOpen, setIsOpen] = useState<boolean>(opened);
    const refInner = useRef<HTMLInputElement>(null);
    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
    }

    const childrenArray = Children.toArray(children);
    const title = childrenArray[0];
    const content = childrenArray.slice(1);

    return (
        <div className={`accordionWrap ${isOpen ? 'open' : 'close'}`}>
            <button className='head' onClick={toggleOpen}>
                {title}
            </button>
            <div
                className='accordionInner'
                ref={refInner}
                style={{['--text-height' as any]: refInner.current ? `${refInner.current.scrollHeight}px` : '0px'}}
            >
                {content}
            </div>
        </div>
    );
}

/* Usage:
<Accordion>
    <div>
        header
    </div>
    <div>
        content
    </div>
</Accordion
*/