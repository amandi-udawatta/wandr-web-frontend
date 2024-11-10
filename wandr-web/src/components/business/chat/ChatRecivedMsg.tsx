export const ChatRecivedMsg = (props:any) => {
    const {time, message} = props;
    return (
        <div className="w-auto flex flex-col items-start ">
            <div className="mymsg bg-gray-10 text-black rounded-full p-2 px-4 pr-6 max-w-80">{message}</div>
            <p className="text-xs text-gray-500 pt-1 pl-2">{time}</p>
        </div>
    )
}