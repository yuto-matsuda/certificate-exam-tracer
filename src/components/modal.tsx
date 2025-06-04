export default function Modal({
    isOpen,
    onClose,
    className = '',
    children
}: {
    isOpen:     boolean
    onClose:    () => void
    className?: string
    children:   React.ReactNode
}) {
    if (!isOpen) return null;

    return (
        <div className='fixed flex justify-center items-center z-10 top-0 left-0 w-full h-full bg-black/50' onClick={onClose}>
            <div className={className} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}