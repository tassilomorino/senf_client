import React, { FC, useState, useEffect, useRef } from 'react';
import { Input, ObjectCard } from "senf-atomic-design-system"
import {
    SearchBox,
    Highlight,
    connectHits,
    connectSearchBox,
    connectStateResults,
    Hits,
    connectHighlight
} from 'react-instantsearch-dom';
import List from '../../molecules/list/List';



const Search: FC = ({ handlePlaceModel }) => {
    const [showSearch, setShowSearch] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [searchText, setSearchText] = useState('');

    const searchInput = useRef('');
    const inputRef = useRef('');

    // useEffect(() => {
    //     document.addEventListener('keydown', handleKeyDown, false);
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // });

    // const showLiveSearch = () => {
    //     setShowSearch(true);
    //     setTimeout(() => {
    //         console.log('searchInput', searchInput); // return a connectorWrapper method if useing algolia SearchBox
    //         console.log('inputRef', inputRef); // and an input if using customSearch
    //         inputRef.current.focus();
    //     }, 300);
    // };

    // const hideLiveSearch = () => {
    //     setShowSearch('');
    //     setSearchText('');
    // };

    // const handleKeyDown = (event) => {
    //     if (showSearch) {
    //         const key = event.keyCode.toString();
    //         if (key === '27') {
    //             hideLiveSearch();
    //         }
    //     }
    // };

    const Hit = ({ hits }) => {
        return <List
            listType="grid"
            CardType={ObjectCard}
            data={hits}
            handleButtonOpenCard={handlePlaceModel}
            loading={false}
        />

    };
    const CustomHits = connectHits(Hit);


    const Results = connectStateResults(({ searchState }) =>
        searchState && searchState.query ? (
            <CustomHits
                hitComponent={Hit}
            />

        ) : (
            <div></div>
        )
    );



    // const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
    //     const parsedHit = highlight({
    //         highlightProperty: '_highlightResult',
    //         attribute,
    //         hit
    //     });

    //     return (
    //         <div>
    //             <h3>{hit.title}</h3>
    //             <img src={hit.avatar} alt={hit.username} />
    //             {parsedHit.map(
    //                 part => part.isHighlighted ? <mark>{part.value}</mark> : part.value
    //             )}
    //         </div>
    //     );
    // });




    const changeSearchText = (event, refine) => {

        refine(event.currentTarget.value); // this line is ok
        // if i need the text or i need to set an attribute to show or no the result everything is broken
        // setSearchText(event.currentTarget.value); // With this line nothing is working any more
    };

    const SearchBox = ({ currentRefinement, refine }) => {
        return (
            <form noValidate action="" role="search">
                <Input
                    type="search"
                    id="livesearchInput"
                    value={currentRefinement} // if i put something else here like searchText variable nothing is working as expected
                    onChange={(event) => changeSearchText(event, refine)}
                    placeholder={'Search'}
                    ref={inputRef} // ref seems ok like this
                />
            </form>
        );
    };

    const CustomSearch = connectSearchBox(SearchBox);



    return (
        <>

            <CustomSearch />

            <Results handlePlaceModel={handlePlaceModel} />



        </>

    );
};

export default Search;
