
export default function debounce(callback: (...args: any[])=>any , timeout:number=300): (...args: any[])=>void{

    let timer: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(()=>{
            callback(args)
        }, timeout)
    }

}
