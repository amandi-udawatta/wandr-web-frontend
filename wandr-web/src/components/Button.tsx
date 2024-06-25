import Image from "next/image";

type ButtonProps = {
    type: "button" | 'submit';
    title: string;
    icon?: string;
    variant: string;
    full?: boolean;
    link?: string;
    height?:string;
    rounded?: string;
}

const Button = ({type, title, icon, variant, full, link, height, rounded}: ButtonProps) => {
  return (
    <button type={type} className= {`flexCenter gap-3 border ${variant} ${full && 'w-full'} ${height ? height : 'py-2 px-4'} ${rounded ? rounded : 'rounded-full'}`}>
        {icon && <Image src={icon} alt = {title} width={24} height= {24} />}
        {!link && <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>}
        {link && <a href={link} className="bold-16 whitespace-nowrap cursor-pointer">{title}</a>}
    </button>
  )
}

export default Button;