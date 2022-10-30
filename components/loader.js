import Image from 'next/image';

export function Loader(){
    return(
        <Image src="/ball-triangle.svg" alt="LOADING..." width={90} height={70}/>
    )
}