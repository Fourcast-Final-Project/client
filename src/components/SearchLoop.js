import React from 'react'

function SearchLoop (props) {

    return (
        <>
            {
                props.filteredLoc.map(location => {
                    return <SearchByCity key={ location.id } id={ location.id } location={ location } getWeather={ getWeather }/>
                })
            }
        </>
    )
}

export default SearchLoop