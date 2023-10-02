import Spinner from "@/icons/spinner";

export default function NewDeckFormLoading(){
    return (
            <form className="flex flex-col w-full items-center">
                <input className={
                    `
                        h-16 
                        text-5xl 
                        w-1/2

                        bg-base3  border-b-2
                        border-base00 focus:bg-base2 outline-none
                        rounded-t-lg

                        pl-2
                        transition-all
                        ease-linear
                        duration-750
                        delay-0
                        bg-transparent
                        notebook-input
                        notebook-unfocused
                        hover:notebook-hover
                        focus:outline-none
                        focus:notebook-focused
                    `}
                    name="deckname"
                    type='text'
                    defaultValue={`Untitled Deck`}
                    placeholder={'Untitled Deck'}
                />
                <div className='h-16 mt-8 flex flex-row w-full items-end justify-around'>
                    <div className='flex flex-row items-end'>
                        <span className="text-3xl">Input Language</span> 
                        <div className='
                            animate-pulse
                            px-1 mx-2 w-24 h-7 text-violet bg-base2 transition-all hover:underline
                            '
                        >
                        </div>
                    </div>
                    <div className='flex flex-row items-end'>
                        <span className="text-3xl">Target Language</span> 
                        <div className='
                            animate-pulse
                            px-1 mx-2 w-24 h-7 text-violet bg-base2 transition-all hover:underline
                            '
                        >
                        </div>
                    </div>
                </div>
                {/*<label>
                    Include Images 
                    <input name="images" type="checkbox" disabled/>
                </label>*/}
                
                <div 
                    className='
                        mt-16
                        h-8

                        rounded-xl
                        w-32
                        transition-all
                        ease-linear
                        duration-750
                        delay-0
                        bg-transparent
                        notebook-input
                        notebook-unfocused
                        text-green
                        hover:notebook-hover
                        hover:font-light
                        active:notebook-focused
                        flex flex-row

                        items-center
                        justify-center
                    '
                >
                    <Spinner className='animate-spin' height={24} width={24}/>
                </div>
            </form>

           )
}
