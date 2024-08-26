export const ChatSentMsg = (props:any) => {
    const {time, message} = props;
    return (
        <div className="w-auto flex flex-col items-end ">
        <div className="mymsg bg-green-50 text-white rounded-full p-2 px-4 pl-6 max-w-80">{message}</div>
        <p className="text-xs text-gray-500 pt-1 pr-2">{time}</p>
        </div>
    )
}