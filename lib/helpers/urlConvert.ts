
export default function urlConvert(title: string){
    return title.trim().replace(/\s+/g, '-').toLowerCase(); 
}
