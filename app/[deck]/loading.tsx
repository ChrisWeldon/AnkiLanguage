import PhraseListLoading from './components/PhraseListLoading'
import DeckTitleLoading from './components/DeckTitleLoading'
import AddCardLoading from './components/AddCardLoading'
import ExportDeckLoading from './components/ExportDeckLoading'
import LanguageHeaderLoading from './components/LanguageHeaderLoading'



export default function Loading({ params } : {
    params: {
        user: string,
        deck: string
    }
}) {


    // should make a request based on id from decktitel
    return (
    <div className="
        flex
        flex-col
        content-center
        h-full 
        lined
    ">
        <DeckTitleLoading />
        <AddCardLoading />
        <div className="
            flex-1
            justify-self-center 
            justify-end
            self-stretch
            font-thin
            text-xl
        ">
            <h2 className=" separator h-24 text-base03 leading-loose text-5xl bg-app pb-2 text-light">
                Deck
            </h2>
            <LanguageHeaderLoading/>
            <PhraseListLoading />
        </div>
        <ExportDeckLoading/>
    </div>
    )
}
