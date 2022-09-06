import React, { useState, useEffect, useRef } from 'react';
import { Input } from "senf-atomic-design-system"
import {
    SearchBox,
    Highlight,
    connectHits,
    connectSearchBox,
    connectStateResults,
} from 'react-instantsearch-dom';


/* const InputSearch = (formatMessage, changeSearchText, searchText, searchInput) => {
  

  const Custom = connectSearchBox(SearchBox)
  return Custom
} */

const Search = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showResults, setShowResults] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [searchText, setSearchText] = useState('');

    const searchInput = useRef('');
    const inputRef = useRef('');

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, false);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    const showLiveSearch = () => {
        setShowSearch(true);
        setTimeout(() => {
            console.log('searchInput', searchInput); // return a connectorWrapper method if useing algolia SearchBox
            console.log('inputRef', inputRef); // and an input if using customSearch
            inputRef.current.focus();
        }, 300);
    };

    const hideLiveSearch = () => {
        setShowSearch('');
        setSearchText('');
    };

    const handleKeyDown = (event) => {
        if (showSearch) {
            const key = event.keyCode.toString();
            if (key === '27') {
                hideLiveSearch();
            }
        }
    };

    const Hit = ({ hits }) => {
        // setShowResults(hits.length > 0 ? true : false); // not the best way
        return hits.map((hit) => {
            return (
                <div key={hit.name}>

                    <div >
                        <div >{hit.title}</div>
                        <div >{hit.name}</div>
                    </div>
                    <Highlight
                        // ...
                        hit={hit}
                        attribute="name"
                    />
                </div>
            );
        });
    };

    const CustomHits = connectHits(Hit);

    const changeSearchText = (event, refine) => {
        refine(event.currentTarget.value); // this line is ok
        // if i need the text or i need to set an attribute to show or no the result everything is broken
        // setSearchText(event.currentTarget.value); // With this line nothing is working any more
    };

    const SearchBox = ({ currentRefinement, refine }) => {
        console.log('render', currentRefinement);
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

    // not working, display always results
    const Results = connectStateResults(
        ({ searchState, searchResults, children }) =>
            searchResults && searchResults.nbHits !== 0 ? (
                children
            ) : (
                <div>No results have been found for {searchState.query}.</div>
            )
    );

    return (
        <div className="d-inline-block mr-4">
            {/* <Input
                placeholder={'Search'}
                style={{ width: 200 }}
                onFocus={showLiveSearch}
            />
            <div

                id="livesearch"
            >
                <button type="button" onClick={hideLiveSearch}>
                    <i className="icmn-cross" />
                </button> */}
            <div className="container-fluid">
                <div >
                    <CustomSearch />
                    {/*             <SearchBox
              // autofocus={true} // not working here
              className={style.searchInput}
              onChange={(event) => {
                if (event.currentTarget.value === '') {
                  setShowResults(false);
                }
                setSearchText(event.currentTarget.value);
              }}
              onSubmit={(event) => {
                event.preventDefault();
                setShowResults(true);
              }}
              // eslint-disable-next-line react/jsx-boolean-value
              // ref={searchInput}
            /> */}
                    <ul >
                        <li >
                        </li>
                        <li >Press enter to search</li>
                    </ul>
                    {!showResults && ( // This kinf of things is not possible because i need to set the var when refine is called
                        <div >
                            <div >
                                <span>No Results Found</span>
                            </div>
                        </div>
                    )}
                    <Results>
                        <CustomHits hitComponent={Hit} style={{ listStyle: 'none' }} />
                    </Results>

                    {showResults && ( // Maybe we can use the hit length but
                        <div >
                            <div >
                                <span>Search Results</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <CustomHits
                                        hitComponent={Hit}
                                        style={{ listStyle: 'none' }}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <div >
                                        <div >01</div>
                                        <div >
                                            <div>White Case</div>
                                            <div >
                                                In some partition
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Search;
