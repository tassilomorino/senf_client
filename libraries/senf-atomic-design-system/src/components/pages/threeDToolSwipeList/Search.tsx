import React, { FC, useState, useEffect, useRef } from "react";
import { Input, ObjectCard } from "senf-atomic-design-system";
import {
  SearchBox,
  Highlight,
  connectHits,
  connectSearchBox,
  connectStateResults,
  Hits,
  connectHighlight,
} from "react-instantsearch-dom";
import List from "../../molecules/list/List";

const Search: FC = ({ handlePlaceModel }) => {
  const [showSearch, setShowSearch] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState("");

  const searchInput = useRef("");
  const inputRef = useRef("");

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

  const Hit = ({ hits, searchQuery }) => {
    const data = hits.length
      ? hits
      : [
          {
            title: searchQuery,
            category: "Buildings",
            imgURL:
              "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/threeD_models%2F7WQUZg6V6IJlzA3Jrs30%2Fthumbnail%2FIcon_Normal%20Effect%20Kopie%2013.png?alt=media&token=23340cfd-c9f0-4575-ae65-010ed1ff3ef9",
            modelURL:
              "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/threeD_models%2FZqVXPNBpPCM2vf69vHCx%2Fmodel%2Fbar.fbx?alt=media&token=c70d1c05-7473-41b8-a15d-cfee65f26e06",
            labelText: searchQuery,
          },
          {
            title: "Cube",
            category: "Buildings",
            imgURL:
              "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/threeD_models%2F7WQUZg6V6IJlzA3Jrs30%2Fthumbnail%2FIcon_Normal%20Effect%20Kopie%2013.png?alt=media&token=23340cfd-c9f0-4575-ae65-010ed1ff3ef9",
            modelURL:
              "https://firebasestorage.googleapis.com/v0/b/senf-dev.appspot.com/o/threeD_models%2FZqVXPNBpPCM2vf69vHCx%2Fmodel%2Fbar.fbx?alt=media&token=c70d1c05-7473-41b8-a15d-cfee65f26e06",
          },
        ];
    return (
      <List
        listType="grid"
        CardType={ObjectCard}
        data={data}
        handleButtonOpenCard={handlePlaceModel}
        loading={false}
      />
    );
  };
  const CustomHits = connectHits(Hit);

  const Results = connectStateResults(({ searchState }) =>
    searchState && searchState.query ? (
      <CustomHits
        hitComponent={Hit}
        searchQuery={searchState.query}
      />
    ) : (
      <></>
    )
  );

  const changeSearchText = (event, refine) => {
    refine(event.currentTarget.value); // this line is ok
    // if i need the text or i need to set an attribute to show or no the result everything is broken
    // setSearchText(event.currentTarget.value); // With this line nothing is working any more
  };

  const SearchBox = ({ currentRefinement, refine }) => {
    return (
      <Input
        type="search"
        name="livesearchInput"
        value={currentRefinement} // if i put something else here like searchText variable nothing is working as expected
        onChange={(event) => changeSearchText(event, refine)}
        placeholder={"Search"}
        refProp={inputRef}
      />
    );
  };

  const CustomSearch = connectSearchBox(SearchBox);

  return (
    <>
      <CustomSearch />
      <Results />
    </>
  );
};

export default Search;
